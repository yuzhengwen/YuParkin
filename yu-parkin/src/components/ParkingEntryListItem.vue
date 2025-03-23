<script setup>
import { useUserStore } from "@/lib/stores/user";
import { Button } from "primevue";
import DeleteEntry from "@/components/DeleteEntry.vue";
import { getTeamFromId } from "@/lib/stores/teams";
import carPic from "@/assets/car.png";
import ParkingEntryDetailed from "./ParkingEntryDetailed.vue";
const user = useUserStore();
const { parkingEntry, index } = defineProps(['parkingEntry', 'index']);
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center py-4 px-6 gap-4"
    :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
    <div class="w-20 md:w-30 relative">
      <img class="block xl:block mx-auto rounded w-full" :src="carPic" alt="Carpark" />
    </div>
    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
      <div class='flex flex-col gap-2'>
        <span class="text-xl font-bold mt-2">{{ parkingEntry['carpark-name'] }}</span> <!-- Carpark name -->
        <span class="text-xl font-semibold mt-2">Car Group: {{ getTeamFromId(parkingEntry['team-id']) }}</span>
        <div class="text-xl font-semibold mt-2">{{ parkingEntry.level }}</div> <!-- Display parking level -->
      </div>
      <div class="flex flex-col md:items-end gap-2">
        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">
          Parked at: {{ parkingEntry.$createdAt }}</span>
        <span class="text-l font-medium">Parked by: {{ parkingEntry.driver }}</span>
        <!-- Button Group -->
        <div class="flex flex-row-reverse md:flex-row gap-2">
          <ParkingEntryDetailed :parkingEntry="parkingEntry" />
          <Button as="a" :href="'https://www.google.com/maps/search/?api=1&query=' + parkingEntry.address"
            target="_blank" rel="noopener" :disabled="!parkingEntry.address" icon="pi pi-map-marker" />
          <Button icon="pi pi-pencil" outlined :disabled="user.current && parkingEntry.userId !== user.current.$id" />
          <DeleteEntry :id="parkingEntry.$id" :disabled="user.current && parkingEntry.userId !== user.current.$id" />
        </div>
      </div>
    </div>
  </div>
</template>
