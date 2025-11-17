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
              stroke="#e5e7eb"
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
              :stroke-dasharray="`${modalidade.percentual * 3.14159} ${(100 - modalidade.percentual) * 3.14159}`"
              stroke-dashoffset="78.54"
              transform="rotate(-90 60 60)"
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
      { nome: 'Boleto', percentual: 42, cor: 'orange' },
      { nome: 'Pix', percentual: 98, cor: 'blue' }
    ]
  }
})

const getCor = (cor) => {
  const cores = {
    blue: '#2563eb',
    purple: '#8b5cf6',
    orange: '#f59e0b'
  }
  return cores[cor] || '#2563eb'
}
</script>

<style scoped>
.conversao-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2rem;
}

.conversao-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.modalidade-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.modalidade-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
}

@media (max-width: 768px) {
  .conversao-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}
</style>

