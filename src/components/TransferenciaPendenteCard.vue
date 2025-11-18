<template>
  <div class="transferencia-card">
    <div class="icon-group">
      <div class="icon-circle">
        <ArrowUp :size="24" class="arrow-icon" />
      </div>
      <BadgeOrange />
    </div>
    
    <div class="transferencia-content">
      <h3 class="transferencia-title">Solicitação de transferência pendente</h3>
      <p class="transferencia-description">
        A transação no valor de R$ {{ formatCurrency(transferencia.valor) }} está aguardando a sua aprovação.
      </p>
    </div>
    
    <BaseButton
      text="Autorizar transferência"
      :icon="WalletMoney"
      :full-width="true"
      @click="autorizarTransferencia"
    />
  </div>
</template>

<script setup>
import { ArrowUp, WalletMoney } from '@solar-icons/vue'
import BaseButton from './BaseButton.vue'
import BadgeOrange from './BadgeOrange.vue'

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
  height: 105px;
}

.icon-group {
  position: relative;
  flex-shrink: 0;
}

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #E6E3DC;
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
  font-size: 12px;
  font-weight: 400;
  color: #86898B;
  margin: 0;
  line-height: 1.4;
}

.transferencia-description strong {
  color: #2A2E33;
  font-weight: 600;
}


@media (max-width: 768px) {
  .transferencia-card {
    flex-direction: column;
    align-items: stretch;
    border-radius: 28px;
    padding: 1.5rem 1.5rem 0;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
    height: auto;
    overflow: hidden;
  }

  .icon-group {
    align-self: flex-start;
  }

  .transferencia-content {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .transferencia-title {
    font-size: 18px;
  }

  .transferencia-description {
    font-size: 14px;
  }

  .transferencia-card :deep(.base-button) {
    border-radius: 0;
    border: none;
    padding: 1rem 1.75rem;
    justify-content: center;
    font-size: 16px;
  }

  .transferencia-card :deep(.base-button-primary) {
    background-color: #0641FC;
  }

}
</style>
