import {AccountApi, AuthApi, setToken} from "../../api/api";
import router from "../../router";
import {DEFAULT_PROFILE_IMG, DEFAULT_PROFILE_WOMAN_IMG} from "../../utils/constants";
import {encryptData, decryptData} from "../../utils/encryption";
import {resetTheme} from "../../mixins/setTheme";
import {resetLang} from "../..//mixins/setLang.js";

const tokenData = decryptData(localStorage.getItem('token')) || null;

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
                localStorage.removeItem('token');
            } else {
                state.token = token;
                localStorage.setItem('token', encryptData(token));
            }
        },
    },
    actions: {
        setToken({commit}, token) {
            commit('auth/setTokenData', token, {root: true});
        },
        async onLogin({commit}, {email, password}) {
            await this.dispatch('loading/setLoading', true);
            AuthApi
                .login(email, password)
                .then(async (res) => {
                    await this.dispatch('auth/setToken', res.data.data.token);
                    await this.dispatch('user/setUser', res.data.data.user);
                    setToken(res.data.data.token);
                    await this.dispatch('reports/showSuccess', res);
                })
                .then(async () => {
                    if (this.getters['user/isLoggedIn']) {
                        if (router.currentRoute.value.query.redirect === '/profile' || !router.currentRoute.value.query.redirect) {
                            await router.push('/profile');
                        } else if (router.currentRoute.value.query.redirect) {
                            await router.push(router.currentRoute.value.query.redirect.toString());
                        }
                        setTimeout(() => {
                            AccountApi.getAccountData()
                                .then(async (res) => {
                                    (res.data.gender === "Female") ?
                                        await this.dispatch('user/setAvatar', res.data.avatar?.url || DEFAULT_PROFILE_WOMAN_IMG)
                                        :
                                        await this.dispatch('user/setAvatar', res.data.avatar?.url || DEFAULT_PROFILE_IMG);
                                })
                                .catch(async (err) => {
                                    await this.dispatch('reports/showErrors', err);
                                });
                        }, 1000);
                    }
                })
                .catch(async err => {
                    console.log(err);
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });

        },
        async onRegister({commit}, {name, surname, father_name, password, email, phone_number, age, gender, additional_info}) {
            AuthApi
                .register(name, surname, father_name, password, email, phone_number, age, gender, additional_info)
                .then(async (res) => {
                    await this.dispatch('reports/showSuccess', res);
                    await this.dispatch('auth/onLogin', {email: email, password: password});
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                });
        },
        async onLogout({commit}) {
            await this.dispatch('loading/setLoading', true);
            AuthApi
                .logout()
                .then(async (res) => {
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                    await this.dispatch('auth/setToken', null);
                    await this.dispatch('user/setUser', null);
                    await resetLang();
                    await resetTheme();
                    await router.push({path: '/login', query: {redirect: router.currentRoute.value.fullPath}});
                });
        },
    }
};
