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

    <CustomSelect
      v-model="tipoCobranca"
      :icon-component="CardTransfer"
      :options="tipoCobrancaOptions"
      placeholder="Tipo de cobrança"
      @change="handleTipoChange"
    />

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
import CustomSelect from './CustomSelect.vue'

const periodo = ref('especifico')
const dataInicio = ref('2020-06-10')
const dataFim = ref('2025-01-30')
const tipoCobranca = ref('')

const tipoCobrancaOptions = [
  { value: 'credito', label: 'Crédito' },
  { value: 'debito', label: 'Débito' },
  { value: 'boleto', label: 'Boleto' },
  { value: 'pix', label: 'Pix' }
]

const emit = defineEmits(['nova-cobranca', 'periodo-change', 'data-change', 'tipo-change'])

const handleDateChange = dates => {
  dataInicio.value = dates.inicio
  dataFim.value = dates.fim
  emit('data-change', dates)
}

const handlePeriodoChange = newPeriodo => {
  periodo.value = newPeriodo
  emit('periodo-change', newPeriodo)
}

const handleTipoChange = newTipo => {
  tipoCobranca.value = newTipo
  emit('tipo-change', newTipo)
}
</script>

<style scoped>
.dashboard-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-content: flex-start;
  min-width: 0;
}

.dashboard-controls > * {
  flex: 0 1 auto;
  min-width: 0;
  height: 40px;
  display: flex;
  align-items: center;
}

.dashboard-controls :deep(.btn-primary) {
  flex: 0 0 auto;
  white-space: nowrap;
}

.controls-divider {
  width: 1px;
  height: 40px;
  background: #D9D9D9;
  flex-shrink: 0;
}

.date-range-wrapper,
.select-wrapper,
.period-select-wrapper {
  min-width: 140px;
  max-width: 360px;
  flex: 0 1 auto;
  overflow: hidden;
  white-space: nowrap;
}

.custom-select-wrapper {
  min-width: 180px;
  width: 180px;
  max-width: 180px;
  flex: 0 0 auto;
  overflow: visible;
  white-space: nowrap;
}

.date-display,
.select-control,
.select-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 1440px) {
  .dashboard-controls {
    flex-wrap: nowrap !important;
  }

  .dashboard-controls > :nth-child(5) {
    margin-left: auto !important;
  }
}

@media (min-width: 1367px) and (max-width: 1439px) {
  .dashboard-controls {
    flex-wrap: wrap;
  }

  .dashboard-controls > :nth-child(5),
  .dashboard-controls > :nth-child(6) {
    order: 2;
    margin-left: auto;
  }

  .dashboard-controls > :nth-child(1),
  .dashboard-controls > :nth-child(2),
  .dashboard-controls > :nth-child(3),
  .dashboard-controls > :nth-child(4) {
    order: 1;
  }
}

@media (min-width: 900px) and (max-width: 1366px) {
  .dashboard-controls {
    flex-wrap: wrap;
    row-gap: 0.5rem;
    padding-left: 24px;
    padding-right: 24px;
  }

  .dashboard-controls > :nth-child(1),
  .dashboard-controls > :nth-child(2),
  .dashboard-controls > :nth-child(3),
  .dashboard-controls > :nth-child(4) {
    order: 1;
    flex: 0 1 auto;
  }

  .dashboard-controls > :nth-child(5),
  .dashboard-controls > :nth-child(6) {
    order: 2;
    margin-left: 0 !important;
    align-self: flex-start;
    flex: 0 0 auto;
    margin-top: 4px;
  }

  .dashboard-controls > :nth-child(5) {
    max-width: 340px;
  }

  .dashboard-controls > :nth-child(6) {
    margin-left: 8px;
  }
}

@media (max-width: 899px) {
  .dashboard-controls {
    flex-direction: column;
    gap: 0.75rem;
  }

  .dashboard-controls > :not(:nth-child(1)) {
    display: none !important;
  }

  .dashboard-controls > :nth-child(1) {
    width: 100% !important;
    height: 48px !important;
  }
}

.date-range-wrapper { padding: 6px 12px; box-sizing: border-box; }
.select-wrapper { padding: 6px 12px; box-sizing: border-box; }
.date-display { max-width: 120px; }
.select-control { padding-right: 28px; }

:root {
  --page-horizontal-padding: 24px;
}

.dashboard-controls {
  padding-left: var(--page-horizontal-padding);
  padding-right: var(--page-horizontal-padding);
  box-sizing: border-box;
}

@media (min-width: 1440px) {
  .dashboard-controls { flex-wrap: nowrap !important; }

  .dashboard-controls > :nth-child(5) {
    margin-left: auto !important;
    padding-right: 8px;
  }

  .dashboard-controls > :nth-child(6) {
    margin-left: 8px !important;
    margin-right: 0 !important;
    flex: 0 0 auto;
  }

  .dashboard-controls {
    max-width: calc(100% - var(--page-horizontal-padding) * 2);
  }
}

</style>
