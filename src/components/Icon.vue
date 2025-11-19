<template>
  <component 
    v-if="component"
    :is="component" 
    :size="size" 
    :class="['icon', `icon-${color}`]"
    :style="{ cursor: clickable ? 'pointer' : 'default' }"
    @click="handleClick"
  />
  <img 
    v-else-if="src"
    :src="src"
    :alt="alt"
    :width="size"
    :height="size"
    :class="['icon', `icon-${color}`]"
    :style="{ cursor: clickable ? 'pointer' : 'default' }"
    @click="handleClick"
  />
</template>

<script setup>
const props = defineProps({
  component: {
    type: Object,
    default: null
  },
  src: {
    type: String,
    default: null
  },
  alt: {
    type: String,
    default: 'icon'
  },
  size: {
    type: Number,
    default: 24
  },
  color: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default', 'primary', 'secondary', 'success', 'warning', 'danger', 'muted'
    ].includes(value)
  },
  clickable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
.icon {
  display: inline-flex;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.icon-default {
  color: currentColor;
}

.icon-primary {
  color: #0641FC;
}

.icon-secondary {
  color: #6B7280;
}

.icon-success {
  color: #10B981;
}

.icon-warning {
  color: #F59E0B;
}

.icon-danger {
  color: #EF4444;
}

.icon-muted {
  color: #9CA3AF;
}

.icon[style*="cursor: pointer"]:hover {
  opacity: 0.7;
  transform: scale(1.1);
}
</style>

