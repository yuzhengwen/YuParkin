<script setup>
import { account } from '@/lib/appwrite';
import router from '@/router';
import { InputText , Button, useToast} from 'primevue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.query.userId;
const secret = route.query.secret;
const toast = useToast();

const password = ref('');
const loading = ref(false);

onMounted(() => {
  if (!userId || !secret) {
    router.push({ name: 'login' });
    return;
  }
});
const handleReset = async () => {
  loading.value = true;
  await account.updateRecovery(userId, secret, password.value);
  loading.value = false;
  router.push({ name: 'login' });
  console.log('Password reset');
  toast.add({ severity: 'success', summary: 'Password Reset', detail: 'Password has been reset.', life: 3000 });
};
</script>

<template>
  <div>
    <h1 class="mb-3 text-xl font-semibold">Reset Password</h1>
    <form @submit.prevent="handleReset">
      <InputText required type="password" placeholder="New Password" v-model="password" />
      <Button :loading="loading" label="Reset Password" type="submit" />
    </form>
  </div>
</template>
