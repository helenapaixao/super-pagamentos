<template>
  <DropdownSelect
    v-model="localPeriod"
    :icon-component="Calendar"
    :options="periodOptions"
    placeholder="Período: Específico"
    width="200px"
    @change="handleChange"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { Calendar } from '@solar-icons/vue'
import DropdownSelect from './DropdownSelect.vue'

const props = defineProps({
  periodo: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['change'])

const localPeriod = ref(props.periodo)

watch(() => props.periodo, (newVal) => {
  localPeriod.value = newVal
})

const periodOptions = [
  { value: 'hoje', label: 'Hoje' },
  { value: 'semana', label: 'Esta semana' },
  { value: 'mes', label: 'Este mês' },
  { value: 'ano', label: 'Este ano' }
]

const handleChange = (newPeriod) => {
  localPeriod.value = newPeriod
  emit('change', newPeriod)
}
</script>

