<script setup>
import { storage } from '@/lib/appwrite';
import { getTeamFromId } from '@/lib/stores/teams';
import { Button, Dialog, Image } from 'primevue';
import { onMounted, ref } from 'vue';
const { parkingEntry } = defineProps(['parkingEntry']);
const visible = ref(false);

const imageSrcs = ref([]);
onMounted(async () => {
  const promises = parkingEntry.imageIds.map(async (id) => await storage.getFilePreview(import.meta.env.VITE_UPLOAD_BUCKET_ID, id));
  imageSrcs.value = await Promise.all(promises);
});
</script>

<template>
  <Button class='w-fit' @click="visible = true" label="View Details" icon="pi pi-info-circle" />
  <Dialog v-model:visible="visible" modal :header="parkingEntry['carpark-name']" class="md:w-96">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <span class="text-xl font-bold mt-2">Car Group: {{ getTeamFromId(parkingEntry['team-id']) }}</span>
        <span class="text-xl font-semibold mt-2">Level: {{ parkingEntry.level }}</span>
        <span class="text-xl font-semibold mt-2">Parked at: {{ parkingEntry.$createdAt }}</span>
        <span class="text-xl font-semibold mt-2">Parked by: {{ parkingEntry.driver }}</span>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-xl font-bold mt-2">Address: {{ parkingEntry.address ? parkingEntry.address : 'None' }}</span>
        <div v-if="imageSrcs.length > 0" class="flex flex-row gap-2">
          <span class="text-xl font-bold mt-2">Images:</span>
          <div class="flex flex-row gap-2">
            <Image v-for="(src, index) in imageSrcs" :src="src" class="w-20 h-20" :key="index" preview />
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
