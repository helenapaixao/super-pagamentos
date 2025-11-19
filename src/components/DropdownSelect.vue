<template>
  <div class="dropdown-select-wrapper" :class="{ 'is-open': isOpen }" :style="{ width: width, minWidth: width, maxWidth: width }" @click="handleWrapperClick" ref="selectRef">
    <component :is="iconComponent" :size="20" class="select-icon" v-if="iconComponent" />
    <img :src="iconSrc" alt="" class="select-icon" v-if="iconSrc" />
    
    <div class="select-display">
      <span class="select-text">{{ displayText }}</span>
      <img :src="roundAltArrowDownIcon" alt="" class="select-chevron" width="24" height="24" :class="{ 'rotated': isOpen }" />
    </div>

    <Teleport to="body" v-if="isOpen">
      <div class="dropdown-overlay" @mousedown="closeDropdown"></div>
      <div class="dropdown-menu" ref="dropdownRef" @mousedown.stop>
        <div
          v-for="option in options"
          :key="option.value"
          class="dropdown-option"
          :class="{ 'is-selected': modelValue === option.value }"
          @mousedown.stop="selectOption(option.value)"
        >
          <span class="option-label">{{ option.label }}</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { Teleport } from 'vue'
import roundAltArrowDownIcon from '@/assets/icons/round-alt-arrow-down-linear.svg'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  iconComponent: {
    type: Object,
    default: null
  },
  iconSrc: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Selecione uma opção'
  },
  width: {
    type: String,
    default: '180px'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const selectRef = ref(null)
const dropdownRef = ref(null)

const displayText = computed(() => {
  if (!props.modelValue || props.modelValue === '') {
    return props.placeholder
  }
  const selectedOption = props.options.find(opt => opt.value === props.modelValue)
  return selectedOption ? selectedOption.label : props.placeholder
})

const handleWrapperClick = (e) => {
  e.stopPropagation()
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      positionDropdown()
    })
  }
}

const positionDropdown = () => {
  if (!selectRef.value || !dropdownRef.value) return
  
  const rect = selectRef.value.getBoundingClientRect()
  dropdownRef.value.style.top = `${rect.bottom + 8}px`
  dropdownRef.value.style.left = `${rect.left}px`
  dropdownRef.value.style.width = `${rect.width}px`
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectOption = (value) => {
  if (!value || value === '') return
  emit('update:modelValue', value)
  emit('change', value)
  setTimeout(() => {
    closeDropdown()
  }, 150)
}

watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      positionDropdown()
      window.addEventListener('resize', positionDropdown)
      window.addEventListener('scroll', positionDropdown, true)
    })
  } else {
    window.removeEventListener('resize', positionDropdown)
    window.removeEventListener('scroll', positionDropdown, true)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', positionDropdown)
  window.removeEventListener('scroll', positionDropdown, true)
})
</script>

<style scoped>
.dropdown-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  height: 40px;
  border: 1px solid #D9D9D9;
  border-radius: 250px;
  background-color: white;
  transition: border-color 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
  cursor: pointer;
  z-index: 100;
  user-select: none;
  -webkit-user-select: none;
  overflow: visible;
}

.dropdown-select-wrapper:hover {
  border-color: #2563eb;
}

.dropdown-select-wrapper.is-open {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.select-icon {
  color: #0641FC;
  flex-shrink: 0;
  pointer-events: none;
  position: relative;
  z-index: 1;
}

.select-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
  gap: 0.5rem;
}

.select-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: auto;
  letter-spacing: 0%;
  color: #2A2E33;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-chevron {
  color: #2A2E33;
  flex-shrink: 0;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.select-chevron.rotated {
  transform: rotate(180deg);
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: transparent;
  pointer-events: auto;
}

.dropdown-menu {
  position: fixed;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 10001;
  max-height: 300px;
  overflow-y: auto;
  pointer-events: auto;
}

.dropdown-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.15s ease;
  border-bottom: 1px solid #F3F4F6;
}

.dropdown-option:last-child {
  border-bottom: none;
}

.dropdown-option:hover {
  background-color: #F9FAFB;
}

.dropdown-option.is-selected {
  background-color: #EFF6FF;
  color: #0641FC;
  font-weight: 600;
}

.option-label {
  flex: 1;
}

.dropdown-menu::-webkit-scrollbar {
  width: 6px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background-color: #D1D5DB;
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background-color: #9CA3AF;
}
</style>
