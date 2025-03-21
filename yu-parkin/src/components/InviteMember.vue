<script setup>
import { InputText } from "primevue";
import { Button } from "primevue";
import Dialog from 'primevue/dialog';
import { ref } from "vue";
import Select from "primevue/select";
import { useTeamsStore } from "@/lib/stores/teams";

const teamsStore = useTeamsStore();
const visible = ref(false);
// input fields
const email = ref("");
const team = ref();

// if selectedTeam prop was passed, use it, else use team from select
const props = defineProps(['selectedTeam']);

const invite = () => {
  const promise = teamsStore.joinTeam(
    props.selectedTeam ? props.selectedTeam.$id : team.value.$id,
    email.value
  );

  promise.then(function (response) {
    console.log(response); // Success
  }, function (error) {
    console.log(error); // Failure
  });
  visible.value = false;
};
</script>

<template>
  <Button icon='pi pi-user-plus' class='w-fit' label="Invite" @click="visible = true" />
  <Dialog v-model:visible="visible" modal header="Invite a Member" :class="{ 'w-fit': true }">
    <form class="flex flex-col gap-4 w-full sm:w-56">
      <Select v-if="!selectedTeam" v-model="team" :options="teamsStore.userTeamsObj.teams" optionLabel="name"
        placeholder="Select a Team" class="w-full md:w-56" />
      <InputText type="text" placeholder="Email to invite" v-model="email" />
      <Button type="button" @click="invite">Submit</Button>
    </form>
  </Dialog>
</template>
