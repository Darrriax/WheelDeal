<template>
  <div class="profile-container">
    <div
        class="background-block"
        :style="{ backgroundImage: `url(${avatarBackground})` }"
        :class="{ 'avatar-image-hover': isHovering }" @mouseover ="isHovering = true"
        @mouseout="isHovering = false">
      <div class="background-overlay" v-if="isHovering = true">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarForm',
  props: {
    avatarBackground: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isHovering: false,
    };
  },

};
</script>

<style scoped>
.profile-container {
  width: 100%;
  position: relative; /* Для відносного позиціонування дочірніх елементів */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}

.background-block {
  width: 100%;
  height: 150px; /* Висота фону */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
}

.background-overlay {
  position: absolute;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.3;
  transition: opacity 0.3s;
}

.background-block:hover .background-overlay {
  opacity: 1;
}
</style>