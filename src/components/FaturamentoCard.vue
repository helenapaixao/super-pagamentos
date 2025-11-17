<template>
  <div class="faturamento-card">
    <div class="card-header">
      <h2 class="card-title">Faturamento</h2>
      <button class="info-btn" title="Informações">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </button>
    </div>

    <div class="faturamento-value">
      R$ {{ formatCurrency(faturamento.total) }}
    </div>

    <div class="faturamento-growth">
      <span class="growth-indicator positive">↑ {{ faturamento.crescimento }}%</span>
      <span class="growth-text">Em crescimento</span>
    </div>

    <div class="chart-container">
      <canvas ref="chartCanvas" class="chart"></canvas>
    </div>

    <div class="faturamento-metrics">
      <div class="metric-item">
        <span class="metric-dot blue"></span>
        <div class="metric-content">
          <span class="metric-label">Faturamento recebido</span>
          <span class="metric-value">R$ {{ formatCurrency(faturamento.recebido) }}</span>
        </div>
      </div>
      <div class="metric-item">
        <span class="metric-dot purple"></span>
        <div class="metric-content">
          <span class="metric-label">Faturamento previsto D-2</span>
          <span class="metric-value">R$ {{ formatCurrency(faturamento.previsto) }}</span>
        </div>
      </div>
      <div class="metric-item">
        <span class="metric-dot orange"></span>
        <div class="metric-content">
          <span class="metric-label">Vendas pendentes</span>
          <span class="metric-value">R$ {{ formatCurrency(faturamento.pendentes) }}</span>
        </div>
      </div>
      <div class="metric-item">
        <span class="metric-dot purple"></span>
        <div class="metric-content">
          <span class="metric-label">Ticket médio</span>
          <span class="metric-value">R$ {{ formatCurrency(faturamento.ticketMedio) }}</span>
        </div>
      </div>
      <div class="metric-item">
        <span class="metric-dot black"></span>
        <div class="metric-content">
          <span class="metric-label">Número de cobranças</span>
          <span class="metric-value">{{ formatNumber(faturamento.numeroCobrancas) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  faturamento: {
    type: Object,
    required: true,
    default: () => ({
      total: 1060551.14,
      crescimento: 123.9,
      recebido: 245340.90,
      previsto: 815210.24,
      pendentes: 15332.18,
      ticketMedio: 192.30,
      numeroCobrancas: 12349,
      dadosGrafico: []
    })
  }
})

const chartCanvas = ref(null)

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatNumber = (value) => {
  return new Intl.NumberFormat('pt-BR').format(value)
}

const drawChart = () => {
  if (!chartCanvas.value) return

  const canvas = chartCanvas.value
  const ctx = canvas.getContext('2d')
  const containerWidth = canvas.offsetWidth
  const containerHeight = canvas.offsetHeight
  const width = canvas.width = containerWidth
  const height = canvas.height = containerHeight

  ctx.clearRect(0, 0, width, height)

  const dadosEspecificos = [
    5000,  
    8000,   
    12000,  
    15000,  
    85000,  
    95000,  
    105000, 
    88000,  
    3000,   
    2000,   
    4000,   
    2500,   
    3500,   
    2800,   
    92000,  
    3500,   
    15000,  
    2000,   
    18000,  
    22000,  
    25000,  
    3000,  
    1500,   
    12000,  
    102000, 
    4000,   
    2500,   
    18000  
  ]

  const dados = props.faturamento.dadosGrafico || dadosEspecificos
  const maxValue = 200000 
  const paddingLeft = 50 
  const paddingRight = 20
  const paddingTop = 10
  const paddingBottom = 50 
  const chartWidth = width - paddingLeft - paddingRight
  const chartHeight = height - paddingTop - paddingBottom
  const barWidth = chartWidth / 31

  ctx.strokeStyle = '#f3f4f6'
  ctx.lineWidth = 1
  const yLabels = [0, 50000, 100000, 200000]
  yLabels.forEach(label => {
    const yPos = paddingTop + chartHeight - (label / maxValue) * chartHeight
    ctx.beginPath()
    ctx.moveTo(paddingLeft, yPos)
    ctx.lineTo(width - paddingRight, yPos)
    ctx.stroke()
  })

  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1.5
  const xAxisY = paddingTop + chartHeight
  ctx.beginPath()
  ctx.moveTo(paddingLeft, xAxisY)
  ctx.lineTo(width - paddingRight, xAxisY)
  ctx.stroke()

  dados.forEach((valor, index) => {
    const barHeight = (valor / maxValue) * chartHeight
    const x = paddingLeft + (index * barWidth)
    const y = paddingTop + chartHeight - barHeight

    ctx.fillStyle = valor > 70000 ? '#10b981' : '#2563eb'
    
    const barSpacing = 1.5
    ctx.fillRect(x + barSpacing, y, barWidth - (barSpacing * 2), barHeight)
  })

  ctx.fillStyle = '#6b7280'
  ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.textAlign = 'right'
  yLabels.forEach(label => {
    const yPos = paddingTop + chartHeight - (label / maxValue) * chartHeight
    let labelText = '0'
    if (label === 50000) labelText = '50K'
    else if (label === 100000) labelText = '100K'
    else if (label === 200000) labelText = '200K'
    ctx.fillText(labelText, paddingLeft - 10, yPos + 4)
  })

  ctx.textAlign = 'center'
  ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.fillStyle = '#6b7280'
  for (let i = 0; i < 31; i++) {
    const xPos = paddingLeft + (i * barWidth) + barWidth / 2
    const yPos = paddingTop + chartHeight + 20
    ctx.fillText((i + 1).toString(), xPos, yPos)
  }
}

onMounted(() => {
  drawChart()
  window.addEventListener('resize', drawChart)
})

watch(() => props.faturamento, () => {
  drawChart()
}, { deep: true })
</script>

<style scoped>
.faturamento-card {
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
  margin-bottom: 1.5rem;
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

.faturamento-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.faturamento-growth {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.growth-indicator {
  font-weight: 600;
  font-size: 0.9rem;
}

.growth-indicator.positive {
  color: #10b981;
}

.growth-text {
  color: #6b7280;
  font-size: 0.9rem;
}

.chart-container {
  width: 100%;
  height: 250px;
  margin-bottom: 2rem;
  position: relative;
}

.chart {
  width: 100%;
  height: 100%;
}

.faturamento-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.metric-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.metric-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.metric-dot.blue {
  background-color: #2563eb;
}

.metric-dot.purple {
  background-color: #8b5cf6;
}

.metric-dot.orange {
  background-color: #f59e0b;
}

.metric-dot.black {
  background-color: #111827;
}

.metric-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-label {
  font-size: 0.85rem;
  color: #6b7280;
}

.metric-value {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

@media (max-width: 768px) {
  .faturamento-card {
    padding: 1.5rem;
  }

  .faturamento-value {
    font-size: 2rem;
  }

  .faturamento-metrics {
    grid-template-columns: 1fr;
  }
}
</style>

