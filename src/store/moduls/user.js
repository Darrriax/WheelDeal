import {AccountApi} from "../../api/api";
import {DEFAULT_PROFILE_IMG, DEFAULT_PROFILE_WOMAN_IMG} from "../../utils/constants";
import {encryptData, decryptData} from '../../utils/encryption';

const userData = decryptData(localStorage.getItem('user')) || {};
const userAvatar = decryptData(localStorage.getItem('avatar')) || DEFAULT_PROFILE_IMG;

export const user = {
    namespaced: true,

    state: {
        avatarUrl: userAvatar,
        user: {
            id: userData.id || undefined,
            role: userData.role || undefined,
            name: userData.name || undefined,
            surname: userData.surname || undefined,
            patronymic: userData.patronymic || undefined,
            email: userData.email || undefined,
            phone: userData.phone || undefined,
            gender: userData.gender,
            birthday: userData.birthday || undefined,
            email_verified_at: userData.email_verified_at || undefined,
            created_at: userData.created_at || undefined,
            updated_at: userData.updated_at || undefined,
            deleted_at: userData.deleted_at || undefined,
            invitations: userData.invitations || undefined,
        }
    },
    getters: {
        isLoggedIn: state => state.user.id !== undefined,
        isEmailVerified: state => state.user.email_verified_at !== undefined && state.user.email_verified_at !== null,
        getAvatarUrl: (state) => (state.avatarUrl === DEFAULT_PROFILE_IMG || state.avatarUrl === DEFAULT_PROFILE_WOMAN_IMG)
            ? ((state.user.gender === "F") ? DEFAULT_PROFILE_WOMAN_IMG : DEFAULT_PROFILE_IMG) : state.avatarUrl,
        getUserEmail: (state) => state.user.email,
        getUserFullName: (state) => state.user.surname + " " + state.user.name,
    },
    mutations: {
        setUserData(state, user) {
            if (!user) {
                state.user = {};
                localStorage.removeItem('user');
            } else {
                state.user = user;
                localStorage.setItem('user', encryptData(user));
            }
        },
        setAvatarUrl(state, url) {
            state.avatarUrl = url;
            if (url) {
                localStorage.setItem('avatar', encryptData(url));
            } else {
                localStorage.removeItem('avatar');
            }
        },
        setInvitationsData(state, invitations) {
            state.user.invitations = invitations;
        },
    },
    actions: {
        setUser({commit}, user) {
            commit('user/setUserData', user, {root: true});
        },
        setAvatar({commit}, avatar) {
            commit('user/setAvatarUrl', avatar, {root: true});
        },
        setInvitations({commit}, invite) {
            commit('user/setInvitationsData', invite, {root: true});
        },
        async onLoadFiles({commit}, formData) {
            AccountApi
                .loadFiles(formData)
                .then(async (res) => {
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
        },
        async onGetUser() {
            await this.dispatch('loading/setLoading', true);
            AccountApi.getAccountData()
                .then(async (res) => {
                    localStorage.setItem('trees', JSON.stringify(res.data.trees));
                    await this.dispatch('user/setInvitations', res.data.invitations);
                    await this.dispatch('user/setUser', res.data);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onUpdateUser({commit}, {name, surname, patronymic, email, phone, gender, birthday}) {
            await this.dispatch('loading/setLoading', true);
            AccountApi
                .updateData(name, surname, patronymic, email, phone, gender, birthday)
                .then(async (res) => {
                    await this.dispatch('user/setUser', res.data.data);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onUpdatePassword({commit}, {current_password, password, password_confirmation}) {
            await this.dispatch('loading/setLoading', true);
            AccountApi
                .updatePassword(current_password, password, password_confirmation)
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
        async onUpdateAvatar({commit}, formData) {
            await this.dispatch('loading/setLoading', true);
            AccountApi
                .updateAvatar(formData)
                .then(async (res) => {
                    await this.dispatch('user/setAvatar', res.data.data.url);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onUpdateDefaultAvatar({commit}, gender) {
            if (gender.gender === 'F') {
                await this.dispatch('user/setAvatar', DEFAULT_PROFILE_WOMAN_IMG);
            } else {
                await this.dispatch('user/setAvatar', DEFAULT_PROFILE_IMG);
            }

        },
    },
};


