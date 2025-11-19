<template>
  <span 
    :class="[
      'badge',
      `badge-${variant}`,
      `badge-${size}`,
      { 'badge-outlined': outlined },
      { 'badge-rounded': rounded }
    ]"
  >
    <component 
      v-if="icon" 
      :is="icon" 
      :size="iconSize" 
      class="badge-icon" 
    />
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'
    ].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  outlined: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  }
})

const iconSize = computed(() => {
  const sizes = {
    small: 12,
    medium: 14,
    large: 16
  }
  return sizes[props.size]
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.badge-small {
  padding: 2px 8px;
  font-size: 11px;
}

.badge-medium {
  padding: 4px 12px;
  font-size: 12px;
}

.badge-large {
  padding: 6px 16px;
  font-size: 14px;
}

.badge-primary {
  background-color: #0641FC;
  color: white;
}

.badge-secondary {
  background-color: #6B7280;
  color: white;
}

.badge-success {
  background-color: #10B981;
  color: white;
}

.badge-warning {
  background-color: #F59E0B;
  color: white;
}

.badge-danger {
  background-color: #EF4444;
  color: white;
}

.badge-info {
  background-color: #3B82F6;
  color: white;
}

.badge-neutral {
  background-color: #F3F4F6;
  color: #2A2E33;
}

.badge-outlined.badge-primary {
  background-color: transparent;
  color: #0641FC;
  border: 1.5px solid #0641FC;
}

.badge-outlined.badge-secondary {
  background-color: transparent;
  color: #6B7280;
  border: 1.5px solid #6B7280;
}

.badge-outlined.badge-success {
  background-color: transparent;
  color: #10B981;
  border: 1.5px solid #10B981;
}

.badge-outlined.badge-warning {
  background-color: transparent;
  color: #F59E0B;
  border: 1.5px solid #F59E0B;
}

.badge-outlined.badge-danger {
  background-color: transparent;
  color: #EF4444;
  border: 1.5px solid #EF4444;
}

.badge-outlined.badge-info {
  background-color: transparent;
  color: #3B82F6;
  border: 1.5px solid #3B82F6;
}

.badge-outlined.badge-neutral {
  background-color: transparent;
  color: #2A2E33;
  border: 1.5px solid #D1D5DB;
}

.badge-rounded {
  border-radius: 250px;
}

.badge-icon {
  flex-shrink: 0;
}
</style>

