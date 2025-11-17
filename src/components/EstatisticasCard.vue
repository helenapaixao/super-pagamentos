<template>
  <div class="estatisticas-card">
    <div class="card-header">
      <h3 class="card-title">{{ titulo }}</h3>
      <div class="percent-icon">
        <span class="percent-symbol">%</span>
      </div>
    </div>
    <div class="estatistica-value">R$ {{ formatCurrency(valor) }}</div>
    <div class="divider"></div>
    <div class="estatistica-details">
      <span class="cobrancas">{{ cobrancas }} cobranças</span>
      <span class="percentual">{{ formatPercentual(percentual) }}%</span>
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
  }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatPercentual = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value)
}
</script>

<style scoped>
.estatisticas-card {
  background: white;
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0%;
  color: #2A2E33;
  margin: 0;
}

.percent-icon {
  width: 46px;
  height: 46px;
  border-radius: 250px;
  border: 1px solid #E5E7EB;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 6px;
  box-sizing: border-box;
}

.percent-symbol {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #2A2E33;
}

.estatistica-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #2A2E33;
  margin-bottom: 1rem;
  line-height: 1;
  flex-shrink: 0;
}

.divider {
  width: calc(100% + 3rem);
  height: 1px;
  background-color: #EEEEEE;
  margin-bottom: 1rem;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  border: none;
  flex-shrink: 0;
}

.estatistica-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-top: auto;
}

.cobrancas {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  line-height: 140%;
  letter-spacing: 0%;
  color: #2A2E33;
}

.percentual {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: right;
  color: #2A2E33;
}
</style>

