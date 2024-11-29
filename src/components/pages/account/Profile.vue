<template>
  <layout>
    <div class="px-3 col-12" id="profile" :key="componentKey">
      <div class="row">
        <div
            class="white_card no-border-right justify-content-md-end justify-content-sm-center col-md-12 col-lg-12 col-xl-3">
          <div class="avatar p-t-20">
            <div>
              <input
                  type="file"
                  ref="fileInput"
                  style="display: none"
                  @change="changeAvatar"
              >
              <button-avatar
                  :avatar-url="getAvatarUrl"
                  @click="clickAvatar"
                  :error="error['avatar']"
              />
            </div>
            <div class="title-text p-t-10 textCenter">{{ getUserFullName }}</div>
            <form class="mb-0 w100" @submit.prevent="updateEmail($event)">
              <text-field
                  :label="$t('profile.email')"
                  v-model="user.email"
                  :error="error['email']"
              />
              <button-white
                  classes="mb-2 w100 m-t-15"
                  :label="$t('ui.save')"
                  icon="fa-solid fa-save"
                  type="submit"
              />
            </form>
          </div>
        </div>
        <form class="d-md-block d-sm-block d-lg-flex m-0 p-0 col-md-12 col-lg-12 col-xl-6"
              @submit.prevent="updateUser($event)">
          <div class="white_card no-border-radius no-border-top info col-md-12 col-lg-6 col-xl-12">
            <h5 class="py-3 text-center">{{ $t('profile.title') }}</h5>
            <div class="mx-0 row row-cols-md-2 row-cols-sm-1">
              <div>
                <text-field
                    :label="$t('profile.name')"
                    v-model="user.name"
                    :error="error['name']"
                />
                <text-field
                    :label="$t('profile.surname')"
                    v-model="user.surname"
                    :error="error['surname']"
                />
                <text-field
                    :label="$t('profile.patronymic')"
                    v-model="user.fatherName"
                />
              </div>
              <div>
                <div class="w100">
                  <number-field
                      :label="$t('profile.age')"
                      v-model="user.age"
                      :error="error['age']"
                  />
                  <select-field
                      v-model="user.gender"
                      :value="user.gender"
                      :options="genders"
                      :label="$t('profile.gender')"
                      :error="error['gender']"
                  />
                  <text-field
                      :label="$t('profile.additionalInfo')"
                      v-model="user.additionalInfo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="white_card no-border-left col-md-12 col-lg-6 col-xl-6">
            <h5 class="py-3 text-center">{{ $t('profile.connect') }}</h5>
            <div>
              <div class="p-0 position-relative">
                <phone-field
                    :label="$t('profile.phone')"
                    v-model="user.phoneNumber"
                    :error="error['phoneNumber']"
                />
                <password-field
                    :label="$t('profile.password')"
                    v-model="user.password"
                    :error="error['password']"
                />
                <button-white
                    classes="mb-2 w100 m-t-15"
                    :label="$t('ui.save')"
                    icon="fa-solid fa-save"
                    type="submit"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <h5 class="py-3 text-center">{{ $t('profile.cars') }}</h5>
      <div class="p-0 white_card justify-content-between px-4 py-0 single-card-box-shadow" v-for="car in cars">
        <div class="row displayFlex align-items-center justify-content-center h-100">
          <div class="col-md-3 col-sm-12">
            <img
                :src="car.mainPhoto || constants().DEFAULT_CAR_IMG"
                alt="Car"
                class="car-main-image"
            >
          </div>
          <div class="col-md-9 col-sm-12 row">
            <div class="col-9 p-0 m-0">
              <h3 class="card-title textBold p-2">{{ car.displayName }}</h3>
            </div>
            <div class="col-3 end-0 p-0 m-0">
              <h5 class="card-price textBold p-2 textRight">{{ car.price }} <b
                  style="color: var(--background-ligth-blue)">{{ car.priceCurrency }}</b></h5>
            </div>
            <div class="row row-cols-2 col-6 row">
              <div class="col car-info">
                <font-awesome-icon icon="fa-solid fa-car-side"/>
                {{ $t('car.type') }}:
              </div>
              {{ car.bodyType }}
              <div class="col car-info">
                <font-awesome-icon icon="fa-solid fa-car"/>
                {{ $t('car.manufacturer') }}
              </div>
              {{ car.manufacturer }}
              <div class="col car-info">
                <font-awesome-icon icon="fa-solid fa-square-check"/>
                {{ $t('car.vinCode') }}
              </div>
              {{ car.vinCode }}
              <div class="col car-info">
                <font-awesome-icon icon="fa-solid fa-road"/>
                {{ $t('car.mileage') }}
              </div>
              {{ car.mileage }}
            </div>
            <div class="row row-cols-2 col-6 row m-0 p-0">
              <div class="col car-info">
                <font-awesome-icon icon="fa-solid fa-screwdriver-wrench"/>
                {{ $t('car.technicalCondition') }}
              </div>
              {{ car.technicalCondition }}
              <div class="col car-info">
                <font-awesome-icon icon="fa-solid fa-car-burst"/>
                {{ $t('car.accident') }}
              </div>
              {{ car.wasInAccident }}
              <div class="col car-info">
                <font-awesome-icon icon="fa-solid fa-hand-holding-dollar"/>
                {{ $t('car.trade') }}
              </div>
              {{ car.isTrade }}
              <div class="col car-info">
                <font-awesome-icon icon="fa-solid fa-thumbs-up"/>
                {{ $t('car.available') }}
              </div>
              {{ car.isAvailable }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <message :label="message"/>
  </layout>
</template>

<script>
import {user} from "../../../store/moduls/user";
import {mapActions, mapGetters, mapState} from "vuex";
import {GENDERS} from '../../../utils/enums';
import Sidebar from "../../UI/main/Sidebar.vue";
import Navbar from "../../UI/main/Navbar.vue";
import ButtonBlue from "../../UI/Buttons/ButtonBlue.vue";
import ButtonWhite from "../../UI/Buttons/ButtonWhite.vue";
import ButtonDefault from "../../UI/Buttons/ButtonDefault.vue";
import TextField from "../../UI/Fields/TextField.vue";
import SelectField from "../../UI/Fields/SelectField.vue";
import NumberField from "../../UI/Fields/NumberField.vue";
import PhoneField from "../../UI/Fields/PhoneField.vue";
import PasswordField from "../../UI/Fields/PasswordField.vue";
import ButtonAvatar from "../../UI/Buttons/ButtonAvatar.vue";
import Message from "../../UI/main/Message.vue";
import Layout from "../../layout.vue";
import errorShow from "../../../mixins/errorShow";
import * as constants from "../../../utils/constants";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "Profile",
  components: {
    FontAwesomeIcon,
    Layout,
    Message,
    ButtonAvatar,
    Sidebar,
    Navbar,
    ButtonBlue,
    ButtonWhite,
    ButtonDefault,
    TextField,
    SelectField,
    NumberField,
    PhoneField,
    PasswordField,
  },
  mixins: [
    errorShow,
  ],
  computed: {
    ...mapGetters('user', {
      getUserFullName: 'getUserFullName',
    }),
    ...mapGetters('reports', {
      message: 'getMessage',
    }),
    ...mapState('user', {
      user: state => state.user,
      email: state => state.user.email,
      gender: state => state.user.gender
    }),
    getAvatarUrl() {
      return this.$store.state.user.avatarUrl;
    },
    genders() {
      return GENDERS;
    },
    max() {
      return new Date().toISOString().split('T')[0];
    },
  },
  data() {
    return {
      componentKey: 0,
      password: '',
      fields: ['avatar', 'name', 'surname', 'email', 'gender', 'phoneNumber', 'password'],
      cars: [
        {
          id: 1,
          mainPhoto: 'public/images/cars/dodge_challenger.webp',
          displayName: 'Dodge Challenger SRT Hellcat 2023',
          sellerId: 2,
          bodyType: 'Купе',
          price: '80000',
          manufacturer: 'Dodge',
          vinCode: '12sdvbrhu4235246',
          priceCurrency: '€',
          wasInAccident: 'No',
          isTrade: 'No',
          isAvailable: 'Yes',
          mileage: '0',
          technicalCondition: 'New'
        },
        {
          id: 2,
          mainPhoto: 'public/images/cars/dodge_charger.avif',
          displayName: 'Dodge Charger 2021',
          sellerId: 2,
          bodyType: 'Седан',
          price: '69995',
          manufacturer: 'Dodge',
          vinCode: '434456wf43',
          priceCurrency: '$',
          wasInAccident: 'No',
          isTrade: 'No',
          isAvailable: 'Yes',
          mileage: '2000',
          technicalCondition: 'Good'
        },
        {
          id: 3,
          mainPhoto: 'public/images/cars/vito.jpg',
          displayName: 'Mercedes-Benz Vito 1996',
          sellerId: 2,
          bodyType: 'Автобус',
          price: '250000',
          manufacturer: 'Mercedes-Benz',
          vinCode: '2463735fgv',
          priceCurrency: '₴',
          wasInAccident: 'Yes',
          isTrade: 'Yes',
          isAvailable: 'Yes',
          mileage: '999000',
          technicalCondition: 'Bad'
        }
      ]

    };
  },
  watch: {
    'user.gender'(newGender) {
      this.updateAvatarBasedOnGender(newGender);
    }
  },
  methods: {
    ...mapActions('user', {
      onGetUser: 'onGetUser',
      onUpdateUser: 'onUpdateUser',
      onUpdateEmail: 'onUpdateEmail',
      onUpdateDefaultAvatar: 'onUpdateDefaultAvatar',
    }),
    updateAvatarBasedOnGender(newGender) {
      this.onUpdateDefaultAvatar({gender: newGender});
    },
    ...mapState('car', {
      cars: state => state.cars,
    }),
    constants() {
      return constants
    },
    updateUser() {
      this.onUpdateUser(this.user);
    },
    updateEmail() {
      this.onUpdateEmail({
        newEmail: this.email
      })
    },
    clickAvatar() {
      this.$refs.fileInput.click();
    },
    changeAvatar(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('avatar', file);
      // this.onUpdateAvatar(formData);
    },
  },
  created() {
    this.onGetUser();
  },
}
</script>