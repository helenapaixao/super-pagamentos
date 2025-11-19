<template>
  <div 
    :class="[
      'card',
      `card-${variant}`,
      { 'card-hover': hoverable },
      { 'card-bordered': bordered }
    ]"
    :style="{ 
      padding: `${padding}px`,
      borderRadius: `${borderRadius}px`
    }"
  >
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
      </slot>
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="card-content">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'outlined', 'elevated', 'flat'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: true
  },
  padding: {
    type: Number,
    default: 24
  },
  borderRadius: {
    type: Number,
    default: 12
  }
})
</script>

<style scoped>
.card {
  background: white;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.card-default {
  border: 1px solid #EEEEEE;
}

.card-outlined {
  border: 2px solid #D9D9D9;
}

.card-elevated {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-flat {
  border: none;
  background: #F9F9F9;
}

.card-hover:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  cursor: pointer;
}

.card-bordered {
  border: 1px solid #EEEEEE;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #F5F5F5;
}

.card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #2A2E33;
  margin: 0;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.card-content {
  flex: 1;
}

.card-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #F5F5F5;
}
</style>

