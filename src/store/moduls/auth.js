import { AccountApi, AuthApi, setToken } from "../../api/api";
import router from "../../router";
import { resetTheme } from "../../mixins/setTheme";
import { resetLang } from "../..//mixins/setLang.js";
import {
    DEFAULT_PROFILE_BACKGROUND,
    DEFAULT_PROFILE_IMG,
    DEFAULT_PROFILE_WOMAN_IMG,
} from "../../utils/constants.js";

const tokenData = localStorage.getItem("token") || null;

export const auth = {
  namespaced: true,

  state: {
    token: tokenData,
  },
  getters: {},
  mutations: {
    setTokenData(state, token) {
      if (!token) {
        state.token = null;
        localStorage.removeItem("token");
      } else {
        state.token = token;
        localStorage.setItem("token", token);
      }
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("auth/setTokenData", token, { root: true });
    },
    async onLogin({ commit }, { email, password }) {
      await this.dispatch("loading/setLoading", true);
      AuthApi.login(email, password)
        .then(async (res) => {
          await this.dispatch("auth/setToken", res.data.token);
          setToken(res.data.token);

          await this.dispatch("reports/showSuccess", res);
        })
        .then(async () => {
          AccountApi.getAccountData()
            .then(async (res) => {
                // Отримуємо аватарку
                await AccountApi.getAvatar(res.data.id)
                    .then(async (avatarRes) => {
                        const avatarBase64 = avatarRes.data;
                        const avatarUrl = `data:image/jpeg;base64,${avatarBase64}` ||
                            (res.data.gender === "Female" ? DEFAULT_PROFILE_WOMAN_IMG : DEFAULT_PROFILE_IMG);
                        await this.dispatch('user/setAvatar', avatarUrl);
                    })
                    .catch(async (avatarErr) => {
                        console.error("Error fetching avatar:", avatarErr);
                        const fallbackAvatar = res.data.gender === "Female" ? DEFAULT_PROFILE_WOMAN_IMG : DEFAULT_PROFILE_IMG;
                        await this.dispatch('user/setAvatar', fallbackAvatar);
                    });
                // Отримуємо банер
                await AccountApi.getBanner(res.data.id)
                    .then(async (bannerRes) => {
                        const bannerBase64 = bannerRes.data;
                        const bannerUrl = `data:image/jpeg;base64,${bannerBase64}` || DEFAULT_PROFILE_BACKGROUND;
                        await this.dispatch('user/setBanner', bannerUrl);
                    })
                    .catch(async (bannerErr) => {
                        console.error("Error fetching banner:", bannerErr);
                        await this.dispatch('user/setBanner', DEFAULT_PROFILE_BACKGROUND);
                    });

                // Оновлюємо користувача
                await this.dispatch("user/setUser", res.data);

                // Перенаправлення користувача
                if (this.getters["user/isLoggedIn"]) {
                    const redirect = router.currentRoute.value.query.redirect;
                    if (redirect === "/profile" || !redirect) {
                        await router.push("/profile");
                    } else if (redirect) {
                        await router.push(redirect.toString());
                    }
                }

                // Відображення успішного звіту
                await this.dispatch("reports/showSuccess", res);
            })
            .catch(async (err) => {
              await this.dispatch("reports/showErrors", err);
            });
        })
        .catch(async (err) => {
          await this.dispatch("reports/showErrors", err);
        })
        .finally(async () => {
          await this.dispatch("loading/setLoading", false);
        });
    },
    async onRegister(
      { commit },
      {
        name,
        surname,
        fatherName,
        password,
        email,
        phoneNumber,
        age,
        gender,
        additionalInfo,
      }
    ) {
      AuthApi.register(
        name,
        surname,
        fatherName,
        password,
        email,
        phoneNumber,
        age,
        gender,
        additionalInfo
      )
        .then(async (res) => {
          await this.dispatch("reports/showSuccess", res);
          await this.dispatch("auth/onLogin", {
            email: email,
            password: password,
          });
        })
        .catch(async (err) => {
          await this.dispatch("reports/showErrors", err);
        });
    },
    async onLogout({ commit }) {
      await this.dispatch("loading/setLoading", true);
      AuthApi.logout()
        .then(async (res) => {
          await this.dispatch("reports/showSuccess", res);
        })
        .catch(async (err) => {
          await this.dispatch("reports/showErrors", err);
        })
        .finally(async () => {
          await this.dispatch("loading/setLoading", false);
          await this.dispatch("auth/setToken", null);
          await this.dispatch("user/setUser", null);
          await resetLang();
          await resetTheme();
          await router.push({
            path: "/login",
            query: { redirect: router.currentRoute.value.fullPath },
          });
        });
    },
  },
};
