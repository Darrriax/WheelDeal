import {CarApi} from "../../api/api";
import {DEFAULT_CAR_IMG} from "../../utils/constants";
import {encryptData, decryptData} from '../../utils/encryption';

const carData = decryptData(localStorage.getItem('car')) || {};
const carPhoto = decryptData(localStorage.getItem('photo')) || DEFAULT_CAR_IMG;

export const car = {
    namespaced: true,

    state: {
        photoUrl: carPhoto,
        car: {
            id: carData.id || undefined,
        }
    },
    getters: {
    },
    mutations: {
        setCarData(state, car) {
            if (!car) {
                state.car = {};
                localStorage.removeItem('car');
            } else {
                state.car = car;
                localStorage.setItem('car', encryptData(car));
            }
        },
        setPhotoUrl(state, url) {
            state.photoUrl = url;
            if (url) {
                localStorage.setItem('photo', encryptData(url));
            } else {
                localStorage.removeItem('photo');
            }
        },
    },
    actions: {
        setCar({commit}, car) {
            commit('car/setCarData', car, {root: true});
        },
        setPhoto({commit}, photo) {
            commit('car/setPhotoUrl', photo, {root: true});
        },
        setInvitations({commit}, invite) {
            commit('car/setInvitationsData', invite, {root: true});
        },
        async onLoadFiles({commit}, formData) {
            CarApi
                .loadFiles(formData)
                .then(async (res) => {
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
        },
        async onGetCar() {
            await this.dispatch('loading/setLoading', true);
            CarApi.getCarData()
                .then(async (res) => {
                    localStorage.setItem('cars', JSON.stringify(res.data.cars));
                    await this.dispatch('car/setCar', res.data);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onUpdateCar({commit}, {id, model}) {
            await this.dispatch('loading/setLoading', true);
            CarApi
                .updateData(id, model)
                .then(async (res) => {
                    await this.dispatch('car/setCar', res.data.data);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onUpdatePhoto({commit}, formData) {
            await this.dispatch('loading/setLoading', true);
            CarApi
                .updatePhoto(formData)
                .then(async (res) => {
                    await this.dispatch('car/setPhoto', res.data.data.url);
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


