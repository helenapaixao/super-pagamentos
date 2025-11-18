<template>
  <div class="sparkline-chart">
    <svg :width="width" :height="height" viewBox="0 0 78 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#0641FC;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#B882FE;stop-opacity:1" />
        </linearGradient>
      </defs>
      <polyline
        :points="polylinePoints"
        fill="none"
        stroke="url(#sparkline-gradient)"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  width: {
    type: Number,
    default: 78
  },
  height: {
    type: Number,
    default: 26
  },
  strokeWidth: {
    type: Number,
    default: 1.5
  }
})

const polylinePoints = computed(() => {
  const values = props.data || []
  if (values.length === 0) return '0,26 78,26'
  
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const width = props.width
  const height = props.height
  const step = width / (values.length - 1 || 1)
  
  return values
    .map((value, index) => {
      const x = index * step
      const normalized = (value - min) / range
      const y = height - normalized * height
      return `${x},${y}`
    })
    .join(' ')
})
</script>

<style scoped>
.sparkline-chart {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
}

.sparkline-chart svg {
  display: block;
}
</style>

