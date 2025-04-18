<script setup>
import { InputText, useToast } from "primevue";
import { Button, Select, Divider } from "primevue";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "primevue";
import Dialog from 'primevue/dialog';
import { ref, watch, } from "vue";
import { parking } from "@/lib/stores/parking";
import { useUserStore } from "@/lib/stores/user";
import { useTeamsStore } from "@/lib/stores/teams";
import ParkingLocation from "@/components/ParkingLocation.vue";
import UserImageUpload from "./UserImageUpload.vue";
import { ID, storage } from "@/lib/appwrite";

const user = useUserStore();
const teamsStore = useTeamsStore();
const toast = useToast();
const visible = ref(false);
const loading = ref(false);

// form values
const level = ref('');
const address = ref('');
const teamId = ref('');
const carparkName = ref('');
const images = ref([]);

const validateForm = () => {
  // carpark level and name are already validated by the required attribute
  if (!teamId.value) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please choose a team', life: 3000 });
    return false;
  }
  return true;
}
const addParkingEntry = async () => {
  if (!validateForm()) return;
  loading.value = true;
  const files = await uploadImages();
  const fileIds = files.map(file => file.$id);
  await parking.add({
    userId: user.current.$id,
    driver: user.current.name,
    'carpark-name': carparkName.value,
    level: level.value,
    'team-id': teamId.value,
    address: address.value,
    imageIds: fileIds,
  });
  // clear form so the next entry won't have the same values
  clearForm();

  loading.value = false;
  visible.value = false;
  toast.add({ severity: 'success', summary: 'Added', detail: 'Parking entry added!', life: 3000 });
}
const uploadImages = async () => {
  const files = [];
  console.log(images.value);
  for (const image of images.value) {
    try {
      const file = await storage.createFile(
        import.meta.env.VITE_UPLOAD_BUCKET_ID,
        ID.unique(),
        image);
      console.log(file);
      files.push(file);
    } catch (e) {
      console.error(e);
    }
  }
  return files;
}
const updateLocation = (location) => {
  address.value = location.address;
}
const onSelectFiles = (files) => {
  images.value = files;
  console.log(images.value);
}
const clearForm = () => {
  carparkName.value = "";
  level.value = "";
  address.value = "";
  teamId.value = "";
  images.value = [];
}
watch(visible, (newVal) => {
  if (!newVal) {
    clearForm();
  }
});
</script>

<template>
  <Button class='w-fit' @click="visible = true">
    <span class="hidden sm:inline">Add Parking Entry</span>
    <i class="pi pi-plus"></i>
  </Button>
  <Dialog v-model:visible="visible" modal header="New Parking Entry" class="md:w-96">
    <form class="flex flex-col gap-4 items-center" @submit.prevent="addParkingEntry">
      <Tabs value="0">
        <TabList>
          <Tab value="0">Basic</Tab>
          <Tab value="1">Location</Tab>
          <Tab value="2">Images</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <Select :invalid="!teamId" v-model="teamId" :options="teamsStore.userTeamsObj.teams" optionValue="$id"
              optionLabel="name" placeholder="Select a Team" class="w-fit md:w-56"
              :defaultValue="teamsStore.userTeamsObj.teams[0].name" /><br>
            <span class="text-xs text-surface-500 dark:text-surface-400">* Required field</span>
            <Divider />
            <div class="flex flex-col gap-2">
              <InputText required type="text" placeholder="Carpark Name" v-model="carparkName" />
              <span class="text-xs text-surface-500 dark:text-surface-400">* Required field</span>
              <InputText required type="text" placeholder="Level" v-model="level" />
              <span class="text-xs text-surface-500 dark:text-surface-400 mt-0 p-0">* Required field</span>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div class="flex flex-col gap-4">
              <ParkingLocation @getLocation="updateLocation" :showAddress='false' :showLatlng='true' />
              <InputText type="text" placeholder="Address" v-model="address" />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <UserImageUpload @selectFiles="onSelectFiles" />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button type="submit" label="Submit" :loading="loading" />
    </form>
  </Dialog>
</template>
