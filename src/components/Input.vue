<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>

    <div class="input-container" :class="{ 'has-error': error, 'is-disabled': disabled }">
      <component 
        v-if="prefixIcon" 
        :is="prefixIcon" 
        :size="20" 
        class="input-icon input-icon-prefix"
      />

      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :class="[
          'input-field',
          { 'has-prefix-icon': prefixIcon },
          { 'has-suffix-icon': suffixIcon }
        ]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <component 
        v-if="suffixIcon" 
        :is="suffixIcon" 
        :size="20" 
        class="input-icon input-icon-suffix"
      />
    </div>

    <div v-if="error || helperText" class="input-hint">
      <span v-if="error" class="input-error">{{ error }}</span>
      <span v-else-if="helperText" class="input-helper">{{ helperText }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: null
  },
  helperText: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: Object,
    default: null
  },
  suffixIcon: {
    type: Object,
    default: null
  },
  maxlength: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.input-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #2A2E33;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.input-required {
  color: #FF4D6D;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-field {
  width: 100%;
  height: 40px;
  padding: 0 1rem;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #2A2E33;
  background: white;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.input-field.has-prefix-icon {
  padding-left: 3rem;
}

.input-field.has-suffix-icon {
  padding-right: 3rem;
}

.input-field:focus {
  outline: none;
  border-color: #0641FC;
  box-shadow: 0 0 0 3px rgba(6, 65, 252, 0.1);
}

.input-field:disabled {
  background-color: #F5F5F5;
  cursor: not-allowed;
  color: #9CA3AF;
}

.input-field::placeholder {
  color: #9CA3AF;
}

.input-container.has-error .input-field {
  border-color: #FF4D6D;
}

.input-container.has-error .input-field:focus {
  box-shadow: 0 0 0 3px rgba(255, 77, 109, 0.1);
}

.input-icon {
  position: absolute;
  color: #6B7280;
  pointer-events: none;
}

.input-icon-prefix {
  left: 1rem;
}

.input-icon-suffix {
  right: 1rem;
}

.input-hint {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  min-height: 18px;
}

.input-error {
  color: #FF4D6D;
}

.input-helper {
  color: #6B7280;
}
</style>

