<template>
  <button 
    :class="['base-button', `base-button-${variant}`, { 'base-button-full-width': fullWidth }]"
    :style="{ gap: `${gap}px` }"
    @click="$emit('click')"
    :type="type"
  >
    <span class="button-text">{{ text }}</span>
    <component v-if="icon" :is="icon" :size="iconSize" class="button-icon" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  icon: {
    type: [Object, String],
    default: null
  },
  iconSize: {
    type: Number,
    default: 20
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  gap: {
    type: Number,
    default: 8
  }
})

defineEmits(['click'])
</script>

<style scoped>
.base-button {
  border: 1px solid;
  padding: 12px 24px;
  border-radius: 250px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}

.base-button-primary {
  background-color: #0641FC;
  color: white;
}

.base-button-primary:hover {
  background-color: #0530d4;
}

.base-button-secondary {
  background-color: #F5F5F5;
  color: #2A2E33;
}

.base-button-secondary:hover {
  background-color: #E5E7EB;
}

.base-button-outline {
  background-color: transparent;
  color: #0641FC;
  border: 1px solid #0641FC;
}

.base-button-outline:hover {
  background-color: #F0F4FF;
}

.button-text {
  color: inherit;
}

.button-icon {
  color: inherit;
  flex-shrink: 0;
}

.base-button-full-width {
  width: 100%;
}
</style>

