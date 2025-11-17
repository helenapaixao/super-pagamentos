<template>
  <div class="bandeiras-card">
    <div class="card-header">
      <h2 class="card-title">Bandeiras mais utilizadas</h2>
      <button class="info-btn" title="Informações">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </button>
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas" class="chart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  bandeiras: {
    type: Array,
    default: () => [
      { nome: 'VISA', valor: 450000 },
      { nome: 'ELO', valor: 320000 },
      { nome: 'Mastercard', valor: 280000 },
      { nome: 'Pix', valor: 12000 },
      { nome: 'Apple Pay', valor: 8000 },
      { nome: 'Google Pay', valor: 5000 }
    ]
  }
})

const chartCanvas = ref(null)

const drawChart = () => {
  if (!chartCanvas.value) return

  const canvas = chartCanvas.value
  const ctx = canvas.getContext('2d')
  const width = canvas.width = canvas.offsetWidth
  const height = canvas.height = canvas.offsetHeight

  ctx.clearRect(0, 0, width, height)

  const maxValue = Math.max(...props.bandeiras.map(b => b.valor))
  const barHeight = (height - 60) / props.bandeiras.length
  const chartWidth = width - 120

  props.bandeiras.forEach((bandeira, index) => {
    const barWidth = (bandeira.valor / maxValue) * chartWidth
    const y = index * barHeight + 30

    ctx.fillStyle = '#2563eb'
    ctx.fillRect(0, y, barWidth, barHeight - 10)

    ctx.fillStyle = '#374151'
    ctx.font = '14px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(bandeira.nome, 0, y + barHeight / 2 + 5)

    ctx.fillStyle = '#6b7280'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(formatCurrency(bandeira.valor), chartWidth + 100, y + barHeight / 2 + 5)
  })
}

const formatCurrency = (value) => {
  if (value < 1000) return value.toString()
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}

onMounted(() => {
  drawChart()
  window.addEventListener('resize', drawChart)
})

watch(() => props.bandeiras, () => {
  drawChart()
}, { deep: true })
</script>

<style scoped>
.bandeiras-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
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

.chart-container {
  width: 100%;
  height: 300px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>

