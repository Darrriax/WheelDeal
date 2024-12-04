<template>
  <div
    class="p-0 white_card justify-content-between px-4 py-0 single-card-box-shadow"
    v-for="car in carsToDisplay"
    :key="car.id"
    @click="viewCar(car.id)"
    style="cursor: pointer"
  >
    <div class="row displayFlex align-items-start justify-content-start h-100">
      <div class="col-md-3 col-sm-12">
        <img
          :src="car.mainImageURL || constants().DEFAULT_CAR_IMG"
          alt="Car"
          class="car-main-image"
        />
      </div>
      <div class="col-md-9 col-sm-12 row">
        <div class="col-9 p-0 m-0">
          <h3 class="card-title textBold p-2">{{ car.displayName }}</h3>
        </div>
        <div class="col-3 end-0 p-1 m-0">
          <h5
            class="card-price textBold p-2 textRight"
            style="white-space: nowrap"
          >
            {{ car.price }} <b style="color: var(--background-ligth-blue)">$</b>
          </h5>
        </div>
        <div class="row row-cols-2 col-12 pb-4 row">
          <div class="col car-info">
            <font-awesome-icon icon="fa-solid fa-square-check" />
            {{ $t("car.vinCode") }}
          </div>
          {{ car.vinCode }}
          <div class="col car-info">
            <font-awesome-icon icon="fa-solid fa-road" />
            {{ $t("car.mileage") }}
          </div>
          {{ car.mileage }}
          <div class="col car-info">
            <font-awesome-icon icon="fa-solid fa-car-burst" />
            {{ $t("car.accident") }}
          </div>
          <div class="col car-info">
            {{ car.wasInAccident ? "✔️" : "❎" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as constants from "@/utils/constants.js";

export default {
  name: "CarBox",
  props: {
    cars: {
      type: Array,
      default: null, // Якщо пропс не переданий, використовується Vuex
    },
  },
  computed: {
    ...mapState("car", {
      vuexCars: (state) => state.cars, // Автомобілі з Vuex
    }),
    carsToDisplay() {
      // Пріоритет: пропс > Vuex
      return this.cars || this.vuexCars;
    },
  },
  methods: {
    constants() {
      return constants;
    },
    ...mapActions("car", {
      onGetCarViews: "onGetCarViews",
      onGetCarById: "onGetCarById",
    }),
    viewCar(carId) {
      this.onGetCarById({ car_id: carId });
      this.onGetCarViews({ carId });
    },
  },
};
</script>
