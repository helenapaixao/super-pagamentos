<template>
  <div class="bandeiras-card">
    <div class="card-header">
      <div class="title-group">
        <h2 class="card-title">Bandeiras mais utilizadas</h2>
        <InfoCircle :size="20" class="info-icon" />
      </div>
    </div>
    <div class="bandeiras-grid">
      <div v-for="bandeira in bandeiras" :key="bandeira.nome" class="bandeira-item">
        <div class="bar-container">
          <div class="bar-track">
            <div 
              class="bar-fill" 
              :style="{ height: `${(bandeira.percentual || 0)}%` }"
            ></div>
          </div>
        </div>
        <div class="bandeira-logo">
          <img :src="getLogo(bandeira.nome)" :alt="bandeira.nome" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InfoCircle } from '@solar-icons/vue'
import visaIcon from '@/assets/icons/bandeiras/visa.svg'
import mastercardIcon from '@/assets/icons/bandeiras/mastercard.svg'
import eloIcon from '@/assets/icons/bandeiras/elo.svg'
import hipercardIcon from '@/assets/icons/bandeiras/hipercard.svg'
import amexIcon from '@/assets/icons/bandeiras/amex.svg'
import gpayIcon from '@/assets/icons/bandeiras/gpay.svg'
import samsungPayIcon from '@/assets/icons/bandeiras/samsung-pay.svg'
import applePayIcon from '@/assets/icons/bandeiras/apple-pay.svg'
import hiperIcon from '@/assets/icons/bandeiras/hiper.svg'

const props = defineProps({
  bandeiras: {
    type: Array,
    default: () => [
      { nome: 'VISA', percentual: 70 },
      { nome: 'Mastercard', percentual: 65 },
      { nome: 'ELO', percentual: 55 },
      { nome: 'Hipercard', percentual: 25 },
      { nome: 'AM EX', percentual: 15 },
      { nome: 'G Pay', percentual: 15 },
      { nome: 'Samsung Pay', percentual: 65 },
      { nome: 'Apple Pay', percentual: 70 },
      { nome: 'Hiper', percentual: 8 }
    ]
  }
})

const getLogo = (nome) => {
  const logos = {
    'VISA': visaIcon,
    'Mastercard': mastercardIcon,
    'ELO': eloIcon,
    'Hipercard': hipercardIcon,
    'AM EX': amexIcon,
    'American Express': amexIcon,
    'G Pay': gpayIcon,
    'Google Pay': gpayIcon,
    'Samsung Pay': samsungPayIcon,
    'Apple Pay': applePayIcon,
    'Hiper': hiperIcon
  }
  return logos[nome] || visaIcon
}
</script>

<style scoped>
.bandeiras-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: semibold;
  color: #2A2E33;
  margin: 0;
  line-height: 100%;
  letter-spacing: 0%;
}

.info-icon {
  color: #2A2E33;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-btn {
  background: none;
  border: none;
  color: #2A2E33;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: color 0.2s;
  width: 16px;
  height: 16px;
}

.info-btn:hover {
  color: #2A2E33;
}

.bandeiras-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.5rem;
  height: 200px;
  border: 1px solid #EEEEEE;
  border-radius: 12px;
  padding: 1.5rem;
  box-sizing: border-box;
}

.bandeira-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
  max-width: calc((100% - 4rem) / 9);
}

.bar-container {
  width: 100%;
  height: 99px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar-track {
  width: 8px;
  height: 99px;
  background-color: #F5F5F5;
  border-radius: 250px;
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  flex-shrink: 0;
}

.bar-fill {
  width: 100%;
  background-color: #0641FC;
  border-radius: 250px;
  transition: height 0.3s ease;
  min-height: 2px;
  align-self: flex-end;
}

.bandeira-logo {
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bandeira-logo img {
  height: 24px;
  width: auto;
  object-fit: contain;
}

@media (max-width: 768px) {
  .bandeiras-grid {
    gap: 0.5rem;
    border: 1px solid #EEEEEE;
    border-radius: 12px;
    padding: 1.5rem;
  }
  
  .bandeira-logo {
    height: 20px;
  }
  
  .bandeira-logo img {
    max-height: 20px;
  }
}
</style>
