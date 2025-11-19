<template>
  <div class="dashboard-controls">
    <button class="btn-primary" @click="emit('nova-cobranca')">
      <span class="btn-text">Nova cobrança</span>
      <div class="icon-circle">
        <AddCircle :size="18" class="icon-add-circle icon-web" />
        <AddCircle :size="15" class="icon-add-circle icon-mobile" />
      </div>
    </button>

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
import { CardTransfer, AddCircle } from '@solar-icons/vue'
import DateRangePicker from './DateRangePicker.vue'
import PeriodSelect from './PeriodSelect.vue'
import SelectWrapper from './SelectWrapper.vue'
import DownloadButton from './DownloadButton.vue'

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

.btn-primary {
  background-color: #0641FC;
  color: white;
  border: none;
  padding: 12px 23px;
  border-radius: 250px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: auto;
  letter-spacing: 0%;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: background-color 0.2s;
  position: relative;
  overflow: visible;
  z-index: 0;
}

.btn-primary::before {
  content: '';
  display: none;
}

.btn-text {
  color: #F9F9F9;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: auto;
  letter-spacing: 0%;
}

.icon-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #D1DCFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.icon-circle::before {
  display: none;
}

.icon-circle :deep(svg) {
  color: #0641FC;
  position: relative;
  z-index: 1;
}

.icon-add-circle {
  width: 18px;
  height: 18px;
}

.icon-web {
  display: block;
}

.icon-mobile {
  display: none;
}

.btn-primary:hover {
  background-color: #1f2327;
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

  .btn-primary {
    width: 100%;
    max-width: 390px;
    height: 52px;
    justify-content: space-between;
    padding: 12px 23px;
    border-radius: 250px;
    box-shadow: 
      0px 4px 10.3px 0px #852DF691 inset,
      0px -19px 36.6px 0px #0641FC59 inset;
    background: #2A2E33;
    border: 3px solid #2A2E3324;
    color: white;
    letter-spacing: 0%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: flex;
    opacity: 1;
  }

  .btn-primary::before {
    display: none;
  }

  .btn-primary::after {
    display: none;
  }

  .btn-text {
    font-size: 18px;
    color: white;
    position: relative;
    z-index: 2;
  }

  .icon-circle {
    width: 34px;
    height: 34px;
    background: linear-gradient(180deg, #f9fbff 0%, #dae3ff 100%);
    box-shadow: 0 10px 20px rgba(5, 21, 47, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.4);
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-web {
    display: none;
  }

  .icon-mobile {
    display: block;
    width: 15px;
    height: 15px;
    position: relative;
    z-index: 3;
    color: white;
  }
  
  .icon-circle .icon-mobile :deep(svg) {
    width: 100%;
    height: 100%;
    color: white;
  }
}
</style>

