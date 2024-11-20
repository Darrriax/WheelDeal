<template>
  <div class="app-theme">
    <div class="app-container">
      <AppLoader v-if="loadingStatus"/>
      <slot/>
    </div>
  </div>
</template>

<script>
import isLoading from "../../../mixins/isLoading";

export default {
  name: "authLayout",
  mixins: [
    isLoading
  ]
}
</script>