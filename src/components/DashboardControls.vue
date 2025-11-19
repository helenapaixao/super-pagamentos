<template>
  <div class="dashboard-controls">
    <NewChargeButton @click="emit('nova-cobranca')" />

    <div class="controls-divider"></div>
    <PeriodSelect
      :periodo="periodo"
      @change="handlePeriodoChange"
    />

    <DateRangePicker
      :inicio="dataInicio"
      :fim="dataFim"
      @change="handleDateChange"
    />

    <SelectWrapper
      v-model="tipoCobranca"
      :icon-component="CardTransfer"
      @change="handleTipoChange"
    >
      <option value="">Tipo de cobrança</option>
      <option value="credito">Crédito</option>
      <option value="debito">Débito</option>
      <option value="boleto">Boleto</option>
      <option value="pix">Pix</option>
    </SelectWrapper>

    <DownloadButton />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CardTransfer } from '@solar-icons/vue'
import DateRangePicker from './DateRangePicker.vue'
import PeriodSelect from './PeriodSelect.vue'
import SelectWrapper from './SelectWrapper.vue'
import DownloadButton from './DownloadButton.vue'
import NewChargeButton from './NewChargeButton.vue'

const periodo = ref('especifico')
const dataInicio = ref('2020-06-10')
const dataFim = ref('2025-01-30')
const tipoCobranca = ref('')

const emit = defineEmits(['nova-cobranca', 'periodo-change', 'data-change', 'tipo-change'])

const handleDateChange = (dates) => {
  dataInicio.value = dates.inicio
  dataFim.value = dates.fim
  emit('data-change', dates)
}

const handlePeriodoChange = (newPeriodo) => {
  periodo.value = newPeriodo
  emit('periodo-change', newPeriodo)
}

const handleTipoChange = (newTipo) => {
  tipoCobranca.value = newTipo
  emit('tipo-change', newTipo)
}
</script>

<style scoped>
.dashboard-controls {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}


.controls-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.controls-divider {
  width: 1px;
  height: 40px;
  background-color: #D9D9D9;
  flex-shrink: 0;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid #D9D9D9;
  border-radius: 250px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
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

.select-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: auto;
  letter-spacing: 0%;
  color: #2A2E33;
  flex: 1;
}

.select-control:focus {
  outline: none;
}

.select-chevron {
  color: #2A2E33;
  flex-shrink: 0;
}


.icon-btn {
  background: none;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.icon-btn:hover {
  background-color: #f3f4f6;
  border-color: #2563eb;
  color: #2563eb;
}

@media (max-width: 768px) {
  .dashboard-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    max-width: 392px;
    margin: 0 auto 1.5rem;
  }

  .controls-divider,
  .select-wrapper,
  .date-range-wrapper,
  :deep(.download-btn) {
    display: none;
  }
}
</style>

