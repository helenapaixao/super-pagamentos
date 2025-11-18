<template>
  <div class="chart-container" :style="{ height: `${props.height}px` }">
    <canvas ref="chartCanvas" class="chart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  maxValue: {
    type: Number,
    default: 200000
  },
  height: {
    type: Number,
    default: 172
  }
})

const chartCanvas = ref(null)

const defaultData = [
  5000, 8000, 12000, 15000, 85000, 95000, 105000, 88000, 3000, 2000,
  4000, 2500, 3500, 2800, 92000, 3500, 15000, 2000, 18000, 22000,
  25000, 3000, 1500, 12000, 102000, 4000, 2500, 18000
]

const drawChart = () => {
  if (!chartCanvas.value) return

  const canvas = chartCanvas.value
  const ctx = canvas.getContext('2d')
  const containerWidth = canvas.offsetWidth
  const containerHeight = canvas.offsetHeight
  
  if (containerWidth === 0 || containerHeight === 0) {
    return
  }
  
  const width = canvas.width = containerWidth
  const height = canvas.height = containerHeight

  ctx.clearRect(0, 0, width, height)

  const dados = (props.data && props.data.length > 0) ? props.data : defaultData
  
  const finalData = dados.length >= 31 ? dados.slice(0, 31) : [
    ...dados,
    ...Array(31 - dados.length).fill(0)
  ]
  const maxValue = props.maxValue
  const paddingLeft = 39
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
  finalData.forEach((valor, index) => {
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

  ctx.fillStyle = '#86898B'
  ctx.font = '12px "Plus Jakarta Sans", sans-serif'
  ctx.textAlign = 'right'
  yLabels.forEach(label => {
    const yPos = paddingTop + chartHeight - (label / maxValue) * chartHeight
    let labelText = '0'
    if (label === 50000) labelText = '50K'
    else if (label === 100000) labelText = '100K'
    else if (label === 200000) labelText = '200K'
    ctx.fillText(labelText, paddingLeft - 8, yPos + 4)
  })

  ctx.textAlign = 'center'
  ctx.font = '12px "Plus Jakarta Sans", sans-serif'
  ctx.fillStyle = '#6b7280'
  for (let i = 0; i < 31; i++) {
    const xPos = paddingLeft + (i * barWidth) + barWidth / 2
    const yPos = paddingTop + chartHeight + 20
    ctx.fillText((i + 1).toString(), xPos, yPos)
  }
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      drawChart()
    }, 100)
    window.addEventListener('resize', () => {
      setTimeout(() => {
        drawChart()
      }, 50)
    })
  })
})

watch(() => props.data, () => {
  nextTick(() => {
    drawChart()
  })
}, { deep: true })

watch(() => props.maxValue, () => {
  nextTick(() => {
    drawChart()
  })
})

watch(() => props.height, () => {
  nextTick(() => {
    drawChart()
  })
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  margin-bottom: 0;
  position: relative;
  min-height: 172px;
}

.chart {
  width: 100%;
  height: 100%;
  display: block;
}
</style>

