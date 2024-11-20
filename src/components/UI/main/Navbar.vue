<template>
  <nav class="navbar navbar-expand-lg ftco_navbar ftco-navbar-light align-items-center" id="navbar">
    <div class="container">
      <div class="collapse navbar-collapse gap-2" id="nav">
        <div class="notification_warp displayFlex justify-content-end gap-3">
          <a href="#" id="navbar_notification" class="icons_params" role="button">
            <font-awesome-icon icon="fa-solid fa-bell" class="fa-bell"/>
          </a>
          <animated-theme-toggle v-model="selectedTheme"/>
        </div>
        <div class="vr mx-1"></div>
        <div class="name_and_surname">
          <span id="name_and_surname"
                class="cursorPointer"
                @click="goToProfile">
            {{ surname + ' ' + name }}
          </span>
        </div>
        <div class="avatar">
          <img @click="goToProfile"
               class="navbar_avatar cursorPointer"
               :src="getAvatarUrl"
               alt=""
          >
        </div>
        <button type="submit"
                class="px-3 btn btn-secondary rounded-pill desktop"
                @click="logoutBtn">
          {{ $t('layout.exit') }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import router from "../../../router";
import setTheme from "../../../mixins/setTheme";
import AnimatedThemeToggle from "../../../components/UI/Fields/AnimatedThemeToggle.vue";

export default {
  name: "Navbar",
  components: {
    AnimatedThemeToggle
  },

  data() {
    return {
      themes: [
        {code: 'dark', name: 'Dark Theme'},
        {code: 'light', name: 'Light Theme'},
      ],
    }
  },
  computed: {
    ...mapGetters('user', {
      getAvatarUrl: 'getAvatarUrl',
    }),
    ...mapState('user', {
      name: state => state.user.name,
      surname: state => state.user.surname,
    }),
    ...mapGetters('user', {
      isLoggedIn: "isLoggedIn",
    }),
  },
  mixins: [
    setTheme,
  ],
  methods: {
    ...mapActions('auth', {
      onLogout: 'onLogout',
    }),
    logoutBtn() {
      this.onLogout();
    },
    goToProfile() {
      router.push('/profile');
    }
  },
}
</script>