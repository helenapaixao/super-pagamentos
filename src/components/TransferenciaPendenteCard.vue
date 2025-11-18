<template>
  <div class="transferencia-card">
    <div class="icon-group">
      <div class="icon-circle">
        <AltArrowUp :size="20" class="arrow-icon" />
      </div>
      <div class="badge-orange">
        <span class="exclamation-icon">!</span>
      </div>
    </div>
    
    <div class="transferencia-content">
      <h3 class="transferencia-title">Solicitação de transferência pendente</h3>
      <p class="transferencia-description">
        A transação no valor de <strong>R$ {{ formatCurrency(transferencia.valor) }}</strong> está aguardando a sua aprovação.
      </p>
    </div>
    
    <button class="autorizar-btn" @click="autorizarTransferencia">
      <span class="btn-text">Autorizar transferência</span>
      <WalletMoney :size="20" class="wallet-icon" />
    </button>
  </div>
</template>

<script setup>
import { AltArrowUp, WalletMoney } from '@solar-icons/vue'

const props = defineProps({
  transferencia: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      valor: 29119.13
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
  border-radius: 250px;
  padding: 1rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.icon-group {
  position: relative;
  flex-shrink: 0;
}

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.arrow-icon {
  color: #111827;
}

.badge-orange {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #f59e0b;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.exclamation-icon {
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}

.transferencia-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.transferencia-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #2A2E33;
  margin: 0;
  line-height: 1.2;
}

.transferencia-description {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #86898B;
  margin: 0;
  line-height: 1.4;
}

.transferencia-description strong {
  color: #2A2E33;
  font-weight: 600;
}

.autorizar-btn {
  background-color: #0641FC;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 250px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}

.autorizar-btn:hover {
  background-color: #0530d4;
}

.btn-text {
  color: white;
}

.wallet-icon {
  color: white;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .transferencia-card {
    flex-direction: column;
    align-items: flex-start;
    border-radius: 12px;
    padding: 1.5rem;
  }

  .icon-group {
    align-self: flex-start;
  }

  .autorizar-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
