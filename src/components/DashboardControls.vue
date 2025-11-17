<template>
  <div class="dashboard-controls">
    <button class="btn-primary" @click="emit('nova-cobranca')">
      <span class="btn-text">Nova cobrança</span>
      <div class="icon-circle">
        <AddCircle :size="15" />
      </div>
    </button>

    <div class="controls-group">
      <div class="select-wrapper">
        <Calendar :size="20" class="select-icon" />
        <select v-model="periodo" class="select-control" @change="emit('periodo-change', periodo)">
          <option value="especifico">Período: Específico</option>
          <option value="hoje">Hoje</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mês</option>
          <option value="ano">Este ano</option>
        </select>
        <AltArrowDown :size="16" class="select-chevron" />
      </div>

      <div class="date-range-wrapper">
        <div class="date-field date-field-start">
          <Calendar :size="20" class="date-icon" />
          <span class="date-display">{{ formatDate(dataInicio) }}</span>
          <AltArrowDown :size="16" class="date-chevron" />
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
          <AltArrowDown :size="16" class="date-chevron" />
          <input
            type="date"
            v-model="dataFim"
            class="date-range-input"
            @change="formatDateAndEmit"
          />
        </div>
      </div>

      <div class="select-wrapper">
        <CardTransfer :size="20" class="select-icon" />
        <select v-model="tipoCobranca" class="select-control" @change="emit('tipo-change', tipoCobranca)">
          <option value="">Tipo de cobrança</option>
          <option value="credito">Crédito</option>
          <option value="debito">Débito</option>
          <option value="boleto">Boleto</option>
          <option value="pix">Pix</option>
        </select>
        <AltArrowDown :size="16" class="select-chevron" />
      </div>

      <button class="download-btn" title="Download">
        <DownloadMinimalistic :size="20" class="download-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AddCircle, Calendar, AltArrowDown, CardTransfer, DownloadMinimalistic } from '@solar-icons/vue'

const periodo = ref('especifico')
const dataInicio = ref('2020-06-10')
const dataFim = ref('2025-01-30')
const tipoCobranca = ref('')

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const emit = defineEmits(['nova-cobranca', 'periodo-change', 'data-change', 'tipo-change'])

const formatDateAndEmit = () => {
  emit('data-change', { inicio: dataInicio.value, fim: dataFim.value })
}
</script>

<style scoped>
.dashboard-controls {
  display: flex;
  justify-content: space-between;
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
}

.btn-text {
  color: #FFFFFF;
}

.icon-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.icon-circle::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    rgba(209, 220, 255, 0.3),
    rgba(209, 220, 255, 0.3) 0.5px,
    transparent 0.5px,
    transparent 1px
  );
  background-size: 2px 2px;
}

.icon-circle :deep(svg) {
  color: #0641FC;
  position: relative;
  z-index: 1;
}

.btn-primary:hover {
  background-color: #0530C7;
}

.controls-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
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

.download-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.download-btn:hover {
  border-color: #2563eb;
  background-color: #f3f4f6;
}

.download-icon {
  color: #2A2E33;
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

.date-range-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 250px;
  background-color: white;
  transition: border-color 0.2s;
  min-width: 0;
}

.date-range-wrapper:hover {
  border-color: #2563eb;
}

.date-field {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.date-field-start {
  padding-right: 0.75rem;
}

.date-field-end {
  padding-left: 0.75rem;
}

.date-field-start,
.date-field-end {
  gap: 0.5rem;
}

.date-icon {
  color: #2A2E33;
  flex-shrink: 0;
}

.date-range-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
  border: none;
  background: transparent;
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
}

.date-chevron {
  color: #2A2E33;
  flex-shrink: 0;
  pointer-events: none;
}

.date-divider {
  width: 1px;
  height: 20px;
  background-color: #d1d5db;
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
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .controls-group {
    width: 100%;
    flex-direction: column;
  }

  .select-control,
  .date-input {
    width: 100%;
  }
}
</style>

