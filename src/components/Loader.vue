<template>
  <div 
    :class="['loader-wrapper', `loader-${variant}`]"
    :style="{ 
      minHeight: fullscreen ? '100vh' : `${size * 3}px` 
    }"
  >
    <div v-if="type === 'spinner'" class="loader-spinner" :style="spinnerStyle">
      <div class="loader-spinner-circle"></div>
    </div>

    <div v-else-if="type === 'dots'" class="loader-dots">
      <span class="loader-dot"></span>
      <span class="loader-dot"></span>
      <span class="loader-dot"></span>
    </div>

    <div v-else-if="type === 'pulse'" class="loader-pulse" :style="pulseStyle"></div>

    <div v-else-if="type === 'bar'" class="loader-bar-container" :style="{ width: `${size * 4}px` }">
      <div class="loader-bar"></div>
    </div>

    <p v-if="text" class="loader-text">{{ text }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'spinner',
    validator: (value) => ['spinner', 'dots', 'pulse', 'bar'].includes(value)
  },
  size: {
    type: Number,
    default: 40
  },
  color: {
    type: String,
    default: '#0641FC'
  },
  text: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'overlay', 'inline'].includes(value)
  },
  fullscreen: {
    type: Boolean,
    default: false
  }
})

const spinnerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderColor: `${props.color}33`,
  borderTopColor: props.color,
  borderWidth: `${Math.max(2, props.size / 10)}px`
}))

const pulseStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  backgroundColor: props.color
}))
</script>

<style scoped>
.loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.loader-normal {
  padding: 2rem;
}

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9998;
}

.loader-inline {
  padding: 1rem;
}

.loader-spinner {
  border-style: solid;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-spinner-circle {
  width: 100%;
  height: 100%;
}

.loader-dots {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.loader-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #0641FC;
  animation: dot-bounce 1.4s infinite ease-in-out both;
}

.loader-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loader-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes dot-bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.loader-pulse {
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

.loader-bar-container {
  height: 4px;
  background-color: #E5E7EB;
  border-radius: 2px;
  overflow: hidden;
}

.loader-bar {
  height: 100%;
  background-color: #0641FC;
  animation: bar-progress 1.5s ease-in-out infinite;
}

@keyframes bar-progress {
  0% {
    width: 0%;
    margin-left: 0%;
  }
  50% {
    width: 50%;
    margin-left: 25%;
  }
  100% {
    width: 0%;
    margin-left: 100%;
  }
}

.loader-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #6B7280;
  margin: 0;
  text-align: center;
}
</style>

