<template>
  <layout>
    <div class="car-details-container">
      <div class="car-header-left">
        <button-white
            classes="mb-2 w-10"
            :label="$t('ui.goBack')"
            @click="goBack"
        />
        <div class="text-center car-title">
          <h1>{{ car.displayName }}</h1>
        </div>
        <div class="car-header-right">
          <h1 class="card-price textBold p-2 textRight" style="white-space: nowrap;">
            {{ car.price }} <b style="color: var(--background-ligth-blue)">$</b>
          </h1>
        </div>
      </div>

      <div class="row">
        <div class="white_card pt-3 no-border-right col-lg-9 col-md-12 car-images-carousel">
          <carousel :items="car.images.imagesUrl"/>
        </div>

        <div class="white_card no-border-left col-lg-3 col-md-12 car-info-right">
          <div class="row row-cols-1">
            <div class="col car-info">
              <font-awesome-icon icon="fa-solid fa-car-side"/>
              {{ $t('car.type') }}: {{ car.bodyType }}
            </div>
            <div class="col car-info">
              <font-awesome-icon icon="fa-solid fa-car"/>
              {{ $t('car.manufacturer') }}: {{ car.manufacturer }}
            </div>
            <div class="col car-info">
              <font-awesome-icon icon="fa-solid fa-square-check"/>
              {{ $t('car.vinCode') }}: {{ car.vinCode }}
            </div>
            <div class="col car-info">
              <font-awesome-icon icon="fa-solid fa-road"/>
              {{ $t('car.mileage') }}: {{ car.mileage }} km
            </div>
            <div class="col car-info">
              <font-awesome-icon icon="fa-solid fa-car-burst"/>
              {{ $t('car.accident') }}: {{ car.wasInAccident ? 'Yes' : 'No' }}
            </div>
            <div class="col car-info">
              <font-awesome-icon icon="fa-solid fa-hand-holding-dollar"/>
              {{ $t('car.trade') }}: {{ car.isTrade ? 'Yes' : 'No' }}
            </div>
            <div class="col car-info">
              <font-awesome-icon icon="fa-solid fa-thumbs-up"/>
              {{ $t('car.available') }}: {{ car.isAvailable ? 'Yes' : 'No' }}
            </div>
            <div class="col car-info">
              <font-awesome-icon icon="fa-solid fa-eye"/>
              {{ $t('car.views') }}: {{getViews}}
            </div>
            <button-blue :label="$t('car.buyNow')" @click="getCar(car.id)" />
            <h4 v-if="showPhone" class="text-center pt-3">{{ getPhone }}</h4>
          </div>
        </div>
      </div>

      <div class="car-description row">
        <!-- Інформація про користувача -->
        <div class="col-lg-4 col-sm-12 white_card no-border-right">
          <div class="p-2 m-2">
            <h3>{{ $t('car.owner.info') }}:</h3>
            <p><strong>{{ $t('profile.name') }}:</strong> {{ car.owner.name }}</p>
            <p><strong>{{ $t('profile.surname') }}:</strong> {{ car.owner.surname }}</p>
            <p><strong>{{ $t('profile.patronymic') }}:</strong> {{ car.owner.fatherName }}</p>
            <p><strong>{{ $t('profile.age') }}:</strong> {{ car.owner.age }}</p>
            <p><strong>{{ $t('profile.gender') }}:</strong> {{ car.owner.gender }}</p>
            <p><strong>{{ $t('profile.additionalInfo') }}:</strong> {{ car.owner.additionalInfo }}</p>
          </div>
        </div>

        <!-- Інформація про технічний стан автомобіля -->
        <div class="col-lg-8 col-sm-12 white_card technical-condition no-border-left">
          <div class="p-2 m-2">
            <h3>{{ $t('car.technicalCondition') }}:</h3>
            <p>{{ car.technicalCondition }}</p>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import Layout from "@/components/layout.vue";
import Carousel from "@/components/UI/main/Carousel.vue";
import ButtonBlue from "@/components/UI/Buttons/ButtonBlue.vue";
import ButtonWhite from "@/components/UI/Buttons/ButtonWhite.vue";
import { previousRoute } from '@/router/index.js';

export default {
  components: {
    ButtonWhite,
    Layout,
    Carousel,
    ButtonBlue
  },
  data() {
    return {
      showPhone: false, // Variable to control visibility of phone number
    };
  },
  computed: {
    ...mapState('car', {
      car: state => state.car
    }),
    ...mapGetters('user', {
      getPhone: 'getPhone',
    }),
    ...mapGetters('car', {
      getViews: 'getViews',
    }),
  },
  methods: {
    ...mapActions('car', {
      onGetCarById: 'onGetCarById',
      onGetCarViews: 'onGetCarViews'
    }),
    ...mapActions('user', {
      onGetPhoneNumber: 'onGetPhoneNumber',
    }),

    // Метод для повернення на попередню сторінку
    goBack() {
      if (previousRoute) {
        this.$router.push(previousRoute); // Повернення на попередній маршрут
      } else {
        this.$router.push('/'); // Перехід на головну сторінку за замовчуванням
      }
    },
    buyNow(ownerId) {
      this.showPhone = !this.showPhone;
      this.onGetPhoneNumber({userId: ownerId});
    },
    getCar(carId) {
      this.onGetCarViews({carId: carId});
    }
  },
}
</script>
<style scoped>
.car-details-container {
  display: flex;
  flex-direction: column;
  margin: 20px;
  font-family: Arial, sans-serif;
}

.car-header-left h1 {
  font-size: 28px;
}

.car-header-right .car-price {
  font-size: 24px;
  color: #007bff;
}

.car-images-carousel {
  height: 100%;
  display: flex;
  justify-content: center;
}

.car-info-right {
  padding-left: 20px;
}

.car-info {
  font-size: 16px;
  margin-bottom: 10px;
}

.car-description {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.car-header-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.car-title {
  flex: 1;
  text-align: center;
}

.car-header-right {
  text-align: right;
}

.car-info-right {
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center; /* Vertically center */
  height: 100%; /* Ensure the container has a height to center the text */
}

.technical-condition {
  display: flex;
  justify-content: start; /* Horizontally center */
  align-items: start; /* Vertically center */
  height: 100%; /* Ensure the container has a height to center the text */
}
</style>