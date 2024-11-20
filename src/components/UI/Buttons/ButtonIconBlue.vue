<template>
  <button
      class="btn btn-primary rounded-pill button-icon max-w-200"
      :class="classes"
      :title="label"
      @hover="$emit('hover')"
  ><font-awesome-icon :icon="icon" style="font-size: 14px"/> {{ label }}
  </button>
</template>

<script>
export default {
  name: "ButtonIconBlue",
  props: {
    label: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: true
    },
    classes: {
      required: false
    },
  }
}
</script>