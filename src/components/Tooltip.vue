<template>
  <div 
    class="tooltip-wrapper"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
    ref="triggerRef"
  >
    <slot></slot>

    <Teleport to="body">
      <Transition name="tooltip">
        <div
          v-if="isVisible"
          :class="['tooltip', `tooltip-${position}`]"
          :style="tooltipStyle"
          ref="tooltipRef"
          role="tooltip"
        >
          {{ content }}
          <div :class="['tooltip-arrow', `tooltip-arrow-${position}`]"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  delay: {
    type: Number,
    default: 200
  },
  maxWidth: {
    type: Number,
    default: 250
  }
})

const isVisible = ref(false)
const triggerRef = ref(null)
const tooltipRef = ref(null)
const tooltipStyle = ref({})
let timeoutId = null

const show = () => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    isVisible.value = true
    nextTick(() => {
      updatePosition()
    })
  }, props.delay)
}

const hide = () => {
  clearTimeout(timeoutId)
  isVisible.value = false
}

const updatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  let top = 0
  let left = 0

  switch (props.position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - 8
      left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)
      break
    case 'bottom':
      top = triggerRect.bottom + 8
      left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2)
      left = triggerRect.left - tooltipRect.width - 8
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2)
      left = triggerRect.right + 8
      break
  }

  tooltipStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    maxWidth: `${props.maxWidth}px`
  }
}

onMounted(() => {
  window.addEventListener('scroll', updatePosition, true)
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
  clearTimeout(timeoutId)
})
</script>

<style scoped>
.tooltip-wrapper {
  display: inline-flex;
  position: relative;
}

.tooltip {
  position: fixed;
  background-color: #2A2E33;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  z-index: 10000;
  pointer-events: none;
  word-wrap: break-word;
}

.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #2A2E33;
  transform: rotate(45deg);
}

.tooltip-top .tooltip-arrow {
  bottom: -4px;
  left: 50%;
  margin-left: -4px;
}

.tooltip-bottom .tooltip-arrow {
  top: -4px;
  left: 50%;
  margin-left: -4px;
}

.tooltip-left .tooltip-arrow {
  right: -4px;
  top: 50%;
  margin-top: -4px;
}

.tooltip-right .tooltip-arrow {
  left: -4px;
  top: 50%;
  margin-top: -4px;
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>

