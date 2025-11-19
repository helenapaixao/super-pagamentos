<template>
  <div class="select-wrapper">
    <component :is="iconComponent" :size="20" class="select-icon" v-if="iconComponent" />
    <img :src="iconSrc" alt="" class="select-icon" v-if="iconSrc" />
    <select v-model="localValue" class="select-control" @change="handleChange">
      <slot></slot>
    </select>
    <img :src="roundAltArrowDownIcon" alt="" class="select-chevron" width="24" height="24" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import roundAltArrowDownIcon from '@/assets/icons/round-alt-arrow-down-linear.svg'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  iconComponent: {
    type: Object,
    default: null
  },
  iconSrc: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const localValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})

const handleChange = () => {
  emit('update:modelValue', localValue.value)
  emit('change', localValue.value)
}
</script>

<style scoped>
.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #D9D9D9;
  border-radius: 250px;
  background-color: white;
  transition: border-color 0.2s;
  min-width: 200px;
}

.select-wrapper:hover {
  border-color: #2563eb;
}

.select-icon {
  color: #0641FC;
  flex-shrink: 0;
  pointer-events: none;
  position: relative;
  z-index: 1;
}

.select-control {
  border: none;
  background: transparent;
  color: #374151;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: auto;
  letter-spacing: 0%;
  cursor: pointer;
  flex: 1;
  appearance: none;
  outline: none;
  position: relative;
  z-index: 2;
  min-width: 0;
}

.select-control:focus {
  outline: none;
}

.select-chevron {
  color: #2A2E33;
  flex-shrink: 0;
  pointer-events: none;
}
</style>

