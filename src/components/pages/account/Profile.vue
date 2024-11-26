<template>
  <layout>
    <div class="px-3 col-12" id="profile" :key="componentKey">
      <div class="row">
        <div class="white_card no-border-right justify-content-center col-md-12 col-lg-12 col-xl-3">
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
            <div class="gray-text">{{ getUserEmail }}</div>
          </div>
        </div>
        <div class="white_card no-border-radius no-border-top info col-md-12 col-lg-8 col-xl-6">
          <h5 class="py-3 text-center">{{ $t('profile.title') }}</h5>
          <form class="mx-0 row row-cols-md-2 row-cols-sm-1" @submit.prevent="updateUser($event)">
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
                  v-model="user.father_name"
              />
            </div>
            <div>
              <div class="w100">
                <number-field
                    :label="$t('profile.age')"
                    v-model="user.age"
                    type="date"
                    :max="max"
                    :error="error['age']"
                />
                <select-field
                    v-model="user.gender"
                    :value="user.gender"
                    :options="genders"
                    :label="$t('profile.gender')"
                    :error="error['gender']"
                />
                <password-field
                    :label="$t('profile.password')"
                    v-model="user.password"
                    :error="error['current_password']"
                />
              </div>
            </div>
            <div class="w100">
              <text-field
                  :label="$t('profile.additional_info')"
                  v-model="user.additional_info"
              />
            </div>
          </form>
        </div>
        <div class="white_card no-border-left col-md-12 col-lg-4 col-xl-3">
          <h5 class="py-3 text-center">{{ $t('profile.connect') }}</h5>
          <form class="row password_change p-0" @submit.prevent="changePassword($event)">
            <div>
              <div class="p-0 position-relative">
                <text-field
                    :label="$t('profile.email')"
                    v-model="user.email"
                    :error="error['email']"
                />
              </div>
              <phone-field
                  :label="$t('profile.phone')"
                  v-model="user.phone_number"
                  :error="error['phone']"
              />
              <button-white
                  classes="mb-2 w100 m-t-15"
                  :label="$t('ui.save')"
                  icon="fa-solid fa-save"
                  type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      <h5 class="py-3 text-center">{{ $t('profile.cars') }}</h5>
      <div class="p-0 white_card justify-content-between px-4 py-0 single-card-box-shadow" v-for="car in cars">
        <div class="row displayFlex align-items-center justify-content-center h-100">
          <div class="col-md-3 col-sm-12">
            <img
                :src="car.main_photo || constants().DEFAULT_CAR_IMG"
                alt="Car"
                class="car-main-image"
            >
          </div>
          <div class="col-md-9 col-sm-12 row">
            <div class="col-9 p-0 m-0">
              <h3 class="card-title textBold p-2">{{ car.display_name }}</h3>
            </div>
            <div class="col-3 end-0 p-0 m-0">
              <h5 class="card-price textBold p-2 textRight">{{ car.price }} <b
                  style="color: var(--background-ligth-blue)">{{ car.price_currency }}</b></h5>
            </div>
            <div class="row row-cols-2 col-6 row">
              <div class="col car-info"><font-awesome-icon icon="fa-solid fa-car-side"/>{{ $t('car.type') }}:</div>{{ car.body_type}}
              <div class="col car-info"><font-awesome-icon icon="fa-solid fa-car"/>{{ $t('car.manufacturer') }}</div>{{ car.manufacturer}}
              <div class="col car-info"><font-awesome-icon icon="fa-solid fa-square-check"/>{{ $t('car.vin_code') }}</div>{{ car.vin_code}}
              <div class="col car-info"><font-awesome-icon icon="fa-solid fa-road"/>{{ $t('car.mileage') }}</div>{{ car.mileage}}
            </div>
            <div class="row row-cols-2 col-6 row m-0 p-0">
              <div class="col car-info"><font-awesome-icon icon="fa-solid fa-screwdriver-wrench"/>{{ $t('car.technical_condition') }}</div>{{ car.technical_condition}}
              <div class="col car-info"><font-awesome-icon icon="fa-solid fa-car-burst"/>{{ $t('car.accident') }}</div>{{ car.was_in_accident}}
              <div class="col car-info"><font-awesome-icon icon="fa-solid fa-hand-holding-dollar"/>{{ $t('car.trade') }}</div>{{ car.is_trade}}
              <div class="col car-info"><font-awesome-icon icon="fa-solid fa-thumbs-up"/>{{ $t('car.available') }}</div>{{ car.is_available}}
            </div>
          </div>
          <!--          <div class="car-description gray-text row row-cols-2">-->
          <!--            <div class="car-statistics col-md-8 col-sm-12">-->
          <!--              <div class="py-2 text-nowrap text-stat">-->
          <!--                <div class="row row-cols-3 display-5 fw-semibold align-items-end text-center">-->
          <!--                  &lt;!&ndash;                    <div class="col">{{ car.people_count }}</div>&ndash;&gt;-->
          <!--                  &lt;!&ndash;                    <div class="col display-3 fw-semibold">{{ car.generations_count }}</div>&ndash;&gt;-->
          <!--                  &lt;!&ndash;                    <div class="col">{{ car.users_count }}</div>&ndash;&gt;-->
          <!--                </div>-->
          <!--                <div class="row row-cols-3 text-center">-->
          <!--                  <div class="col">{{ $t('car.persons') }}</div>-->
          <!--                  <div class="col">{{ $t('car.generations') }}</div>-->
          <!--                  <div class="col">{{ $t('car.users') }}</div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="col-md-12 order-3">-->
          <!--              <div class="d-flex flex-nowrap px-3 py-4 gap-2 car-btns">-->
          <!--                ggg-->
          <!--                &lt;!&ndash;                  <router-link&ndash;&gt;-->
          <!--                &lt;!&ndash;                      v-if="car.permissions?.view_permission === 1"&ndash;&gt;-->
          <!--                &lt;!&ndash;                      :to="'/cars/' + car.id + '/show'"&ndash;&gt;-->
          <!--                &lt;!&ndash;                      class="w100"&ndash;&gt;-->
          <!--                &lt;!&ndash;                  >&ndash;&gt;-->
          <!--                &lt;!&ndash;                    <button-blue&ndash;&gt;-->
          <!--                &lt;!&ndash;                        icon="fa-solid fa-circle-info"&ndash;&gt;-->
          <!--                &lt;!&ndash;                        classes="w100 text-nowrap max-w-200"&ndash;&gt;-->
          <!--                &lt;!&ndash;                        :label="$t('details')"&ndash;&gt;-->
          <!--                &lt;!&ndash;                    />&ndash;&gt;-->
          <!--                &lt;!&ndash;                  </router-link>&ndash;&gt;-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
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
import InvitationCard from "../../../components/UI/Fields/InvitationCard.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "Profile",
  components: {
    FontAwesomeIcon,
    InvitationCard,
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
      isEmailVerified: "isEmailVerified",
      getUserEmail: 'getUserEmail',
      getUserFullName: 'getUserFullName',
    }),
    ...mapGetters('reports', {
      message: 'getMessage',
    }),
    ...mapState('user', {
      user: state => state.user,
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
      current_password: '',
      password_confirmation: '',
      fields: ['avatar', 'name', 'surname', 'email', 'gender', 'phone', 'password', 'current_password'],
      cars: [
        {
          id: 1,
          main_photo: 'public/images/cars/dodge_challenger.webp',
          display_name: 'Dodge Challenger SRT Hellcat 2023',
          seller_id: 2,
          body_type: 'Купе',
          price: '80000',
          manufacturer: 'Dodge',
          vin_code: '12sdvbrhu4235246',
          price_currency: '€',
          was_in_accident: 'No',
          is_trade: 'No',
          is_available: 'Yes',
          mileage: '0',
          technical_condition: 'New'
        },
        {
          id: 2,
          main_photo: 'public/images/cars/dodge_charger.avif',
          display_name: 'Dodge Charger 2021',
          seller_id: 2,
          body_type: 'Седан',
          price: '69995',
          manufacturer: 'Dodge',
          vin_code: '434456wf43',
          price_currency: '$',
          was_in_accident: 'No',
          is_trade: 'No',
          is_available: 'Yes',
          mileage: '2000',
          technical_condition: 'Good'
        },
        {
          id: 3,
          main_photo: 'public/images/cars/vito.jpg',
          display_name: 'Mercedes-Benz Vito 1996',
          seller_id: 2,
          body_type: 'Автобус',
          price: '250000',
          manufacturer: 'Mercedes-Benz',
          vin_code: '2463735fgv',
          price_currency: '₴',
          was_in_accident: 'Yes',
          is_trade: 'Yes',
          is_available: 'Yes',
          mileage: '999000',
          technical_condition: 'Bad'
        }
      ]

    };
  },
  watch: {
    gender(newGender) {
      if (!user.state.avatarUrl.includes('ridnya-backend-bucket')) {
        this.updateAvatarBasedOnGender(newGender);
      }
    },
  },
  methods: {
    ...mapActions('user', {
      onGetUser: 'onGetUser',
      onUpdateUser: 'onUpdateUser',
      onUpdatePassword: 'onUpdatePassword',
      onUpdateAvatar: 'onUpdateAvatar',
      onUpdateDefaultAvatar: 'onUpdateDefaultAvatar',
    }),
    ...mapActions('auth', {
      onNotify: 'onNotify',
    }),
    ...mapState('car', {
      cars: state => state.cars,
    }),
    constants() {
      return constants
    },
    updateUser() {
      this.onUpdateUser(this.user);
    },
    changePassword() {
      this.onUpdatePassword({
        current_password: this.current_password,
        password: this.password,
        password_confirmation: this.password_confirmation,
      }).then(() => {
        event.target.reset()
      });
    },
    clickAvatar() {
      this.$refs.fileInput.click();
    },
    changeAvatar(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('avatar', file);
      this.onUpdateAvatar(formData);
    },
    updateAvatarBasedOnGender(newGender) {
      this.onUpdateDefaultAvatar({
        gender: newGender,
      });
    },
    notifyVerification() {
      this.onNotify();
    },
  },
  created() {
    this.onGetUser();
  },
}
</script>