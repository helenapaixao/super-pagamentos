<template>
  <div class="select-wrapper">
    <Calendar :size="20" class="select-icon" />
    <select v-model="localPeriodo" class="select-control" @change="handleChange">
      <option value="especifico">Período: Específico</option>
      <option value="hoje">Hoje</option>
      <option value="semana">Esta semana</option>
      <option value="mes">Este mês</option>
      <option value="ano">Este ano</option>
    </select>
    <img :src="roundAltArrowDownIcon" alt="" class="select-chevron" width="24" height="24" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Calendar } from '@solar-icons/vue'
import roundAltArrowDownIcon from '@/assets/icons/round-alt-arrow-down-linear.svg'

const props = defineProps({
  periodo: {
    type: String,
    default: 'especifico'
  }
})

const emit = defineEmits(['change'])

const localPeriodo = ref(props.periodo)

watch(() => props.periodo, (newVal) => {
  localPeriodo.value = newVal
})

const handleChange = () => {
  emit('change', localPeriodo.value)
}
</script>

<style scoped>
.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
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

