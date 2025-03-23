<script setup>

import CreateTeam from '@/components/CreateTeam.vue';
import InviteMember from '@/components/InviteMember.vue';
import { Divider } from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useTeamsStore } from '@/lib/stores/teams';

</script>
<template>
  <div>
    <div class="flex flex-row gap-4 items-center mb-4">
      <InviteMember />
      <CreateTeam />
    </div>
    <Divider />
    <h2 class="text-2xl font-bold">Your Car Groups</h2>
    <DataTable :value="useTeamsStore().userTeamsObj.teams" tableStyle="min-width: 20rem" responsiveLayout="stack"
      id="dt-responsive-table">
      <Column field="name" header="Name"></Column>
      <Column field="total" header="Members"></Column>
      <Column field="$createdAt" header="Created"></Column>
      <Column class="w-24 !text-end">
        <template #body="{ data }">
          <InviteMember :selectedTeam="data"></InviteMember>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style>
@media (max-width: 767px) {

  /* Styles for the table header */
  #dt-responsive-table table thead {
    display: none !important;
    /* Hide the table header on mobile */
  }

  /* Styles for the table rows */
  #dt-responsive-table table tbody {
    width: 85% !important;
    display: flex !important;
    flex-direction: column !important;
    /* Adjust the min-height as needed */
  }

  #dt-responsive-table table tbody tr {
    margin-bottom: 1rem !important;
    border-radius: 0.5rem !important;
  }

}
</style>
