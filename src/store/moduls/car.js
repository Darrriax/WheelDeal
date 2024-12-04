import { CarApi } from "../../api/api";
import { DEFAULT_CAR_IMG } from "../../utils/constants";
import router from "@/router/index.js";
import { decryptData, encryptData } from "@/utils/encryption.js";

const carData = decryptData(localStorage.getItem("car")) || {};
const views = decryptData(localStorage.getItem("views")) || 0;
const carPhoto = localStorage.getItem("photo") || DEFAULT_CAR_IMG;

export const car = {
  namespaced: true,

  state: {
    photoUrl: carPhoto,
    views: views || 0,
    car: {
      owner: {} || undefined,
      id: carData.id || undefined,
      mainImageURL: carData.mainImageURL || DEFAULT_CAR_IMG,
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
  },
  actions: {
    setCar({ commit }, car) {
      commit("car/setCarData", car, { root: true });
    },
    setCars({ commit }, cars) {
      commit("car/setCarsData", cars, { root: true });
    },
    setPhoto({ commit }, photo) {
      commit("car/setPhotoUrl", photo, { root: true });
    },
    setViews({ commit }, views) {
      commit("car/setCarViews", views, { root: true });
    },
    async onGetCarById({ commit }, { car_id }) {
      await this.dispatch("loading/setLoading", true);
      CarApi.getCarDataById({ car_id })
        .then(async (res) => {
          localStorage.setItem("carId", JSON.stringify(res.data.id));
          localStorage.setItem("car", JSON.stringify(res.data));
          await this.dispatch("car/setCar", res.data);
        })
        .catch(async (err) => {
          await this.dispatch("reports/showErrors", err);
        })
        .finally(async () => {
          // Перенаправлення на сторінку з характеристиками авто
          await router.push({ path: `/car/${car_id}` });
          // CarApi.getCarViews({ car_id })
          //   .then(async (res) => {
          //     console.log(res);
          //     localStorage.setItem("carViews", JSON.stringify(res.data.id));
          //     await this.dispatch("car/setViews", res.data.views);
          //   })
          //   .catch(async (err) => {
          //     await this.dispatch("reports/showErrors", err);
          //   })
          //   .finally(async () => {
          //     // Перенаправлення на сторінку з характеристиками авто
          //     await router.push({ path: `/car/${car_id}` });
          //     await this.dispatch("loading/setLoading", false);
          //   });
          // await this.dispatch("loading/setLoading", false);
        });
    },
    async onGetCarViews({ commit }, { carId }) {
      await this.dispatch("loading/setLoading", true);
      CarApi.getCarViews({ carId })
        .then(async (res) => {
          console.log(res);
          // localStorage.setItem('carViews', JSON.stringify(res.data.id));
          // await this.dispatch('car/setViews', res.data.views);
        })
        .catch(async (err) => {
          await this.dispatch("reports/showErrors", err);
        })
        .finally(async () => {
          // Перенаправлення на сторінку з характеристиками авто
          // await router.push({path: `/car/${car_id}`});
          await this.dispatch("loading/setLoading", false);
        });
    },
    async onSearchCars(
      { commit },
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
      { commit },
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
      { commit },
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
    async onUpdatePhotos({ commit }, formData) {
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
