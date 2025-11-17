<template>
  <div class="estatisticas-card">
    <div class="card-header">
      <h3 class="card-title">{{ titulo }}</h3>
      <button v-if="showInfo" class="info-btn" title="Informações">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </button>
    </div>
    <div class="estatistica-value">R$ {{ formatCurrency(valor) }}</div>
    <div class="estatistica-details">
      <span class="cobrancas">{{ cobrancas }} cobranças</span>
      <span class="percentual">{{ percentual }}%</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  cobrancas: {
    type: Number,
    required: true
  },
  percentual: {
    type: Number,
    required: true
  },
  showInfo: {
    type: Boolean,
    default: false
  }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}
</script>

<style scoped>
.estatisticas-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
}

.info-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: color 0.2s;
}

.info-btn:hover {
  color: #2563eb;
}

.estatistica-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.estatistica-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #6b7280;
}

.percentual {
  font-weight: 600;
}
</style>

