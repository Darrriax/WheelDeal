<template>
  <div class="box-wrapper">
    <div class="box-content col-lg-10 col-md-8 col-sm-12 text-center">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.box-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.box-content {
  color: var(--background-text-color);
  font-size: 40px;
}
</style>

<script>
export default {
  name: "Box"
};
</script>