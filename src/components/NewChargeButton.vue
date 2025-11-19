<template>
  <button class="btn-primary" @click="$emit('click')">
    <span class="btn-text">{{ text }}</span>

    <div class="icon-circle" aria-hidden="true">
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
  outline: none;
  height: 40px;
  padding: 0 23px;
  border-radius: 250px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  position: relative;
  margin: 0;
  overflow: visible;
}

.btn-primary::before,
.btn-primary::after {
  display: none;
}

.btn-text {
  color: #F9F9F9;
  font-size: 14px;
  user-select: none;
}

.icon-circle {
  width: 24px;
  height: 24px;
  background: #E6E6E6;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.icon-circle :deep(svg) { color: #0641FC; }
.icon-add-circle { width: 18px; height: 18px; display: block; }
.icon-web { display: block; }
.icon-mobile { display: none; }

.btn-primary:hover {
  background-color: #0530C7;
}

@media (max-width: 768px) and (pointer: coarse),
       (max-width: 768px) and (hover: none) {

  .btn-primary {
    width: calc(100% - 48px);
    min-width: 280px;
    max-width: 390px;
    height: 52px;
    padding: 12px 23px;
    box-sizing: border-box;

    background: #2A2E33;
    border-radius: 250px;

    margin: 24px auto !important;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 18px;
    color: #F5F7FB;

    position: relative;
    z-index: 1;

    box-shadow:
      inset 0 4px 10.3px rgba(133,45,246,0.57),
      inset 0 -19px 36.6px rgba(6,65,252,0.35);
  }


  .btn-primary::after {
    display: block;
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: inherit;
    z-index: -1;
    background: linear-gradient(135deg,
      rgba(180,130,255,0.95),
      rgba(110,90,255,0.9)
    );
    padding: 3px;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }

  .btn-text {
    font-size: 18px;
    color: #F5F7FB;
    z-index: 2;
  }

  .icon-circle {
    width: 26px;
    height: 26px;
    background: linear-gradient(180deg,#F3F7FC 0%, #E8EEF8 100%);
    box-shadow: 0 4px 12px rgba(10,20,40,0.12);
  }
  .icon-circle :deep(svg) { color: #0D1726; }
  .icon-web { display: none; }
  .icon-mobile { display: block; width: 15px; height: 15px; }
}

@media (max-width: 360px) and (pointer: coarse),
       (max-width: 360px) and (hover: none) {
  .btn-primary {
    width: calc(100% - 32px);
    min-width: 250px;
    padding-left: 16px;
    padding-right: 16px;
  }
}

</style>
