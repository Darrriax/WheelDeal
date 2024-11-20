import {AccountApi, AuthApi, setToken} from "../../api/api";
import router from "../../router";
import {DEFAULT_PROFILE_IMG, DEFAULT_PROFILE_WOMAN_IMG} from "../../utils/constants";
import {encryptData, decryptData} from "../../utils/encryption";
import {resetTheme} from "../../mixins/setTheme";

const tokenData = decryptData(localStorage.getItem('token')) || null;

export const auth = {
    namespaced: true,

    state: {
        token: tokenData,
        emailStatus: false,
    },
    getters: {
        isEmailSent: state => state.emailStatus
    },
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
        setEmailStatusData(state, emailStatus) {
            state.emailStatus = emailStatus;
        }
    },
    actions: {
        setToken({commit}, token) {
            commit('auth/setTokenData', token, {root: true});
        },
        setEmailStatus({commit}, emailStatus) {
            commit('auth/setEmailStatusData', emailStatus, {root: true});
        },
        async onLoginFacebook({commit}) {
            await this.dispatch('loading/setLoading', true);
            AuthApi
                .loginFacebook()
                .then(async (res) => {
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onForgotPassword({commit}, {email}) {
            await this.dispatch('loading/setLoading', true);
            AuthApi
                .forgotPassword(email)
                .then(async (res) => {
                    await this.dispatch('auth/setEmailStatus', true);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onResetPassword({commit}, {token, email, password, password_confirmation}) {
            await this.dispatch('loading/setLoading', true);
            AuthApi
                .resetPassword(token, email, password, password_confirmation)
                .then(async (res) => {
                    await router.push('/login');
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
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
                                    (res.data.gender === "F") ?
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
        async onSanctum({commit}) {
            AuthApi
                .sanctum()
                .then(async (res) => {
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                });
        },
        async onRegister({commit}, {name, surname, email, phone, gender, birthday, password, password_confirmation}) {
            AuthApi
                .register(name, surname, email, phone, gender, birthday, password, password_confirmation)
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
                    await this.dispatch('trees/setTrees', null);
                    await this.dispatch('person/setPersons', null);
                    await this.dispatch('treeInvitations/setTreeInvitations', null);
                    localStorage.removeItem('trees');
                    // await this.dispatch('user/setAvatar', null);
                    // await this.dispatch('person/setLastPerson', null);
                    // await this.dispatch('trees/setLastTree', null);
                    await resetLang();
                    await resetTheme();
                    await router.push({path: '/login', query: {redirect: router.currentRoute.value.fullPath}});
                });
        },
        async onNotify({commit}) {
            await this.dispatch('loading/setLoading', true);
            AuthApi.notify()
                .then(async (res) => {
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
    }
};
