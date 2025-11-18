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
  border: 1px solid #D9D9D9;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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

.info-btn {
  background: none;
  border: none;
  color: #86898B;
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
  }
  
  .bandeira-logo {
    height: 20px;
  }
  
  .bandeira-logo img {
    max-height: 20px;
  }
}
</style>
