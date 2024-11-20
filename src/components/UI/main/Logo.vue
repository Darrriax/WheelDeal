<template>
  <div class="p-1 text-center">
    <img
        src="/images/logo.png"
        class="logo-image p-b-15"
        alt="Logo"
    />
    <div class="logo-text">
      <b>WHEEL</b>DEAL
    </div>
  </div>
</template>

<style scoped>
.logo-image {
  max-width: 250px;
}

.logo-text {
  font-size: 35px;
  margin-top: -15px;
  color: var(--primary-text-color);
}
</style>
<script>
export default {
  name: "Logo"
}
</script>