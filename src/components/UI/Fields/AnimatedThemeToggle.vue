<template>
  <div class="animated-theme-toggle">
    <input type="checkbox"
           id="hide-checkbox"
           :value="modelValue"
           :checked="modelValue"
           @click="switched"
    >
    <label for="hide-checkbox" class="animated-toggle">
        <span class="animated-toggle-button">
          <span class="crater crater-1"></span>
          <span class="crater crater-2"></span>
          <span class="crater crater-3"></span>
          <span class="crater crater-4"></span>
          <span class="crater crater-5"></span>
          <span class="crater crater-6"></span>
          <span class="crater crater-7"></span>
        </span>
      <span class="star star-1"></span>
      <span class="star star-2"></span>
      <span class="star star-3"></span>
      <span class="star star-4"></span>
      <span class="star star-5"></span>
      <span class="star star-6"></span>
      <span class="star star-7"></span>
      <span class="star star-8"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {type: Boolean, required: false},
  },
  methods: {
    switched() {
      document.querySelector('#hide-checkbox').checked
          ?
          this.$emit('update:modelValue', true)
          :
          this.$emit('update:modelValue', false);
    }
  }
}
</script>

<style scoped></style>