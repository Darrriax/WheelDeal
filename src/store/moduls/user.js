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
            name: userData.name || undefined,
            surname: userData.surname || undefined,
            father_name: userData.father_name || undefined,
            email: userData.email || undefined,
            password: userData.password || undefined,
            phone_number: userData.phone_number || undefined,
            age: userData.age || undefined,
            gender: userData.gender,
            additional_info: userData.additional_info || undefined,
        }
    },
    getters: {
        isLoggedIn: state => state.user.id !== undefined,
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
        async onGetUser() {
            await this.dispatch('loading/setLoading', true);
            AccountApi.getAccountData()
                .then(async (res) => {
                    await this.dispatch('user/setUser', res.data);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onUpdateUser({commit}, {name, surname, father_name, email, password, phone_number, age, gender, additional_info}) {
            await this.dispatch('loading/setLoading', true);
            AccountApi
                .updateData(name, surname, father_name, email, password, phone_number, age, gender, additional_info)
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
        async onUpdateDefaultAvatar({commit}, gender) {
            if (gender.gender === 'Female') {
                await this.dispatch('user/setAvatar', DEFAULT_PROFILE_WOMAN_IMG);
            } else {
                await this.dispatch('user/setAvatar', DEFAULT_PROFILE_IMG);
            }

        },
    },
};


