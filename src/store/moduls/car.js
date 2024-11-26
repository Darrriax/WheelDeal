import {CarApi} from "../../api/api";
import {DEFAULT_CAR_IMG} from "../../utils/constants";

const carData = localStorage.getItem('car') || {};
const carPhoto = localStorage.getItem('photo') || DEFAULT_CAR_IMG;

export const car = {
    namespaced: true,

    state: {
        photoUrl: carPhoto,
        car: {
            id: carData.id || undefined,
            display_name: carData.display_name || undefined,
            seller_id: carData.seller_id || undefined,
            body_type: carData.body_type || undefined,
            price: carData.price || undefined,
            manufacturer: carData.manufacturer || undefined,
            vin_code: carData.vin_code || undefined,
            price_currency: carData.price_currency || undefined,
            was_in_accident: carData.was_in_accident || undefined,
            is_trade: carData.is_trade || undefined,
            is_available: carData.is_available || undefined,
            mileage: carData.mileage || undefined,
            technical_condition: carData.technical_condition || undefined,
        },
        cars: {}
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
                localStorage.setItem('car', car);
            }
        },
        setCarsData(state, cars) {
            if (!car) {
                state.cars = {};
                localStorage.removeItem('cars');
            } else {
                state.cars = cars;
                localStorage.setItem('cars', cars);
            }
        },
        setPhotoUrl(state, url) {
            state.photoUrl = url;
            if (url) {
                localStorage.setItem('photo', url);
            } else {
                localStorage.removeItem('photo');
            }
        },
    },
    actions: {
        setCar({commit}, car) {
            commit('car/setCarData', car, {root: true});
        },
        setCars({commit}, cars) {
            commit('car/setCarData', cars, {root: true});
        },
        setPhoto({commit}, photo) {
            commit('car/setPhotoUrl', photo, {root: true});
        },
        async onGetCars() {
            await this.dispatch('loading/setLoading', true);
            CarApi.cars()
                .then(async (res) => {
                    localStorage.setItem('cars', JSON.stringify(res.data.cars));
                    await this.dispatch('car/setCars', res.data);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onGetCarById(car_id) {
            await this.dispatch('loading/setLoading', true);
            CarApi.getCarDataById(car_id)
                .then(async (res) => {
                    localStorage.setItem('car', JSON.stringify(res.data.car));
                    await this.dispatch('car/setCar', res.data);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onCreateCar({commit}, {display_name, seller_id, body_type, price, manufacturer, vin_code, price_currency, was_in_accident, is_trade, is_available, mileage, technical_condition}) {
            await this.dispatch('loading/setLoading', true);
            CarApi
                .createCar(display_name, seller_id, body_type, price, manufacturer, vin_code, price_currency, was_in_accident, is_trade, is_available, mileage, technical_condition)
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
        async onRemoveCar(car_id) {
            await this.dispatch('loading/setLoading', true);
            CarApi
                .removeCar(car_id)
                .then(async (res) => {
                    await this.dispatch('car/setCars', res.data.data);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onEditCarById(car_id) {
            await this.dispatch('loading/setLoading', true);
            CarApi
                .carForEditById(car_id)
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
        async onUpdateCar({commit}, {display_name, seller_id, body_type, price, manufacturer, vin_code, price_currency, was_in_accident, is_trade, is_available, mileage, technical_condition}) {
            await this.dispatch('loading/setLoading', true);
            CarApi
                .updateCarData(display_name, seller_id, body_type, price, manufacturer, vin_code, price_currency, was_in_accident, is_trade, is_available, mileage, technical_condition)
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
        async onUpdatePhotos({commit}, formData) {
            await this.dispatch('loading/setLoading', true);
            CarApi
                .updatePhotos(formData)
                .then(async (res) => {
                    await this.dispatch('car/setPhotos', res.data.data.url);
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


