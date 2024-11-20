<template>
  <button
      :class="classes"
      :label="label"
      :style="{height: height + 'px', width: width+ 'px'}">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type: String,
      required: true
    },
    classes: {
      required: true
    },
    height: {
      type: Number,
      default: 46
    },
    width: {
      type: Number,
      default: 312
    }
  }
}
</script>

<style scoped>
</style>