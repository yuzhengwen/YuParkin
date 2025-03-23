<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { teams } from "@/lib/appwrite";
import { useUserStore } from "@/lib/stores/user";

const route = useRoute();
const router = useRouter();
const message = ref("Processing your invite...");

onMounted(async () => {
  const user = useUserStore();
  console.log("AcceptInviteView user.current:", user.current);
  if (!user.current) return;
  const userId = route.query.userId;
  const secret = route.query.secret;
  const membershipId = route.query.membershipId;
  const teamId = route.query.teamId;

  if (!userId || !secret) {
    message.value = "Invalid invite link.";
    return;
  }

  try {
    await teams.updateMembershipStatus(teamId, membershipId, userId, secret);
    message.value = "You have successfully joined the team!";
    setTimeout(() => router.push({ name: 'home' }), 3000); // Redirect after 3 seconds
  } catch (error) {
    console.error("Membership confirmation failed:", error);
    message.value = "Failed to accept the invite.";
  }
});
</script>

<template>
  <div class="text-center p-6">
    <h2>{{ message }}</h2>
  </div>
</template>
