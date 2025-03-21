<script setup>
import { InputText, useToast } from "primevue";
import { Button, Select, Divider } from "primevue";
import Dialog from 'primevue/dialog';
import { ref, } from "vue";
import { parking } from "@/lib/stores/parking";
import { useUserStore } from "@/lib/stores/user";
import { useTeamsStore } from "@/lib/stores/teams";
import ParkingLocation from "@/components/ParkingLocation.vue";

const user = useUserStore();
const teamsStore = useTeamsStore();
const toast = useToast();
const visible = ref(false);
const level = ref('');
const address = ref('');
const teamId = ref('');
const carparkName = ref('');

const addParkingEntry = async () => {
  await parking.add({
    userId: user.current.$id,
    driver: user.current.name,
    'carpark-name': carparkName.value,
    level: level.value,
    'team-id': teamId.value,
    address: address.value,
  });
  carparkName.value = "";
  level.value = "";
  visible.value = false;
  toast.add({ severity: 'success', summary: 'Added', detail: 'Parking entry added!', life: 3000 });
}
const updateLocation = (location) => {
  address.value = location.address;
}
</script>

<template>
  <Button class='w-fit' @click="visible = true">
    <span class="hidden sm:inline">Add Parking Entry</span>
    <i class="pi pi-plus"></i>
  </Button>
  <Dialog v-model:visible="visible" modal header="New Parking Entry" :class="{ 'w-fit': true }">
    <form class="flex flex-col gap-4 w-full sm:w-56" @submit.prevent="addParkingEntry">
      <Select v-model="teamId" :options="teamsStore.userTeamsObj.teams" optionValue="$id" optionLabel="name"
        placeholder="Select a Team" class="w-full md:w-56" />
      <Divider />
      <InputText type="text" placeholder="Carpark Name" v-model="carparkName" />
      <InputText type="text" placeholder="Level" v-model="level" />
      <ParkingLocation @getLocation="updateLocation" :showAddress='false' :showLatlng='true' />
      <InputText type="text" placeholder="Address" v-model="address" />
      <Button type="submit" label="Submit" />
    </form>
  </Dialog>
</template>
