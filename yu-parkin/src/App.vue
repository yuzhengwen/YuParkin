<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar';
import { computed } from 'vue';
import { useUserStore } from './lib/stores/user';
import ConfirmDialog from 'primevue/confirmdialog';
import { Toast, Button } from 'primevue';
import AddParking from "@/components/AddParking.vue";
import ProfileButton from './components/ProfileButton.vue';

const user = useUserStore();

const items = computed(() => [
  { label: 'Home', route: '/' },
  { label: 'Car Groups', route: '/car-groups' },
  { label: 'About', route: '/about' },
]);
function toggleDarkMode() {
  document.documentElement.classList.toggle('my-app-dark');
}

console.log(import.meta.env.MODE);
</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
        <span>{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <AddParking v-if="user.current" />
        <ProfileButton v-if="user.current" />
        <router-link v-if="!user.current" to="/login">
          <Button label="Login" />
        </router-link>
        <Button icon='pi pi-palette' @click="toggleDarkMode()" variant="text" rounded aria-label="Palette" />
      </div>
    </template>
  </Menubar>

  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="mt-8 mx-auto max-w-7xl">
    <router-view />
  </div>
</template>
