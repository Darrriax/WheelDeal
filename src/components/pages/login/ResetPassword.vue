<template>
  <auth-layout>
    <div class="card col-md-8 col-sm-11 col-lg-4 col-xxl-3 m-auto text-center">
      <form
          action="#"
          class="card-body"
          @submit.prevent="submit($event)"
      >
        <img
            src="/images/logo.png"
            class="w100 max-w-150 p-b-15"
            alt="Logo"
        />
        <h6 class="mt-3">Відновлення паролю</h6>
        <div class="mt-4">
          <div class="mb-3">
            <text-field
                id="password"
                label="Новий пароль"
                v-model="password"
                :error="error['password']"
            />
          </div>
          <div class="mb-3">
            <text-field
                id="password_confirmation"
                label="Підтвердження паролю"
                v-model="password_confirmation"
                :error="error['password_confirmation']"
            />
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <button-white
              classes="btn btn-outline-primary mt-3 mb-2 w100 max-w-200"
              label="Підтвердити"
              type="submit"
          />
          <hr>
          <span>Повернутися на
              <router-link
                  to="/login"
                  class="text-decoration-none"
              >
                 сторінку входу
              </router-link>
            </span>
          <hr>
          <span>Немає аккаунта?
              <router-link
                  to="/registration"
                  class="text-decoration-none"
              >
                Зареєструватися
              </router-link>
            </span>
        </div>
      </form>
    </div>
    <message :label="message"/>
  </auth-layout>
</template>

<script>
import Message from "../../UI/main/Message.vue";
import TextField from "../../UI/Fields/TextField.vue";
import PasswordField from "../../UI/Fields/PasswordField.vue";
import ButtonWhite from "../../UI/Buttons/ButtonWhite.vue";
import {mapActions, mapGetters} from "vuex";
import errorShow from "../../../mixins/errorShow";
import router from "../../../router";
import AuthLayout from "../../UI/ComponentLayouts/AuthLayout.vue";
import urls from "../../../mixins/urls";

export default {
  name: "resetPassword",
  components: {
    Message,
    TextField,
    PasswordField,
    ButtonWhite,
    AuthLayout,
  },
  mixins: [
    errorShow,
    urls,
  ],
  computed: {
    ...mapGetters('reports', {
      message: 'getMessage',
    }),
  },
  data() {
    return {
      token: '',
      email: '',
      password: '',
      password_confirmation: '',
      // fields with verification
      fields: ['password', 'password_confirmation'],
    }
  },
  methods: {
    ...mapActions('auth', {
      onResetPassword: 'onResetPassword',
    }),
    ...mapActions('reports', {
      showMessage: 'showMessage',
    }),
    submit() {
      this.onResetPassword({
        token: this.token,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      });
    },
  },
  mounted() {
    const token = this.getUrlParam('token');
    const email = this.getUrlParam('email');

    if (token && email) {
      this.token = token;
      this.email = email;
    } else {
      router.push('/forgot-password');
      this.showMessage('Невказаний токен або пошта. Спробуйте ще раз');
    }
  }
};
</script>