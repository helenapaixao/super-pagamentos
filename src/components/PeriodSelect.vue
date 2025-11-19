<template>
  <SelectWrapper
    :model-value="periodo"
    :icon-component="Calendar"
    @update:model-value="handleChange"
    @change="handleChange"
  >
    <option value="especifico">Período: Específico</option>
    <option value="hoje">Hoje</option>
    <option value="semana">Esta semana</option>
    <option value="mes">Este mês</option>
    <option value="ano">Este ano</option>
  </SelectWrapper>
</template>

<script setup>
import { Calendar } from '@solar-icons/vue'
import SelectWrapper from './SelectWrapper.vue'

const props = defineProps({
  periodo: {
    type: String,
    default: 'especifico'
  }
})

const emit = defineEmits(['change'])

const handleChange = (newPeriodo) => {
  emit('change', newPeriodo)
}
</script>

