<template>
  <div class="faturamento-card">
    <div class="card-header">
      <h2 class="card-title">Faturamento</h2>
      <div class="title-icon">
        <Eye :size="16" class="eye-icon" />
      </div>
    </div>

    <div class="value-row">
      <span class="currency-label">R$</span>
      <span class="faturamento-value">{{ formatCurrency(faturamento.total) }}</span>
      <div class="growth-group">
        <span class="growth-indicator positive">↑ {{ faturamento.crescimento }}%</span>
        <span class="growth-text">Em crescimento</span>
      </div>
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
          <span class="metric-label">Faturamento previsto</span>
          <span class="metric-value">D+2 R$ {{ formatCurrency(faturamento.previsto) }}</span>
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
import { Eye } from '@solar-icons/vue'

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

  const dados =
    props.faturamento.dadosGrafico && props.faturamento.dadosGrafico.length
      ? props.faturamento.dadosGrafico
      : dadosEspecificos
  const maxValue = 200000 
  const paddingLeft = 50 
  const paddingRight = 20
  const paddingTop = 10
  const paddingBottom = 50 
  const chartWidth = width - paddingLeft - paddingRight
  const chartHeight = height - paddingTop - paddingBottom
  const barWidth = chartWidth / 31
  const barStrokeWidth = 8

  const columnWidth = barWidth
  ctx.save()
  ctx.globalAlpha = 0.35
  ctx.fillStyle = '#F5F5F5'
  for (let i = 0; i < 31; i++) {
    const xPos = paddingLeft + i * columnWidth
    ctx.fillRect(
      xPos + columnWidth * 0.2,
      paddingTop,
      columnWidth * 0.6,
      chartHeight
    )
  }
  ctx.restore()

  ctx.strokeStyle = '#E5E7EB'
  ctx.lineWidth = 1
  const yLabels = [0, 50000, 100000, 200000]
  yLabels.forEach(label => {
    const yPos = paddingTop + chartHeight - (label / maxValue) * chartHeight
    ctx.beginPath()
    ctx.moveTo(paddingLeft, yPos)
    ctx.lineTo(width - paddingRight, yPos)
    ctx.stroke()
  })

  ctx.strokeStyle = '#E5E7EB'
  ctx.lineWidth = 1.5
  const xAxisY = paddingTop + chartHeight
  ctx.beginPath()
  ctx.moveTo(paddingLeft, xAxisY)
  ctx.lineTo(width - paddingRight, xAxisY)
  ctx.stroke()

  ctx.lineCap = 'round'
  dados.forEach((valor, index) => {
    const barHeight = (valor / maxValue) * chartHeight
    const x = paddingLeft + index * barWidth
    const y = paddingTop + chartHeight - barHeight

    const strokeWidth = barStrokeWidth
    const barSpacing = Math.max((barWidth - strokeWidth) / 2, 0)
    const centerX = x + barWidth / 2

    if (strokeWidth <= 0) return

    if (valor > 70000) {
      const gradient = ctx.createLinearGradient(
        centerX,
        y,
        centerX,
        paddingTop + chartHeight
      )
      gradient.addColorStop(0, '#22C55E')
      gradient.addColorStop(1, '#0641FC')
      ctx.strokeStyle = gradient
    } else {
      ctx.strokeStyle = '#0641FC'
    }

    ctx.lineWidth = strokeWidth
    ctx.beginPath()
    ctx.moveTo(centerX, paddingTop + chartHeight)
    ctx.lineTo(centerX, y)
    ctx.stroke()
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
  width: 100%;
  border-radius: 20px;
  padding: 2rem 2.5rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0%;
  color: #2A2E33;
  margin: 0;
}

.title-icon {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 1px solid #D1D5DB;
  background-color: #F9FAFB;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.eye-icon {
  color: #9CA3AF;
}

.value-row {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.currency-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #86898B;
}

.faturamento-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #0641FC;
  line-height: 1;
}

.growth-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1.5rem;
}

.growth-indicator {
  font-weight: 600;
  font-size: 0.9rem;
}

.growth-indicator.positive {
   font-family: 'Plus Jakarta Sans', sans-serif;
  color: #10b981;
  font-weight: 600;
}

.growth-text {
  color: #86898B;
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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.metric-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 14px;
  border: 1px solid #E5E7EB;
  background-color: #FFFFFF;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
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
  white-space: nowrap;
}

.metric-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
  color: #6b7280;
}

.metric-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
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

