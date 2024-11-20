<template>
  <auth-layout>
    <div class="card col-md-8 col-sm-11 col-lg-4 col-xxl-3 m-auto text-center">
      <form
          action="#"
          class="authBox card-body"
          @submit.prevent="submit($event)"
      >
        <logo/>
        <h6 class="mt-3">Увійти до особистого кабінету</h6>
        <div class="row g-2 py-md-2 py-sm-2">
          <text-field
              id="email"
              label="Пошта"
              v-model="email"
              :error="error['email']"
          />
          <password-field
              id="password"
              label="Пароль"
              v-model="password"
              :error="error['password']"
          />
        </div>
        <div class="d-flex flex-column align-items-center">
          <router-link
              to="/forgot-password"
              class="mt-1"
          >
            Забули пароль?
          </router-link>
          <button-white
              classes="btn btn-outline-primary mt-3 mb-2 max-w-200 w100"
              label="Увійти"
              type="submit"
          />
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
import {mapActions, mapGetters, mapState} from "vuex";
import errorShow from "../../../mixins/errorShow";
import AuthLayout from "../../UI/ComponentLayouts/AuthLayout.vue";
import Logo from "@/components/UI/main/Logo.vue";

export default {
  name: "login",
  components: {
    Logo,
    Message,
    TextField,
    PasswordField,
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
  },
  data() {
    return {
      email: '',
      password: '',
      // fields with verification
      fields: ['email', 'password'],
    }
  },
  methods: {
    ...mapActions('auth', {
      onLogin: 'onLogin',
      onLoginFacebook: 'onLoginFacebook',
      onSanctum: 'onSanctum',
    }),
    submit() {
      this.onLogin({
        email: this.email,
        password: this.password,
      });
    },
  },
  mounted() {
    this.onSanctum();
  }
};
</script>