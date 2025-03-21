<script setup>
import { Button } from 'primevue';
import { ref } from 'vue';

const { showLatlng = true, showAddress = true } = defineProps(['showLatlng', 'showAddress']);
const emit = defineEmits(['getLocation']);
const location = ref(null);
const formattedAddress = ref('');
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    location.value = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    formattedAddress.value = await getAddress(location.value);
    emit('getLocation', {
      latitude: location.value.latitude,
      longitude: location.value.longitude,
      address: formattedAddress.value
    });
  }, (error) => {
    console.error(error);
  },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
};
const getAddress = async (location) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results[0].formatted_address;
}
</script>

<template>
  <Button label="Get Location" @click="getLocation" />
  <div v-if="location" class="font-medium text-surface-500 dark:text-surface-400 text-sm">
    <p v-if="showLatlng">Latitude: {{ location.latitude }}</p>
    <p v-if="showLatlng">Longitude: {{ location.longitude }}</p>
    <p v-if="formattedAddress && showAddress">Address: {{ formattedAddress }}</p>
  </div>
</template>
