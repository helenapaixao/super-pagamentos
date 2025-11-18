<template>
  <div class="header-wrapper">
    <nav class="header-nav">
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
            <img :src="roundAltArrowDownIcon" alt="" class="dropdown-icon" width="16" height="16" />
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { CalculatorMinimalistic, Settings, BellBing } from '@solar-icons/vue'
import superLogo from '@/assets/icons/super-logo.svg'
import chartIcon from '@/assets/icons/chart-icon.svg'
import roundAltArrowDownIcon from '@/assets/icons/round-alt-arrow-down-linear.svg'
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
  gap: 0.75rem;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

@media (max-width: 768px) {
  .header-nav {
    padding: 1rem;
  }

  .header-brand {
    display: none;
  }

  .user-info {
    display: none;
  }

  .header-icons {
    gap: 0.25rem;
  }
}
</style>

