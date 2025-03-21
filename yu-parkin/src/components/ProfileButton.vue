<script setup>
import { ref } from "vue";
import { Popover, Button } from "primevue";
import { useUserStore } from "@/lib/stores/user";

const userStore = useUserStore();
const profilePopOver = ref();
const toggle = (event) => {
  profilePopOver.value.toggle(event);
}
const logout = () => {
  profilePopOver.value.hide();
  userStore.logout();
}
</script>
<template>
  <div class="card flex justify-center">
    <Button type="button" icon="pi pi-user" variant="text" rounded aria-label="Profile" @click="toggle" />

    <Popover ref="profilePopOver">
      <div class="flex flex-col gap-4 w-[16rem]">
        <div>
          <span class="font-medium block mb-2">Hello, {{ userStore.current.name }}</span>
        </div>
        <div>
          <Button icon='pi pi-sign-out' v-if="userStore.current" label="Logout" @click="logout" />
        </div>
      </div>
    </Popover>
  </div>
</template>
