<template>
  <auth-layout>
    <div class="card col-md-8 col-sm-11 col-lg-5 col-xxl-5 m-auto text-center">
      <form
          action="#"
          class="authBox card-body register"
          @submit.prevent="submit($event)"
      >
        <logo/>
        <h6 class="mt-3">Реєстрація особистого кабінету</h6>
        <div class="row g-2 py-md-2">
          <div class="col-md">
            <text-field
                id="name"
                label="Ім'я"
                v-model="name"
                :error="error['name']"
            />
          </div>
          <div class="col-md">
            <text-field
                id="surname"
                label="Прізвище"
                v-model="surname"
                :error="error['surname']"
            />
          </div>
        </div>
        <div class="row g-2 py-md-2 py-sm-2">
          <div class="col-md">
            <text-field
                id="email"
                label="Пошта"
                v-model="email"
                :error="error['email']"
            />
          </div>
          <div class="col-md">
            <phone-field
                id="phone"
                label="Телефон"
                v-model="phone"
                :error="error['phone']"
            />
          </div>
        </div>
        <div class="row g-2 py-md-2">
          <div class="col-md">
            <select-field
                v-model="gender"
                :value="gender"
                :options="genders"
                label="Гендер"
                :error="error['gender']"
            />
          </div>
          <div class="col-md">
            <date-field
                label="День народження"
                v-model="birthday"
                type="date"
                :max="max"
                :error="error['birthday']"
            />
          </div>
        </div>
        <div class="row g-2 py-md-2 py-sm-2">
          <div class="col-md">
            <password-field
                id="password"
                label="Пароль"
                v-model="password"
                :error="error['password']"
            />
          </div>
          <div class="col-md">
            <password-field
                id="confirm_password"
                label="Підтвердити пароль"
                v-model="password_confirmation"
                :error="error['password_confirmation']"
            />
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <button-white
              classes="btn btn-outline-primary mt-3 mb-2 max-w-200 w100"
              label="Створити аккаунт"
              type="submit"
          />
          <hr>
          <span>Вже маєте аккаунт?
              <router-link
                  to="/login"
                  class="text-decoration-none"
              >
                Вхід
              </router-link>
            </span>
        </div>
      </form>
    </div>
    <message :label="message"/>
  </auth-layout>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Message from "../../UI/main/Message.vue";
import TextField from "../../UI/Fields/TextField.vue";
import PasswordField from "../../UI/Fields/PasswordField.vue";
import PhoneField from "../../UI/Fields/PhoneField.vue";
import ButtonWhite from "../../UI/Buttons/ButtonWhite.vue";
import errorShow from "../../../mixins/errorShow";
import {GENDERS} from "../../../utils/enums";
import SelectField from "../../../components/UI/Fields/SelectField.vue";
import DateField from "../../UI/Fields/NumberField.vue";
import AuthLayout from "../../UI/ComponentLayouts/AuthLayout.vue";
import Logo from "@/components/UI/main/Logo.vue";

export default {
  name: "registration",
  components: {
    Logo,
    DateField,
    SelectField,
    Message,
    TextField,
    PasswordField,
    PhoneField,
    ButtonWhite,
    AuthLayout,
  },
  mixins: [
    errorShow,
  ],
  computed: {
    ...mapGetters('reports', {
      message: 'getMessage',
    }),
    genders() {
      return GENDERS;
    },
    max() {
      return new Date().toISOString().split('T')[0];
    },
  },
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      phone: '',
      gender: '',
      birthday: '',
      password: '',
      password_confirmation: '',
      // fields with verification
      fields: ['name', 'surname', 'email', 'phone', 'gender', 'password', 'password_confirmation'],
    }
  },
  methods: {
    ...mapActions('auth', {
      onRegister: 'onRegister',
      onSanctum: 'onSanctum',
    }),
    submit() {
      if (!this.isLoggedIn) {
        this.onRegister({
          name: this.name,
          surname: this.surname,
          email: this.email,
          phone: this.phone,
          gender: this.gender,
          birthday: this.birthday,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
      }
    },
  },
  created() {
    this.onSanctum();
  }
}
</script>
