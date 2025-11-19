<template>
  <DropdownSelect
    v-model="localPeriodo"
    :icon-component="Calendar"
    :options="periodoOptions"
    placeholder="Período: Específico"
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

const localPeriodo = ref(props.periodo)

watch(() => props.periodo, (newVal) => {
  localPeriodo.value = newVal
})

const periodoOptions = [
  { value: 'hoje', label: 'Hoje' },
  { value: 'semana', label: 'Esta semana' },
  { value: 'mes', label: 'Este mês' },
  { value: 'ano', label: 'Este ano' }
]

const handleChange = (newPeriodo) => {
  localPeriodo.value = newPeriodo
  emit('change', newPeriodo)
}
</script>

