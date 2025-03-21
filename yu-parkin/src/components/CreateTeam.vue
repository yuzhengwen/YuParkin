<script setup>
import { InputText } from "primevue";
import { Button } from "primevue";
import Dialog from 'primevue/dialog';
import { ref } from "vue";
import { useTeamsStore } from "@/lib/stores/teams";

const teamsStore = useTeamsStore();
const visible = ref(false);
const teamName = ref("");
const createTeam = () => {
  teamsStore.createTeam(teamName.value);
  visible.value = false;
};
</script>

<template>
  <Button icon='pi pi-plus' class='w-fit' label="Add Team" @click="visible = true" />
  <Dialog v-model:visible="visible" modal header="Add a New Team" :class="{ 'w-fit': true }">
    <form class="flex flex-col gap-4 w-full sm:w-56">
      <InputText type="text" placeholder="Team Name" v-model="teamName" />
      <Button type="button" @click="createTeam">Submit</Button>
    </form>
  </Dialog>
</template>
