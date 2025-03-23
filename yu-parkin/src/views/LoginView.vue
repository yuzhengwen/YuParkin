<script setup>
import { account } from "@/lib/appwrite";
import { useUserStore } from "../lib/stores/user";
import { Button, InputText, useToast, Dialog } from "primevue";
import { ref } from "vue";
import { OAuthProvider } from "appwrite";
import GoogleSignInButton from "@/components/GoogleSignInButton.vue";

const user = useUserStore();
const toast = useToast();
const loading = ref(false);
const recoveryDialogVisible = ref(false);
const mode = ref("login");
// form fields
const email = ref("");
const password = ref("");
const name = ref("");
const recoveryEmail = ref("");

const returnUrl = window.location.origin;
const signInWithGoogle = async () => {
  console.log(returnUrl);
  try {
    await account.createOAuth2Session(OAuthProvider.Google, returnUrl, returnUrl + "/login");
    toast.add({ severity: 'success', summary: 'Logged In', detail: `Hello, ${name.value}`, life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
  }
  console.log("done");
};
const handleSubmit = async () => {
  try {
    loading.value = true;
    await ((mode.value == "login") ? user.login(email.value, password.value) : user.register(email.value, password.value, name.value));
    loading.value = false;
    toast.add({ severity: 'success', summary: 'Logged In', detail: `Hello, ${name.value}`, life: 3000 });
  } catch (error) {
    loading.value = false;
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
  }
};
const handlePasswordRecovery = async () => {
  try {
    await account.createRecovery(recoveryEmail.value, returnUrl + "/password-reset");
    toast.add({ severity: 'success', summary: 'Recovery Email Sent', detail: 'Please check your email.', life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
  }
};
</script>

<template>
  <div>
    <section class="flex flex-col items-center gap-2 mt-8">
      <!--LOGIN FORM-->
      <form class="flex flex-col gap-4 w-full sm:w-56" @submit.prevent="handleSubmit">
        <InputText v-if="mode == 'register'" type="text" placeholder="Name" v-model="name" />
        <InputText required type="email" placeholder="Email" v-model="email" />
        <InputText required type="password" placeholder="Password" v-model="password" />
        <Button type="submit" :label="mode == 'login' ? 'Login' : 'Register'" :loading="loading" />
      </form>

      <!--LOGIN TEXT-->
      <span v-if="mode == 'login'">Don't have an account?
        <Button class="px-0" label="Register" variant="link" @click="mode = 'register'" /></span>
      <!--PASSWORD RECOVERY-->
      <span v-if="mode == 'login'">Forgot your password?
        <Button class="px-0" label="Recover" variant="link" @click="recoveryDialogVisible = true" /></span>

      <!--REGISTER TEXT-->
      <span v-if="mode == 'register'">Already have an account?
        <Button class="px-0" label="Login" variant="link" @click="mode = 'login'" /></span>

      <GoogleSignInButton @click="signInWithGoogle" />
    </section>

    <!--PASSWORD RECOVERY DIALOG-->
    <Dialog v-model:visible="recoveryDialogVisible" modal header="Password Recovery" class="md:w-96">
      <form @submit.prevent="handlePasswordRecovery">
        <span class="text-surface-500 dark:text-surface-400 block mb-4">Enter your email to receive a password recovery
          link.</span>
        <div class="flex flex-col md:flex-row gap-2 items-center mb-4">
          <label for="email" class="font-semibold w-24 text-center md:w-fit mr-2">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" v-model="recoveryEmail"/>
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" label="Cancel" severity="secondary" @click="visible = false"/>
          <Button type="submit" label="Send"/>
        </div>
      </form>
    </Dialog>
  </div>
</template>
