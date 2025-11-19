<template>
  <div class="header-wrapper">
    <!-- Desktop Header -->
    <nav class="header-nav desktop-header">
      <div class="header-brand">
        <img :src="superLogo" alt="Super" class="brand-logo" />
        <div class="brand-text-group">
          <span class="brand-text">Super central de gestão</span>
          <img :src="chartIcon" alt="Chart" class="chart-icon" />
        </div>
      </div>
      <div class="header-right">
        <div class="header-icons">
          <button class="icon-btn" title="Calculadora">
            <CalculatorMinimalistic :size="20" />
          </button>
          <button class="icon-btn" title="Configurações">
            <Settings :size="20" />
          </button>
          <button class="icon-btn" title="Notificações">
            <BellBing :size="20" />
          </button>
        </div>
        <div class="user-profile">
          <div class="user-avatar">AP</div>
          <div class="user-info">
            <span class="user-name-top">Empresarial</span>
            <span class="user-name-bottom">Astra Pagamentos</span>
          </div>
          <button class="dropdown-btn">
            <img :src="roundAltArrowDownIcon" alt="" class="dropdown-icon" width="24" height="24" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Header -->
    <div class="mobile-header">
      <div class="mobile-status-bar">
        <span class="mobile-time">{{ currentTime }}</span>
        <div class="mobile-status-icons">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L8.5 8.5L16 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 0C5.5 0 3.5 1 2 2.5L0.5 1C2.5 -0.5 5 -1 7.5 -1C10 -1 12.5 -0.5 14.5 1L13 2.5C11.5 1 9.5 0 7.5 0Z" fill="white"/>
            <path d="M7.5 3C6 3 4.5 3.5 3.5 4.5L2 3C3.5 1.5 5.5 1 7.5 1C9.5 1 11.5 1.5 13 3L11.5 4.5C10.5 3.5 9 3 7.5 3Z" fill="white"/>
            <path d="M7.5 6C6.5 6 5.5 6.5 5 7L3.5 5.5C4.5 4 6 3.5 7.5 3.5C9 3.5 10.5 4 11.5 5.5L10 7C9.5 6.5 8.5 6 7.5 6Z" fill="white"/>
            <rect x="6" y="8" width="3" height="3" fill="white"/>
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="10" rx="2" stroke="white" stroke-width="1.5"/>
            <rect x="3" y="3" width="18" height="6" fill="white"/>
          </svg>
        </div>
      </div>

      <!-- Mobile Card -->
      <div class="mobile-card">
        <div class="mobile-card-top">
          <div class="mobile-profile-pill">
            <img :src="superProfileIcon" alt="Super" class="mobile-profile-icon" />
            <div class="mobile-profile-info">
              <span class="mobile-profile-top">Empresarial</span>
              <span class="mobile-profile-bottom">Astra Pagamentos</span>
            </div>
            <img :src="roundAltArrowDownIcon" alt="" class="mobile-profile-arrow" width="24" height="24" />
          </div>
          <button class="mobile-bell-btn">
            <BellBing :size="20" class="mobile-bell-icon" />
          </button>
        </div>

        <div class="mobile-faturamento-section">
          <h2 class="mobile-faturamento-title">Faturamento</h2>
          <div class="mobile-faturamento-value-row">
            <span class="mobile-faturamento-value">
              <span class="mobile-faturamento-currency">R$</span> {{ formatCurrency(faturamento?.total || 0) }}
            </span>
            <img :src="eyeDashboardIcon" alt="Visibilidade" class="mobile-eye-icon" />
          </div>
        </div>
      </div>

      <div class="mobile-divider"></div>

      <div class="mobile-card">
        <a href="#" class="mobile-wallet-link">
          <span>Ir para a carteira</span>
          <img :src="roundAltArrowDownIcon" alt="" class="mobile-wallet-arrow" width="24" height="24" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { CalculatorMinimalistic, Settings, BellBing } from '@solar-icons/vue'
import superLogo from '@/assets/icons/super-logo.svg'
import chartIcon from '@/assets/icons/chart-icon.svg'
import roundAltArrowDownIcon from '@/assets/icons/round-alt-arrow-down-linear.svg'
import eyeDashboardIcon from '@/assets/icons/eye-icon.svg'
import superProfileIcon from '@/assets/icons/super-profile-icon.svg'

const props = defineProps({
  faturamento: {
    type: Object,
    default: () => ({ total: 0 })
  }
})

const currentTime = ref('')
let timeInterval = null

const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
}

.header-nav {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  border-bottom: 1px solid #EEEEEE;
}

.desktop-header {
  display: flex;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 185.5px;
}

.brand-logo {
  height: 30px;
  width: auto;
}

.brand-text-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0%;
  color: black;
}

.chart-icon {
  height: 23px;
  width: 15px;
}

.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

.header-icons {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-profile:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: #0641FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
  color: white;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-name-top {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #11151B;
}

.user-name-bottom {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #86898B;
}

.dropdown-btn {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
}

.dropdown-icon {
  display: block;
  flex-shrink: 0;
}

.mobile-header {
  display: none;
}

@media (max-width: 768px) {
  .desktop-header {
    display: none;
  }

  .mobile-header {
    display: block;
    background: transparent;
    width: 100%;
    min-height: auto;  margin-bottom: -12px !important;
  }

  .header-wrapper {
    background: #0641FC;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    overflow: hidden;
  }

  .mobile-status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background: transparent;
  }

  .mobile-time {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: white;
  }

  .mobile-status-icons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .mobile-card {
    padding: 1rem;
    background: transparent;
  }

  .mobile-header .mobile-card:last-child {
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
    background: #0641FC;
  }

  .mobile-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .mobile-profile-pill {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: white;
    border-radius: 250px;
    padding: 0.5rem 0.75rem;
    width: 207px;
    height: 54px;
    flex-shrink: 0;
  }

  .mobile-profile-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    display: block;
  }

  .mobile-profile-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .mobile-profile-top {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #11151B;
    line-height: 100%;
  }

  .mobile-profile-bottom {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #86898B;
    line-height: 100%;
    white-space: nowrap;
  }

  .mobile-profile-arrow {
    flex-shrink: 0;
    filter: brightness(0);
  }

  .mobile-bell-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .mobile-bell-icon {
    color: white;
  }

  .mobile-faturamento-section {
    margin-bottom: 1rem;
  }

  .mobile-divider {
    width: 100%;
    height: 1px;
    background: #1E54FF;
    margin: 0;
    flex-shrink: 0;
  }

  .mobile-faturamento-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: white;
    margin: 0 0 0.75rem 0;
  }

  .mobile-faturamento-value-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .mobile-faturamento-value {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 40px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 100%;
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }

  .mobile-faturamento-currency {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #D1DCFF;
    line-height: 1;
    letter-spacing: 0%;
  }

  .mobile-eye-icon {
    width: 32px;
    height: 33px;
    flex-shrink: 0;
  }

  .mobile-wallet-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    text-decoration: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    height: 44.5px;
    padding: 0;
  }

  .mobile-wallet-link svg,
  .mobile-wallet-arrow {
    flex-shrink: 0;
    filter: brightness(0) invert(1);
    transform: rotate(-90deg);
  }
}
</style>

