<template>
  <div class="conversao-card">
    <h2 class="card-title">Conversão por modalidade</h2>
    <div class="conversao-grid">
      <div v-for="modalidade in modalidades" :key="modalidade.nome" class="modalidade-item">
        <div class="donut-chart-container">
          <svg class="donut-chart" :width="120" :height="120">
            <circle
              class="donut-ring"
              cx="60"
              cy="60"
              r="50"
              fill="transparent"
              stroke="#F5F5F5"
              stroke-width="12"
            />
            <circle
              class="donut-segment"
              :class="modalidade.cor"
              cx="60"
              cy="60"
              r="50"
              fill="transparent"
              :stroke="getCor(modalidade.cor)"
              stroke-width="12"
              :stroke-dasharray="`${(modalidade.percentual / 100) * 314.159} ${((100 - modalidade.percentual) / 100) * 314.159}`"
              stroke-dashoffset="78.54"
              transform="rotate(-90 60 60)"
              stroke-linecap="round"
            />
          </svg>
          <div class="donut-label">
            <span class="donut-percent">{{ modalidade.percentual }}%</span>
          </div>
        </div>
        <div class="modalidade-name">{{ modalidade.nome }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modalidades: {
    type: Array,
    default: () => [
      { nome: 'Crédito', percentual: 92, cor: 'blue' },
      { nome: 'Débito', percentual: 95, cor: 'purple' },
      { nome: 'Boleto', percentual: 42, cor: 'purpleLight' },
      { nome: 'Pix', percentual: 98, cor: 'blueLight' }
    ]
  }
})

const getCor = (cor) => {
  const cores = {
    blue: '#0641FC',
    purple: '#8b5cf6',
    purpleLight: '#A78BFA',
    blueLight: '#9DB5FF'
  }
  return cores[cor] || '#0641FC'
}
</script>

<style scoped>
.conversao-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #D9D9D9;
  padding: 2rem;
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #2A2E33;
  margin-bottom: 1rem;
}

.conversao-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.modalidade-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 120px;
}

.donut-chart-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-chart {
  transform: rotate(-90deg);
}

.donut-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.donut-percent {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: regular;
  color: #2A2E33;
  line-height: 1;
}

.modalidade-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #2A2E33;
  text-align: center;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .conversao-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}
</style>

