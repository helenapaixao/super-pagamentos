<template>
  <div class="transferencia-card">
    <div class="transferencia-body">
      <div class="icon-group">
        <div class="icon-circle">
          <ArrowUp :size="26" class="arrow-icon" />
        </div>
        <BadgeOrange class="badge-orange" />
      </div>

      <div class="transferencia-content">
        <h3 class="transferencia-title">Solicitação de transferência pendente</h3>
        <p class="transferencia-description">
          A transação no valor de R$ {{ formatCurrency(transferencia.valor) }} está aguardando a sua aprovação.
        </p>
      </div>
    </div>

    <button class="transferencia-action" type="button" @click="autorizarTransferencia">
      <span>Autorizar transferência</span>
      <img :src="walletMoneyBoldIcon" alt="Autorizar" class="transferencia-icon transferencia-icon-web" />
      <img :src="roundAltArrowDownIcon" alt="Autorizar" class="transferencia-icon transferencia-icon-mobile" />
    </button>
  </div>
</template>

<script setup>
import { ArrowUp } from '@solar-icons/vue'
import BadgeOrange from './BadgeOrange.vue'
import walletMoneyBoldIcon from '@/assets/icons/wallet-money-bold.svg'
import roundAltArrowDownIcon from '@/assets/icons/round-alt-arrow-down-linear.svg'

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
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  box-sizing: border-box;
  min-height: 105px;
}

.transferencia-body {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
}

.icon-group {
  position: relative;
  flex-shrink: 0;
}

.icon-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: #E7E0D5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  color: #111827;
}

.badge-orange {
  position: absolute;
  bottom: -4px;
  right: -6px;
}

.transferencia-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.transferencia-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: semibold;
  color: #2A2E33;
  margin: 0;
  line-height: 1.3;
}

.transferencia-description {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color:#86898B;
  margin: 0;
  line-height: 1.5;
}

.transferencia-action {
  border: none;
  background: #0641FC;
  color: #FFFFFF;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.transferencia-action :deep(svg),
.transferencia-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.transferencia-icon-mobile {
  display: none;
}

.transferencia-icon-web {
  display: block;
}

@media (max-width: 768px) {
  .transferencia-card {
    border-radius: 28px;
    flex-direction: column;
    align-items: stretch;
    padding: 1.25rem 1.75rem 0;
    max-width: 392px;
    width: 100%;
    margin: 0 auto 1.75rem;
    overflow: hidden;
  }

  .transferencia-body {
    padding-bottom: 1.25rem;
  }

  .icon-circle {
    width: 64px;
    height: 64px;
  }

  .transferencia-content {
    margin-top: 0.35rem;
    margin-bottom: 0.75rem;
  }

  .transferencia-title {
    font-size: 16px;
  }

  .transferencia-description {
    font-size: 12px;
  }

  .transferencia-action {
    width: calc(100% + 3.5rem);
    margin: 0 -1.75rem;
    border-radius: 0 0 28px 28px;
    justify-content: space-between;
    font-size: 17px;
    padding: 1.1rem 1.75rem;
  }

  .transferencia-icon-web {
    display: none;
  }

  .transferencia-icon-mobile {
    display: block;
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
    transform: rotate(-90deg);
  }
}
</style>
