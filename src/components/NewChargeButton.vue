<template>
  <button class="btn-primary" @click="$emit('click')">
    <span class="btn-text">{{ text }}</span>
    <div class="icon-circle">
      <AddCircle :size="18" class="icon-add-circle icon-web" />
      <AddCircle :size="15" class="icon-add-circle icon-mobile" />
    </div>
  </button>
</template>

<script setup>
import { AddCircle } from '@solar-icons/vue'

defineProps({
  text: {
    type: String,
    default: 'Nova cobrança'
  }
})

defineEmits(['click'])
</script>

<style scoped>
.btn-primary {
  background-color: #0641FC;
  color: white;
  border: none;
  padding: 12px 23px;
  border-radius: 250px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: auto;
  letter-spacing: 0%;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: background-color 0.2s;
  position: relative;
  overflow: visible;
  z-index: 0;
}

.btn-primary::before {
  content: '';
  display: none;
}

.btn-text {
  color: #F9F9F9;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: auto;
  letter-spacing: 0%;
}

.icon-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #D1DCFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.icon-circle::before {
  display: none;
}

.icon-circle :deep(svg) {
  color: #0641FC;
  position: relative;
  z-index: 1;
}

.icon-add-circle {
  width: 18px;
  height: 18px;
}

.icon-web {
  display: block;
}

.icon-mobile {
  display: none;
}

.btn-primary:hover {
  background-color: #1f2327;
}

@media (max-width: 768px) {
  .btn-primary {
    width: 100%;
    max-width: 390px;
    height: 52px;
    justify-content: space-between;
    padding: 12px 23px;
    border-radius: 250px;
    box-shadow: 
      0px 4px 10.3px 0px #852DF691 inset,
      0px -19px 36.6px 0px #0641FC59 inset;
    background: #2A2E33;
    border: 3px solid #2A2E3324;
    color: white;
    letter-spacing: 0%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: flex;
    opacity: 1;
  }

  .btn-primary::before {
    display: none;
  }

  .btn-primary::after {
    display: none;
  }

  .btn-text {
    font-size: 18px;
    color: white;
    position: relative;
    z-index: 2;
  }

  .icon-circle {
    width: 34px;
    height: 34px;
    background: linear-gradient(180deg, #f9fbff 0%, #dae3ff 100%);
    box-shadow: 0 10px 20px rgba(5, 21, 47, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.4);
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-web {
    display: none;
  }

  .icon-mobile {
    display: block;
    width: 15px;
    height: 15px;
    position: relative;
    z-index: 3;
    color: white;
  }
  
  .icon-circle .icon-mobile :deep(svg) {
    width: 100%;
    height: 100%;
    color: white;
  }
}
</style>

