<template>
  <button class="download-btn" type="button" :title="title" @click="$emit('click')">
    <DownloadMinimalistic :size="20" class="download-icon" />
  </button>
</template>

<script setup>
import { DownloadMinimalistic } from '@solar-icons/vue'

defineProps({
  title: {
    type: String,
    default: 'Download'
  }
})

defineEmits(['click'])
</script>

<style scoped>
.download-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.download-btn:hover {
  border-color: #2563eb;
  background-color: #f3f4f6;
}

.download-icon {
  color: #2A2E33;
}
</style>


