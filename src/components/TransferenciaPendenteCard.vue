<template>
  <div class="transferencia-card">
    <div class="transferencia-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    </div>
    <div class="transferencia-content">
      <p class="transferencia-text">
        A transação no valor de <strong>R$ {{ formatCurrency(transferencia.valor) }}</strong> está aguardando a sua aprovação.
      </p>
      <button class="autorizar-btn" @click="autorizarTransferencia">
        Autorizar transferência
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  transferencia: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      valor: 29119.15
    })
  }
})

const emit = defineEmits(['autorizar'])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const autorizarTransferencia = () => {
  emit('autorizar', props.transferencia.id)
}
</script>

<style scoped>
.transferencia-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  border-left: 4px solid #2563eb;
}

.transferencia-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #eff6ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.transferencia-content {
  flex: 1;
}

.transferencia-text {
  color: #374151;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.transferencia-text strong {
  color: #111827;
  font-weight: 600;
}

.autorizar-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.autorizar-btn:hover {
  background-color: #1d4ed8;
}

@media (max-width: 768px) {
  .transferencia-card {
    flex-direction: column;
  }

  .transferencia-icon {
    align-self: flex-start;
  }
}
</style>

