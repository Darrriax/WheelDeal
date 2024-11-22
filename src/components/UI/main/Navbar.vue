<template>
  <nav class="navbar navbar-expand-lg ftco_navbar ftco-navbar-light align-items-center" id="navbar">
    <div class="container">
      <div class="collapse navbar-collapse gap-2" id="nav">
        <div class="notification_warp displayFlex justify-content-end gap-3">
          <animated-theme-toggle v-model="selectedTheme" class="my-1"/>
          <div class="dropdown desktop ">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="languageDropdown"
                    data-bs-toggle="dropdown" aria-expanded="false">
              {{ selectedLanguage }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="languageDropdown">
              <li v-for="language in supportedLanguages"
                  :key="language.code">
                <a class="dropdown-item"
                   href="#"
                   @click="switchLanguage(language.code)">
                  {{ language.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="ms-auto d-flex align-items-center gap-3">

          <div class="name_and_surname">
            <span
                id="name_and_surname"
                class="cursorPointer"
                @click="goToProfile"
            >
              {{ surname + ' ' + name }}
            </span>
          </div>

          <div class="vr mx-1"></div>

          <button
              type="submit"
              class="btn btn-secondary rounded-pill"
              @click="logoutBtn"
          >
            {{ $t('ui.exit') }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import router from "../../../router";
import setTheme from "../../../mixins/setTheme";
import setLang from "../../../mixins/setLang";
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
      supportedLanguages: [
        {code: 'en', name: 'English'},
        {code: 'ua', name: 'Ukrainian'},
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
    setLang
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