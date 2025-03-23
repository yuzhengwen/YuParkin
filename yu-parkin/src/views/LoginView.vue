<script setup>
import { account } from "@/lib/appwrite";
import { useUserStore } from "../lib/stores/user";
import { Button, InputText } from "primevue";
import { ref } from "vue";
import { OAuthProvider } from "appwrite";
import GoogleSignInButton from "@/components/GoogleSignInButton.vue";

const user = useUserStore();
const email = ref("");
const password = ref("");
const name = ref("");
const mode = ref("login");

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
</script>

<template>
  <div>
    <section>

      <form class="flex flex-col gap-4 w-full sm:w-56"
        @submit.prevent="mode == 'login' ? user.login(email, password) : user.register(email, password, name)">
        <InputText v-if="mode == 'register'" type="text" placeholder="Name" v-model="name" />
        <InputText required type="email" placeholder="Email" v-model="email" />
        <InputText required type="password" placeholder="Password" v-model="password" />
        <Button v-if="mode == 'login'" type="submit" :label="mode == 'login' ? 'Login' : 'Register'" />
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
