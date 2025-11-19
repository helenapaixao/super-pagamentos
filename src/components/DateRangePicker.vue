<template>
  <div class="date-range-wrapper">
    <div class="date-field date-field-start">
      <Calendar :size="20" class="date-icon" />
      <span class="date-display">{{ formatDate(dataInicio) }}</span>
      <img :src="roundAltArrowDownIcon" alt="" class="date-chevron" width="24" height="24" />
      <input
        type="date"
        v-model="dataInicio"
        class="date-range-input"
        @change="formatDateAndEmit"
      />
    </div>
    <div class="date-divider"></div>
    <div class="date-field date-field-end">
      <span class="date-display">{{ formatDate(dataFim) }}</span>
      <img :src="roundAltArrowDownIcon" alt="" class="date-chevron" width="24" height="24" />
      <input
        type="date"
        v-model="dataFim"
        class="date-range-input"
        @change="formatDateAndEmit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Calendar } from '@solar-icons/vue'
import roundAltArrowDownIcon from '@/assets/icons/round-alt-arrow-down-linear.svg'

const props = defineProps({
  inicio: {
    type: String,
    default: ''
  },
  fim: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['change'])

const getDefaultStartDate = () => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return date.toISOString().split('T')[0]
}

const getDefaultEndDate = () => {
  return new Date().toISOString().split('T')[0]
}

const dataInicio = ref(props.inicio || getDefaultStartDate())
const dataFim = ref(props.fim || getDefaultEndDate())

watch(() => props.inicio, (newVal) => {
  dataInicio.value = newVal
})

watch(() => props.fim, (newVal) => {
  dataFim.value = newVal
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const formatDateAndEmit = () => {
  emit('change', { inicio: dataInicio.value, fim: dataFim.value })
}
</script>

<style scoped>
.date-range-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  height: 40px;
  border: 1px solid #d1d5db;
  border-radius: 250px;
  background-color: white;
  transition: border-color 0.2s;
  min-width: fit-content;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: visible;
  box-sizing: border-box;
}

.date-range-wrapper:hover {
  border-color: #2563eb;
}

.date-field {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  min-width: fit-content;
  overflow: visible;
}

.date-field-start {
  gap: 0.375rem;
}

.date-field-end {
  gap: 0.375rem;
}

.date-icon {
  color: #86898B;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.date-range-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font-size: 16px;
  pointer-events: auto;
  box-sizing: border-box;
}

.date-display {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: auto;
  letter-spacing: 0%;
  color: #2A2E33;
  pointer-events: none;
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.date-chevron {
  color: #2A2E33;
  flex-shrink: 0;
  pointer-events: none;
  position: relative;
  z-index: 1;
}

.date-divider {
  width: 1px;
  height: 18px;
  background-color: #D9D9D9;
  flex-shrink: 0;
  margin: 0 0.25rem;
}

@media (max-width: 1200px) {
  .date-range-wrapper {
    gap: 0.375rem;
    padding: 0 0.625rem;
  }

  .date-field-start,
  .date-field-end {
    gap: 0.25rem;
  }

  .date-display {
    font-size: 13px;
  }

  .date-icon {
    width: 18px;
    height: 18px;
  }

  .date-chevron {
    width: 20px;
    height: 20px;
  }

  .date-divider {
    margin: 0 0.125rem;
  }
}

@media (max-width: 900px) {
  .date-range-wrapper {
    gap: 0.25rem;
    padding: 0 0.5rem;
  }

  .date-field-start,
  .date-field-end {
    gap: 0.25rem;
  }

  .date-display {
    font-size: 12px;
  }

  .date-icon {
    width: 16px;
    height: 16px;
  }

  .date-chevron {
    width: 18px;
    height: 18px;
  }

  .date-divider {
    margin: 0 0.0625rem;
  }
}
</style>

