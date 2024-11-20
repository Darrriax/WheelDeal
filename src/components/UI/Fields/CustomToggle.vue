<template>
  <div class="custom-toggle-container">
    <label class="custom-checkbox-container">{{ label }}
      <input
          type="checkbox"
          class="custom-checkbox-input"
          :value="modelValue"
          :checked="modelValue"
          @click="switched"
          :disabled="isDisabled"
      >
      <span class="custom-checkbox-checkmark"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: {type: String},
    modelValue: {type: Boolean, required: false},
    isDisabled: {type: Boolean, required: false},
  },
  methods: {
    switched() {
      document.querySelector('.custom-checkbox-input').checked
          ?
          this.$emit('update:modelValue', true)
          :
          this.$emit('update:modelValue', false);
    }
  }
}
</script>

<style scoped>
</style>