<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <nav class="menu-section">
        <h3 class="section-title">MENU</h3>
        <ul class="menu-list">
          <li>
            <router-link to="/" class="menu-item active">
              <div class="icon-wrapper icon-active">
                <img :src="dashboardIcon" alt="Dashboard" class="menu-icon" />
              </div>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="menu-item">
              <div class="icon-wrapper">
                <img :src="usersIcon" alt="Clientes" class="menu-icon" />
              </div>
              <span>Clientes</span>
            </a>
          </li>
          <li>
            <a href="#" class="menu-item">
              <div class="icon-wrapper">
                <img :src="cobrancasIcon" alt="Cobranças" class="menu-icon" />
              </div>
              <span>Cobranças</span>
            </a>
          </li>
          <li>
            <a href="#" class="menu-item">
              <div class="icon-wrapper">
                <img :src="walletIcon" alt="Carteira" class="menu-icon" />
              </div>
              <span>Carteira</span>
            </a>
          </li>
          <li>
            <a href="#" class="menu-item">
              <div class="icon-wrapper">
                <img :src="caseIcon" alt="Vendedores" class="menu-icon" />
              </div>
              <span>Vendedores</span>
            </a>
          </li>
          <li>
            <a href="#" class="menu-item">
              <div class="icon-wrapper">
                <img :src="boxIcon" alt="Antecipações" class="menu-icon" />
              </div>
              <span>Antecipações</span>
              <img :src="roundAltArrowDownIcon" alt="" class="menu-arrow" width="24" height="24" />
            </a>
          </li>
          <li>
            <a href="#" class="menu-item">
              <div class="icon-wrapper">
                <img :src="gestaoIcon" alt="Gestão" class="menu-icon" />
              </div>
              <span>Gestão</span>
              <img :src="roundAltArrowDownIcon" alt="" class="menu-arrow" width="24" height="24" />
            </a>
          </li>
          <li>
            <a href="#" class="menu-item">
              <div class="icon-wrapper">
                <img :src="codeIcon" alt="Integrações" class="menu-icon" />
              </div>
              <span>Integrações</span>
            </a>
          </li>
        </ul>
      </nav>

      <nav class="menu-section">
        <h3 class="section-title">GERAL</h3>
        <ul class="menu-list">
          <li>
            <a href="#" class="menu-item">
              <div class="icon-wrapper">
                <img :src="settingsIcon" alt="Configurações" class="menu-icon" />
              </div>
              <span>Configurações</span>
            </a>
          </li>
          <li>
            <a href="#" class="menu-item">
              <div class="icon-wrapper">
                <img :src="userIcon" alt="Perfil" class="menu-icon" />
              </div>
              <span>Perfil</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="ad-card">
        <div class="ad-content">
          <img :src="superCartaoImage" alt="Super Cartão Pré-Pago" class="ad-image" />
        </div>
      </div>

      <div class="logout-section">
        <div class="divider"></div>
        <BaseButton
          text="Deslogar da conta"
          :icon="DownloadMinimalistic"
          :icon-size="18"
          :gap="65"
          variant="outline"
          :full-width="true"
          @click="handleLogout"
        />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { DownloadMinimalistic } from '@solar-icons/vue'
import BaseButton from './BaseButton.vue'
import dashboardIcon from '@/assets/icons/dashboard-icon.svg'
import usersIcon from '@/assets/icons/users-icon.svg'
import cobrancasIcon from '@/assets/icons/cobrancas-icon.svg'
import walletIcon from '@/assets/icons/wallet-icon.svg'
import caseIcon from '@/assets/icons/case-icon.svg'
import boxIcon from '@/assets/icons/box-icon.svg'
import gestaoIcon from '@/assets/icons/gestao-icon.svg'
import codeIcon from '@/assets/icons/code-icon.svg'
import settingsIcon from '@/assets/icons/settings-icon.svg'
import userIcon from '@/assets/icons/user-icon.svg'
import roundAltArrowDownIcon from '@/assets/icons/round-alt-arrow-down-linear.svg'
import superCartaoImage from '@/assets/images/super-cartao-pre-pago.jpg'

const handleLogout = () => {
  console.log('Deslogar da conta')
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  background-color: white;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  border-right: 1px solid #E5E7EB;
  position: fixed;
  left: 0;
  top: 60px;
  overflow-y: auto;
}

.sidebar-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  padding-top: 0;
  min-height: 100%;
}

.menu-section {
  margin-bottom: 2rem;
}

.menu-section:first-child {
  margin-top: 0;
  padding-top: 1.5rem;
}

.section-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #86898B;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: #2A2E33;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
  margin-bottom: 0.25rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: auto;
  letter-spacing: 0%;
}

.menu-item:hover {
  background-color: #F9FAFB;
}

.menu-item.active {
  color: #2A2E33;
  font-weight: 600;
}

.menu-item.active .icon-wrapper {
  background-color: #EFF6FF;
}

.menu-item.active .icon-wrapper :deep(svg) {
  color: #2563EB;
}

.icon-wrapper {
  width: 41.92px;
  height: 40.67px;
  border-radius: 250px;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 12px;
}

.icon-wrapper :deep(svg) {
  color: #6B7280;
}

.menu-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.icon-active {
  background-color: #EFF6FF;
}

.icon-active :deep(svg) {
  color: #2563EB;
}

.menu-arrow {
  margin-left: auto;
  width: 24px;
  height: 24px;
  display: block;
  flex-shrink: 0;
}

.ad-card {
  background: transparent;
  border-radius: 12px;
  padding: 0;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

.ad-cards-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.15;
  pointer-events: none;
}

.credit-card {
  position: absolute;
  width: 120px;
  height: 75px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(2px);
}

.credit-card::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 12px;
  width: 30px;
  height: 20px;
  background: linear-gradient(135deg, #0641FC 0%, #0530C7 100%);
  border-radius: 4px;
  opacity: 0.3;
}

.credit-card::after {
  content: 'super';
  position: absolute;
  top: 10px;
  left: 50px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
}

.card-1 {
  top: 20px;
  left: 20px;
  transform: rotate(-8deg);
}

.card-2 {
  top: 30px;
  right: 30px;
  transform: rotate(12deg);
}

.card-3 {
  top: 60px;
  left: 50%;
  transform: translateX(-50%) rotate(-5deg);
}

.ad-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.ad-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: 12px;
}

.ad-button {
  width: 212px;
  height: 46px;
  padding: 12px 23px;
  background-color: #0641FC;
  color: #FFFFFF;
  border: none;
  border-radius: 250px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: 0%;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-button:hover {
  background-color: #0530C7;
}

.logout-section {
  margin-top: auto;
  width: 100%;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #E5E7EB;
  margin-bottom: 1rem;
}

.logout-section :deep(.base-button-outline) {
  background-color: white;
  border: 1px solid #E5E7EB;
  color: #2A2E33;
  border-radius: 250px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 400;
}

.logout-section :deep(.button-icon) {
  transform: rotate(-90deg);
}

.logout-section :deep(.base-button-outline:hover) {
  background-color: #F9FAFB;
  border-color: #D1D5DB;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 240px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -280px;
    transition: left 0.3s;
    z-index: 1000;
    height: 100vh;
    min-height: 100vh;
  }

  .sidebar.open {
    left: 0;
  }
}
</style>
