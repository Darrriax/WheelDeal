<template>
  <button
      class="btn rounded-pill button-icon max-w-200 search-button"
      :class="classes"
      :title="label"
      @hover="$emit('hover')"
  ><font-awesome-icon :icon="icon" style="font-size: 14px"/> {{ label }}
  </button>
</template>

<script>
export default {
  name: "ButtonIcon",
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