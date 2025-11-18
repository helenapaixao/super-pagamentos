<template>
  <div class="badge-orange">
    <span class="exclamation-icon">!</span>
  </div>
</template>

<script setup>
</script>

<style scoped>
.badge-orange {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: #FF9D3A;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(255, 232, 209, 0.45);
  box-sizing: border-box;
  flex-shrink: 0;
}

.exclamation-icon {
  color: #111827;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}
</style>

