import {CarApi} from "../../api/api";
import {DEFAULT_CAR_IMG} from "../../utils/constants";
import router from "@/router/index.js";
import {decryptData, encryptData} from "@/utils/encryption.js";
import logger from "@fortawesome/vue-fontawesome/src/logger.js";

const carData = decryptData(localStorage.getItem("car")) || {};
const owner = decryptData(localStorage.getItem("owner")) || {};
const views = localStorage.getItem("views") || 0;
const images = decryptData(localStorage.getItem("images")) || [];
const carPhoto = localStorage.getItem("photo") || DEFAULT_CAR_IMG;

export const car = {
    namespaced: true,

    state: {
        photoUrl: carPhoto,
        views: views || 0,
        car: {
            owner: owner || undefined,
            id: carData.id || undefined,
            mainImageURL: carData.mainImageURL || DEFAULT_CAR_IMG,
            images: {
                imagesUrl: images || []
            },
            displayName: carData.displayName || undefined,
            sellerId: carData.sellerId || undefined,
            bodyType: carData.bodyType || undefined,
            price: carData.price || undefined,
            manufacturer: carData.manufacturer || undefined,
            vinCode: carData.vinCode || undefined,
            priceCurrency: carData.priceCurrency || undefined,
            wasInAccident: carData.wasInAccident || undefined,
            isTrade: carData.isTrade || undefined,
            isAvailable: carData.isAvailable || undefined,
            mileage: carData.mileage || undefined,
            technicalCondition: carData.technicalCondition || undefined,
        },
        cars: {},
    },
    getters: {
        getViews: (state) => state.views,
    },
    mutations: {
        setCarData(state, car) {
            if (!car) {
                state.car = {};
                localStorage.removeItem("car");
            } else {
                state.car = car;
                localStorage.setItem("car", encryptData(car));
            }
        },
        setOwnerData(state, owner) {
            state.car.owner = owner;
            localStorage.setItem("owner", encryptData(owner));
        },
        setCarsData(state, cars) {
            if (!car) {
                state.cars = {};
                localStorage.removeItem("cars");
            } else {
                state.cars = cars;
                localStorage.setItem("cars", encryptData(cars));
            }
        },
        setPhotoUrl(state, url) {
            state.photoUrl = url;
            if (url) {
                localStorage.setItem("photo", url);
            } else {
                localStorage.removeItem("photo");
            }
        },
        setCarViews(state, views) {
            state.views = views;
            localStorage.setItem("views", views);
        },
        setCarImages(state, images) {
            state.car.images.imagesUrl = images;
            localStorage.setItem("images", encryptData(images));
        },
        // setCarImages(state, images) {
        //     if (images && images.length > 0) {
        //         // Зберігаємо кожне фото окремо в localStorage
        //         images.forEach((image, index) => {
        //             localStorage.setItem(`carImage_${index}`, image);
        //         });
        //
        //         // Зберігаємо зашифровані фото в одному ключі
        //         localStorage.setItem("images", encryptData(images));
        //         state.car.images = images;
        //     } else {
        //         // Якщо немає фото, видаляємо їх з localStorage
        //         state.car.images = [];
        //         localStorage.removeItem("images");
        //         images.forEach((_, index) => {
        //             localStorage.removeItem(`carImage_${index}`);
        //         });
        //     }
        // }
    },
    actions: {
        setCar({commit}, car) {
            commit("car/setCarData", car, {root: true});
        },
        setOwner({commit}, owner) {
            commit("car/setOwnerData", owner, {root: true});
        },
        setCars({commit}, cars) {
            commit("car/setCarsData", cars, {root: true});
        },
        setPhoto({commit}, photo) {
            commit("car/setPhotoUrl", photo, {root: true});
        },
        setViews({commit}, views) {
            commit("car/setCarViews", views, {root: true});
        },
        setImages({commit}, images) {
            commit("car/setCarImages", images, {root: true});
        },
        // loadCarImagesFromStorage({ commit }) {
        //     const encryptedImages = localStorage.getItem("images");
        //     if (encryptedImages) {
        //         const images = decryptData(encryptedImages);
        //         commit("car/setCarImages", images);
        //     } else {
        //         // Якщо немає зашифрованих фото, пробуємо завантажити кожне фото окремо
        //         const images = [];
        //         let index = 0;
        //         while (localStorage.getItem(`carImage_${index}`)) {
        //             images.push(localStorage.getItem(`carImage_${index}`));
        //             index++;
        //         }
        //         commit("car/setCarImages", images);
        //     }
        // },
        async onGetCarById({commit}, {car_id}) {
            await this.dispatch("loading/setLoading", true);

            try {
                // Отримання даних автомобіля
                const carData = await CarApi.getCarDataById({car_id});
                localStorage.setItem("carId", JSON.stringify(carData.data.id));
                await this.dispatch("car/setImages", carData.data.images.imagesUrl);
                await this.dispatch("car/setCar", carData.data);
                await this.dispatch("car/setOwner", carData.data.owner);

                // Отримання кількості переглядів
                const carViews = await CarApi.getCarViews({carId: car_id});
                localStorage.setItem('carViews', JSON.stringify(carViews.data.watchAmount));
                await this.dispatch('car/setViews', carViews.data.watchAmount);

                // Перенаправлення на сторінку з характеристиками авто
                await router.push({path: `/car/${car_id}`});

            } catch (err) {
                // Обробка помилок
                await this.dispatch("reports/showErrors", err);
            } finally {
                // Завершення завантаження
                await this.dispatch("loading/setLoading", false);
            }
        },
        async onSearchCars(
            {commit},
            {
                manufacturer,
                bodyType,
                priceFrom,
                priceTo,
                mileageFrom,
                mileageTo,
                displayName,
                page,
                size,
            }
        ) {
            await this.dispatch("loading/setLoading", true);

            CarApi.cars({
                manufacturer,
                bodyType,
                priceFrom,
                priceTo,
                mileageFrom,
                mileageTo,
                displayName,
                page,
                size,
            })
                .then(async (res) => {
                    console.log(res);
                    await this.dispatch("car/setCars", res.data.carShortResponses);
                    // Перенаправлення на сторінку з авто перед виконанням пошуку
                    await router.push("/car");
                })
                .catch(async (err) => {
                    await this.dispatch("reports/showErrors", err);
                })
                .finally(async () => {
                    await this.dispatch("loading/setLoading", false);
                });
        },
        async onCreateCar(
            {commit},
            {
                displayName,
                sellerId,
                bodyType,
                price,
                manufacturer,
                vinCode,
                priceCurrency,
                wasInAccident,
                isTrade,
                isAvailable,
                mileage,
                technicalCondition,
            }
        ) {
            await this.dispatch("loading/setLoading", true);
            CarApi.createCar(
                displayName,
                sellerId,
                bodyType,
                price,
                manufacturer,
                vinCode,
                priceCurrency,
                wasInAccident,
                isTrade,
                isAvailable,
                mileage,
                technicalCondition
            )
                .then(async (res) => {
                    await this.dispatch("reports/showSuccess", res);
                })
                .catch(async (err) => {
                    await this.dispatch("reports/showErrors", err);
                })
                .finally(async () => {
                    await this.dispatch("loading/setLoading", false);
                });
        },
        async onRemoveCar(car_id) {
            await this.dispatch("loading/setLoading", true);
            CarApi.removeCar(car_id)
                .then(async (res) => {
                    await this.dispatch("car/setCars", res.data.data);
                    await this.dispatch("reports/showSuccess", res);
                })
                .catch(async (err) => {
                    await this.dispatch("reports/showErrors", err);
                })
                .finally(async () => {
                    await this.dispatch("loading/setLoading", false);
                });
        },
        async onEditCarById(car_id) {
            await this.dispatch("loading/setLoading", true);
            CarApi.carForEditById(car_id)
                .then(async (res) => {
                    await this.dispatch("car/setCar", res.data.data);
                    await this.dispatch("reports/showSuccess", res);
                })
                .catch(async (err) => {
                    await this.dispatch("reports/showErrors", err);
                })
                .finally(async () => {
                    await this.dispatch("loading/setLoading", false);
                });
        },
        async onUpdateCar(
            {commit},
            {
                displayName,
                sellerId,
                bodyType,
                price,
                manufacturer,
                vinCode,
                priceCurrency,
                wasInAccident,
                isTrade,
                isAvailable,
                mileage,
                technicalCondition,
            }
        ) {
            await this.dispatch("loading/setLoading", true);
            CarApi.updateCarData(
                displayName,
                sellerId,
                bodyType,
                price,
                manufacturer,
                vinCode,
                priceCurrency,
                wasInAccident,
                isTrade,
                isAvailable,
                mileage,
                technicalCondition
            )
                .then(async (res) => {
                    await this.dispatch("car/setCar", res.data.data);
                    await this.dispatch("reports/showSuccess", res);
                })
                .catch(async (err) => {
                    await this.dispatch("reports/showErrors", err);
                })
                .finally(async () => {
                    await this.dispatch("loading/setLoading", false);
                });
        },
        async onUpdatePhotos({commit}, formData) {
            await this.dispatch("loading/setLoading", true);
            CarApi.updatePhotos(formData)
                .then(async (res) => {
                    await this.dispatch("car/setPhotos", res.data.data.url);
                    await this.dispatch("reports/showSuccess", res);
                })
                .catch(async (err) => {
                    await this.dispatch("reports/showErrors", err);
                })
                .finally(async () => {
                    await this.dispatch("loading/setLoading", false);
                });
        },
    },
};
