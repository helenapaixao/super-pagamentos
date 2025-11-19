<template>
  <div class="dashboard-controls">
    <NewChargeButton @click="emit('nova-cobranca')" />

    <div class="controls-divider"></div>

    <Select
      v-model="periodo"
      :icon-component="Calendar"
      :options="periodoOptions"
      placeholder="Período: Específico"
      width="200px"
      @change="handlePeriodoChange"
    />

    <DateRangePicker
      :inicio="dataInicio"
      :fim="dataFim"
      @change="handleDateChange"
    />

    <Select
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
import { CardTransfer, Calendar } from '@solar-icons/vue'

import DateRangePicker from './DateRangePicker.vue'
import DownloadButton from './DownloadButton.vue'
import NewChargeButton from './NewChargeButton.vue'
import Select from './Select.vue'

const periodo = ref('')
const dataInicio = ref('2020-06-10')
const dataFim = ref('2025-01-30')
const tipoCobranca = ref('')

const periodoOptions = [
  { value: 'hoje', label: 'Hoje' },
  { value: 'semana', label: 'Esta semana' },
  { value: 'mes', label: 'Este mês' },
  { value: 'ano', label: 'Este ano' }
]

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
  flex-wrap: nowrap;
  align-content: flex-start;
  min-width: 0;
  overflow-x: auto;
  overflow-y: visible;
  scrollbar-width: thin;
  scrollbar-color: #D1D5DB transparent;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
  margin-bottom: 22px;
}

.dashboard-controls::-webkit-scrollbar {
  height: 6px;
}

.dashboard-controls::-webkit-scrollbar-track {
  background: transparent;
}

.dashboard-controls::-webkit-scrollbar-thumb {
  background-color: #D1D5DB;
  border-radius: 3px;
}

.dashboard-controls::-webkit-scrollbar-thumb:hover {
  background-color: #9CA3AF;
}

.dashboard-controls > * {
  flex: 0 0 auto;
  min-width: fit-content;
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

.date-range-wrapper {
  flex: 0 0 auto;
  overflow: visible;
  white-space: nowrap;
  min-width: fit-content;
}

.select-wrapper {
  flex: 0 0 auto;
  overflow: visible;
  white-space: nowrap;
  min-width: fit-content;
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

@media (min-width: 1441px) {
  .dashboard-controls {
    flex-wrap: nowrap !important;
  }
}

@media (max-width: 1440px) and (min-width: 900px) {
  .dashboard-controls {
    flex-wrap: wrap !important;
    row-gap: 0.75rem;
  }

  .dashboard-controls > :nth-child(1) {
    order: 1;
  }

  .dashboard-controls > :nth-child(2) {
    order: 2;
  }

  .dashboard-controls > :nth-child(3) {
    order: 3;
  }

  .dashboard-controls > :nth-child(4) {
    order: 4;
  }

  .dashboard-controls > :nth-child(5) {
    order: 6;
    margin-left: 0 !important;
  }

  .dashboard-controls > :nth-child(6) {
    order: 7;
    margin-left: 0 !important;
  }

  .dashboard-controls > :nth-child(1)::after {
    content: '';
    width: 100%;
    order: 5;
  }
}

@media (max-width: 899px) {
  .dashboard-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding-left: 0;
    padding-right: 0;
    width: 100%;
    overflow-x: auto;
    overflow-y: visible;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .dashboard-controls::-webkit-scrollbar {
    display: none;
  }

  .dashboard-controls > :not(:nth-child(1)) {
    display: none !important;
  }

  .dashboard-controls > :nth-child(1) {
    width: 100% !important;
    height: auto !important;
    display: flex !important;
    justify-content: center;
    align-items: center;
  }

  .dashboard-controls :deep(.btn-primary) {
    margin: 24px auto !important;
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
