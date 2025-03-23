<script setup>
import { account } from "@/lib/appwrite";
import { useUserStore } from "../lib/stores/user";
import { Button, InputText, useToast } from "primevue";
import { ref } from "vue";
import { OAuthProvider } from "appwrite";
import GoogleSignInButton from "@/components/GoogleSignInButton.vue";

const user = useUserStore();
const email = ref("");
const password = ref("");
const name = ref("");
const mode = ref("login");
const loading = ref(false);
const toast = useToast();

const returnUrl = window.location.origin;
const signInWithGoogle = async () => {
  console.log(returnUrl);
  try {
    account.createOAuth2Session(OAuthProvider.Google, returnUrl, returnUrl + "/login");
  } catch (error) {
    console.error(error)
  }
  console.log("done");
};
const handleSubmit = async () => {
  try {
    loading.value = true;
    await ((mode.value == "login") ? user.login(email.value, password.value) : user.register(email.value, password.value, name.value));
    loading.value = false;
    toast.add({ severity: 'success', summary: 'Success', detail: 'Logged in', life: 3000});
  } catch (error) {
    loading.value = false;
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000});
  }
};
</script>

<template>
  <div>
    <section>

      <form class="flex flex-col gap-4 w-full sm:w-56" @submit.prevent="handleSubmit">
        <InputText v-if="mode == 'register'" type="text" placeholder="Name" v-model="name" />
        <InputText required type="email" placeholder="Email" v-model="email" />
        <InputText required type="password" placeholder="Password" v-model="password" />
        <Button v-if="mode == 'login'" type="submit" :label="mode == 'login' ? 'Login' : 'Register'"
          :loading="loading" />
        <!--LOGIN TEXT-->
        <span v-if="mode == 'login'">Don't have an account?
          <Button class="px-0" label="Register" variant="link" @click="mode = 'register'" /></span>
        <!--REGISTER TEXT-->
        <span v-if="mode == 'register'">Already have an account?
          <Button class="px-0" label="Login" variant="link" @click="mode = 'login'" /></span>
      </form>
      <!--      <Button type="button" @click="signInWithGoogle">Sign in with Google</Button>-->
      <GoogleSignInButton @click="signInWithGoogle" />
    </section>
  </div>
</template>
