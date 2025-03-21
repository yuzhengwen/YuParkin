<script setup>
import { parking } from "@/lib/stores/parking";
import { computed, onMounted, onUnmounted } from "vue";
import { client } from "@/lib/appwrite";
import { DataView } from "primevue";
import ParkingEntryCard from "@/components/ParkingEntryCard.vue";
import ParkingEntryListItem from "@/components/ParkingEntryListItem.vue";

const latestParkingEntry = computed(() => parking.current?.[0] || null);
//databases.[ID].collections.[ID].documents
// Channel to parking collection
const channel = `databases.${import.meta.env.VITE_PROD_DATABASE_ID}.collections.${import.meta.env.VITE_PARKING_COLLECTION_ID}.documents`

onMounted(async () => {
  await parking.init();

  client.subscribe(channel, async (response) => {
    console.log(response.payload);
    await parking.init();
  });
});
/*
onUnmounted(() => {
  client.unsubscribe(channel);
});*/
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <ParkingEntryCard :parkingEntry="latestParkingEntry" />

    <DataView :value="parking.current">
      <template #list="slotProps">
        <div class="flex flex-col max-w-5xl">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <ParkingEntryListItem :parkingEntry="item" :index="index" />
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
