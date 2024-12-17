import {AccountApi, setToken} from "../../api/api";
import {DEFAULT_PROFILE_BACKGROUND, DEFAULT_PROFILE_IMG, DEFAULT_PROFILE_WOMAN_IMG} from "../../utils/constants";
import {decryptData, encryptData} from "@/utils/encryption.js";

const userData = decryptData(localStorage.getItem('user')) || {};
const userAvatar = decryptData(localStorage.getItem('avatar')) || DEFAULT_PROFILE_IMG;
const userBackground = decryptData(localStorage.getItem('background')) || DEFAULT_PROFILE_BACKGROUND;

export const user = {
    namespaced: true,

    state: {
        avatarUrl: userAvatar,
        avatarBackground: userBackground,
        phone: '' || undefined,
        user: {
            id: userData.id || undefined,
            name: userData.name || undefined,
            surname: userData.surname || undefined,
            fatherName: userData.fatherName || undefined,
            email: userData.email || undefined,
            password: userData.password || undefined,
            phoneNumber: userData.phoneNumber || undefined,
            age: userData.age || undefined,
            gender: userData.gender,
            additionalInfo: userData.additionalInfo || undefined,
            usersCars: {}
        }
    },
    getters: {
        isLoggedIn: state => state.user.id !== undefined,
        getAvatarUrl: (state) => (state.avatarUrl === DEFAULT_PROFILE_IMG || state.avatarUrl === DEFAULT_PROFILE_WOMAN_IMG)
            ? ((state.user.gender === "F") ? DEFAULT_PROFILE_WOMAN_IMG : DEFAULT_PROFILE_IMG) : state.avatarUrl,
        getAvatarBackground: (state) => state.avatarBackground,
        getUserFullName: (state) => state.user.surname + " " + state.user.name,
        getPhone: (state) => state.phone,
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
        setPhoneNumber(state, phone) {
            if (!phone) {
                state.phone = {};
                localStorage.removeItem('phone');
            } else {
                state.phone = phone;
                localStorage.setItem('phone', encryptData(phone));
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
        setAvatarBackground(state, url) {
            state.avatarBackground = url;
            if (url) {
                localStorage.setItem('background', encryptData(url));
            } else {
                localStorage.removeItem('background');
            }
        },
    },
    actions: {
        setUser({commit}, user) {
            commit('user/setUserData', user, {root: true});
        },
        setPhone({commit}, phone) {
            commit('user/setPhoneNumber', phone, {root: true});
        },
        setAvatar({commit}, avatar) {
            commit('user/setAvatarUrl', avatar, {root: true});
        },
        setBanner({commit}, image) {
            commit('user/setAvatarBackground', image, {root: true});
        },
        async onGetUser() {
            await this.dispatch('loading/setLoading', true);
            AccountApi.getAccountData()
                .then(async (res) => {
                    console.log(res)
                    await this.dispatch('user/setUser', res.data);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onGetPhoneNumber({commit}, {userId}) {
            await this.dispatch('loading/setLoading', true);
            AccountApi.getPhone({userId})
                .then(async (res) => {
                    await this.dispatch('user/setPhone', res.data.phoneNumber);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onUpdateUser({commit}, {name, surname, fatherName, password, phoneNumber, age, gender, additionalInfo}) {
            await this.dispatch('loading/setLoading', true);
            AccountApi
                .updateData(name, surname, fatherName, password, phoneNumber, age, gender, additionalInfo)
                .then(async (res) => {
                    await this.dispatch('user/setUser', res.data);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onUpdateEmail({commit}, {newEmail}) {
            await this.dispatch('loading/setLoading', true);
            console.log(newEmail)
            AccountApi
                .updateEmail(newEmail)
                .then(async (res) => {
                    await this.dispatch('auth/setToken', res.data.token);
                    setToken(res.data.token);
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

        async onUpdateAvatar({commit}, imageFile) {
            await this.dispatch('loading/setLoading', true);
            try {
                const res = await AccountApi.updateAvatar(imageFile); // Очікуємо результат API
                await this.dispatch('reports/showSuccess', res); // Показуємо успіх
                return res; // Повертаємо результат для подальшого використання
            } catch (err) {
                console.log(err);
                await this.dispatch('reports/showErrors', err); // Обробка помилки
                throw err; // Кидаємо помилку далі
            } finally {
                await this.dispatch('loading/setLoading', false); // Вимикаємо завантаження
            }
        },

        async onGetAvatar({commit}, userId) {
            await this.dispatch('loading/setLoading', true);
            AccountApi
                .getAvatar(userId)
                .then(async (res) => {
                    console.log(res.data);
                    const avatarBase64 = res.data;
                    const imageType = res.data.imageType || 'jpeg'; // Тип зображення з відповіді або значення за замовчуванням
                    const avatarUrl = `data:image/${imageType.toLowerCase()};base64,${avatarBase64}` || DEFAULT_PROFILE_BACKGROUND;
                    await this.dispatch('user/setAvatar', avatarUrl);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },

        async onDeleteAvatar({commit}) {
            await this.dispatch('loading/setLoading', true);
            AccountApi
                .deleteAvatar()
                .then(async (res) => {
                    await this.dispatch('user/setAvatar', null);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },

        async onUpdateBanner({commit}, imageFile) {
            await this.dispatch('loading/setLoading', true);
            try {
                const res = await AccountApi.updateBanner(imageFile); // Очікуємо результат API
                await this.dispatch('reports/showSuccess', res); // Показуємо успіх
                return res; // Повертаємо результат для подальшого використання
            } catch (err) {
                console.log(err);
                await this.dispatch('reports/showErrors', err); // Обробка помилки
                throw err; // Кидаємо помилку далі
            } finally {
                await this.dispatch('loading/setLoading', false); // Вимикаємо завантаження
            }
        },

        async onGetBanner({commit}, userId) {
            await this.dispatch('loading/setLoading', true);
            AccountApi
                .getBanner(userId)
                .then(async (res) => {
                    console.log(res);
                    const bannerBase64 = res.data.base64Image;
                    const imageType = res.data.imageType || 'jpeg'; // Тип зображення з відповіді або значення за замовчуванням
                    const bannerUrl = `data:image/${imageType.toLowerCase()};base64,${bannerBase64}` || DEFAULT_PROFILE_BACKGROUND;
                    await this.dispatch('user/setBanner', bannerUrl);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },

        async onDeleteBanner({commit}) {
            await this.dispatch('loading/setLoading', true);
            AccountApi
                .deleteBanner()
                .then(async (res) => {
                    await this.dispatch('user/setBanner', null);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
    },
};


