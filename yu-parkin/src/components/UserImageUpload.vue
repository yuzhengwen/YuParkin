<script setup>
import { FileUpload } from "primevue";

const emit = defineEmits("selectFiles");

const onFileSelect = (e) => {
  emit("selectFiles", e.files);
};
</script>
<template>
  <div class="w-full">
    <FileUpload name="images" :showUploadButton=false @select="onFileSelect" customUpload :multiple="true"
      accept="image/*" :maxFileSize="1000000">
      <template #empty>
        <span>Drag and drop files to here to upload.</span>
      </template>
    </FileUpload>
  </div>
</template>
