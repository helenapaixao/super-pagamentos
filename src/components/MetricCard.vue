<template>
  <div class="metric-item metric-item-base">
    <div class="metric-header" v-if="tag">
      <span class="metric-label">{{ label }}</span>
      <span class="metric-tag">{{ tag }}</span>
    </div>
    <div class="metric-content-base" v-else>
      <span class="metric-label">{{ label }}</span>
    </div>
    <div class="metric-value-row">
      <div v-if="dotType === 'blue'" class="metric-dot-group">
        <span class="metric-dot metric-dot-shadow"></span>
        <span class="metric-dot metric-dot-blue-front"></span>
      </div>
      <div v-else-if="dotType === 'purple'" class="metric-dot-group metric-dot-group-purple">
        <span class="metric-dot metric-dot-shadow-purple"></span>
        <span class="metric-dot metric-dot-purple-front"></span>
      </div>
      <div v-else-if="dotType === 'orange'" class="metric-dot-group metric-dot-group-orange">
        <span class="metric-dot metric-dot-shadow-orange"></span>
        <span class="metric-dot metric-dot-orange-front"></span>
      </div>
      <div v-else-if="dotType === 'black'" class="metric-dot-group metric-dot-group-black">
        <span class="metric-dot metric-dot-shadow-black"></span>
        <span class="metric-dot metric-dot-black-front"></span>
      </div>
      <span class="metric-value metric-value-base">{{ value }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  dotType: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'purple', 'orange', 'black'].includes(value)
  },
  tag: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.metric-item-base {
  border-radius: 12px;
  background-color: #FFFFFF;
  border: 1px solid #EEEEEE;
  padding: 1rem 1.25rem;
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.metric-content-base {
  margin-bottom: 0.5rem;
}

.metric-tag {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: #2A2E33;
  background-color:#FFFFFF;
  border: 1px solid #D9D9D9;
  padding: 0.25rem 0.625rem;
  border-radius: 250px;
  line-height: 1;
  white-space: nowrap;
}

.metric-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #86898B;
  line-height: 140%;
}

.metric-value-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.metric-dot-group {
  position: relative;
  width: 24px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
}

.metric-dot-shadow {
  position: absolute;
  left: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #0641FC;
  opacity: 0.42;
}

.metric-dot-blue-front {
  position: absolute;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #0641FC;
  z-index: 1;
}

.metric-dot-group-purple {
  position: relative;
  width: 24px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
}

.metric-dot-shadow-purple {
  position: absolute;
  left: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #852DF6;
  opacity: 0.42;
}

.metric-dot-purple-front {
  position: absolute;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #8b5cf6;
  z-index: 1;
}

.metric-dot-group-orange {
  position: relative;
  width: 24px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
}

.metric-dot-shadow-orange {
  position: absolute;
  left: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #f59e0b;
  opacity: 0.42;
}

.metric-dot-orange-front {
  position: absolute;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #f59e0b;
  z-index: 1;
}

.metric-dot-group-black {
  position: relative;
  width: 24px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
}

.metric-dot-shadow-black {
  position: absolute;
  left: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #111827;
  opacity: 0.42;
}

.metric-dot-black-front {
  position: absolute;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #111827;
  z-index: 1;
}

.metric-value-base {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  line-height: 1;
}
</style>

