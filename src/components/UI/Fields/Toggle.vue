<template>
  <div class="toggle-button-container">
    <div class="align-content-center d-flex justify-content-md-start justify-content-sm-start">
      <input
          type="checkbox"
          class="toggle-button"
          :value="modelValue"
          :checked="modelValue"
          @click="switched"
          :disabled="isDisabled"
          ref="toggleButton"
      />
      <label class="label">{{ label }}</label>
    </div>
    <small
        v-show="error"
        class="text-danger error font-xs-400"
    >
      <sup>*</sup>{{ error }}
    </small>
  </div>
</template>

<script>
export default {
  props: {
    label: {type: String, required: true},
    modelValue: {type: Boolean, required: false},
    isDisabled: {type: Boolean, required: false},
    error: {type: String, default: ''},
  },
  methods: {
    switched() {
      this.$emit('update:modelValue', this.$refs.toggleButton.checked); // Use $refs to access the specific toggle button
    }
  }
}
</script>

<style scoped>
</style>
