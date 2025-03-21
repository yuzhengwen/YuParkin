<script setup>
import Button from 'primevue/button';
import { parking } from '@/lib/stores/parking';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const props = defineProps(['id']);

const confirm = useConfirm();
const toast = useToast();

const confirmDel = () => {
  confirm.require({
    message: 'Do you want to delete this entry?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: () => {
      parking.remove(props.id);
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
};
</script>

<template>
  <Button outlined class="flex-auto md:flex-initial whitespace-nowrap" icon="pi pi-trash" label="Delete" severity="danger"
    type="button" @click="confirmDel()">
  </Button>
</template>
