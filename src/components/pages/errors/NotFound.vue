<template>
  <layout>
    <div class="text-center d-flex justify-content-center flex-column align-items-center h-75">
      <h1>404 :( </h1>
      <h4>{{ $t('not_found.thought') }}</h4>
      <div class="not-found_paragraph p-t-20 p-b-20">
        <h6>{{ $t('not_found.not_found') }}</h6>
        <h6>{{ $t('not_found.take_back') }}</h6>
      </div>
      <router-link
          to="/profile"
          aria-expanded="false"
          class="btn btn-transparent-blue fs-6 max-w-200"
      >
        <span>{{ $t('not_found.link') }}</span>
      </router-link>
    </div>
  </layout>
</template>

<script>
import Layout from "../../layout.vue";

export default {
  name: 'NotFound',
  components: {
    Layout
  }
}
</script>

<style scoped></style>