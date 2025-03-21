<script setup>
import { useUserStore } from "../lib/stores/user";
import { Button, InputText } from "primevue";
import { ref } from "vue";

const user = useUserStore();
const email = ref("");
const password = ref("");
const name = ref("");
const mode = ref("login");
</script>

<template>
  <div>
    <section>

      <form class="flex flex-col gap-4 w-full sm:w-56">
        <InputText v-if="mode == 'register'" type="text" placeholder="Name" v-model="name" />
        <InputText type="email" placeholder="Email" v-model="email" />
        <InputText type="password" placeholder="Password" v-model="password" />
        <Button v-if="mode == 'login'" type="button" @click="user.login(email, password)">Login</Button>
        <span v-if="mode == 'login'">Don't have an account?
          <Button label="Register" variant="text" @click="mode = 'register'" /></span>
        <Button v-else type="button" @click="user.register(email, password, name)">
          Register
        </Button>
        <span v-if="mode == 'register'">Already have an account?
          <Button label="Login" variant="text" @click="mode = 'login'" /></span>
      </form>
    </section>
  </div>
</template>
