<template>
  <div class="displayFlexColumn">
  <div class="avatar-container">
    <img :src="avatarUrl" class="avatar-image" :class="{ 'avatar-image-hover': isHovering }" @mouseover ="isHovering = true"
         @mouseout="isHovering = false" alt="">
    <div class="avatar-overlay" v-if="isHovering = true">
      <div class="change-text">Змінити</div>
    </div>
  </div>
  <small
      v-show="error"
      class="text-danger error font-xs-400 text-center p-t-5"
  >
    <sup>*</sup>{{ error }}
  </small>
  </div>
</template>

<script>
export default {
  name: "ButtonAvatar",
  props: {
    avatarUrl: {
      type: String,
      default: '',
    },
    error: {type: String, default: ''},
  },
  data() {
    return {
      isHovering: false,
    };
  },
}
</script>
