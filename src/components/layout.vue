<template>
  <AppLoader v-if="loadingStatus"/>
  <div class="main-wrap">
    <div class="sidebar_container">
      <sidebar/>
    </div>
    <div class="min-vh-100 content displayFlexColumn">
      <navbar/>
      <slot/>
    </div>
  </div>
</template>

<script>
import Sidebar from "./UI/main/Sidebar.vue";
import Navbar from "./UI/main/Navbar.vue";
import isLoading from "../mixins/isLoading";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar
  },
  mixins: [
    isLoading
  ]
}
</script>

<style scoped>

</style>