<script setup>
import { useUserStore } from '@/lib/stores/user';
import DeleteEntry from './DeleteEntry.vue';
import { Card } from 'primevue';

const user = useUserStore();
const { parkingEntry } = defineProps(['parkingEntry']);
</script>
<template>
  <Card v-if="parkingEntry" class="w-fit">
    <template #title>
      <h2 class="text-3xl">Current Parking</h2>
    </template>
    <template #content>
      <div class='block p-4 space-y-4'>
        <div class="block">
          <h2 class="text-3xl">{{ parkingEntry ? parkingEntry['carpark-name'] : "No Parking Found" }}</h2>
          <h2 v-if="parkingEntry" class="text-3xl">Level: {{ parkingEntry.level }}</h2>
        </div>
        <DeleteEntry v-if="parkingEntry" :id="parkingEntry.$id"
          :disabled="user.current && parkingEntry.userId !== user.current.$id" />
      </div>
    </template>
  </Card>
</template>
