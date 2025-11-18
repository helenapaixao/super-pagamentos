<template>
  <div :class="['help-button', { 'help-button-fixed': fixed }]" :style="fixed ? fixedStyles : {}">
    <button 
      class="help-btn" 
      :title="title"
      @click="$emit('click')"
    >
      <img :src="helpIcon" alt="Ajuda" class="help-icon" />
    </button>
  </div>
</template>

<script setup>
import helpIcon from '@/assets/icons/help-icon.svg'

const props = defineProps({
  title: {
    type: String,
    default: 'Ajuda'
  },
  fixed: {
    type: Boolean,
    default: false
  },
  fixedStyles: {
    type: Object,
    default: () => ({
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 50
    })
  }
})

defineEmits(['click'])
</script>

<style scoped>
.help-button {
  display: inline-block;
}

.help-button-fixed {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
}

.help-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #0641FC;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(6, 65, 252, 0.3);
  transition: opacity 0.2s, box-shadow 0.2s;
  padding: 0;
}

.help-btn:hover {
  opacity: 0.9;
  box-shadow: 0 4px 12px rgba(6, 65, 252, 0.4);
}

.help-icon {
  width: 14px;
  height: 21px;
  display: block;
}

@media (max-width: 768px) {
  .help-button-fixed {
    bottom: 1rem;
    right: 1rem;
  }

  .help-btn {
    width: 48px;
    height: 48px;
  }
}
</style>

