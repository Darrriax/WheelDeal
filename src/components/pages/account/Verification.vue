<template>
  <div class="app-container">
    <AppLoader
        v-if="loadingStatus"
    />
    <div class="row col-sm-9 flex-sm-column col-md-5 flex-md-row-reverse text-center m-auto">
      <div class="col-md-2 col-sm-12">
        <font-awesome-icon
            icon="fa-regular fa-circle-check"
            style="color: #669c35; height: 100px"
        />
      </div>
      <div class="col-md-10 col-sm-12">
        <div class="title-text">{{ $t('ui.verification.title') }}</div>
        <div class="simple-text m-auto">{{ $t('ui.verification.text') }}</div>
        <button-blue
            classes="m-t-10"
            :label="$t('ui.verification.link')"
            @click="goToProfile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBlue from "../../UI/Buttons/ButtonBlue.vue";
import router from "../../../router";
import isLoggedIn from "../../../mixins/isLoggedIn";
import isLoading from "../../../mixins/isLoading";
import axios from "axios";

export default {
  name: "Verification",
  components: {
    ButtonBlue,
  },
  mixins: [
    isLoggedIn,
    isLoading
  ],
  methods: {
    goToProfile() {
      this.sendPostRequest();
      router.push('/profile');
    },
    sendPostRequest() {
      try {
        const currentUrl = window.location.href;
        const urlParams = new URLSearchParams(new URL(currentUrl).search);
        const targetUrl = urlParams.get('url');
        if (targetUrl) {
          axios.post(targetUrl);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  created() {
    this.sendPostRequest()
  },
}
</script>

<style scoped>

</style>