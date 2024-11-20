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
        <div v-if="!emailStatus" class="mt-4">
          <div class="mb-3">
            <text-field
                id="email"
                label="Пошта"
                v-model="email"
                :error="error['email']"
            />
          </div>
          <button-white
              classes="btn btn-outline-primary mt-3 mb-2 w100 max-w-200"
              label="Підтвердити"
              type="submit"
          />
        </div>
        <div v-else class="mt-4">
          <div class="mb-3">
            Лист успішно надіслано на адресу
            <span class="text-decoration-underline">{{ email }}</span>
          </div>
          <div>
            Не отримали лист?
            <button-white
                classes="btn btn-outline-primary my-2 w100 max-w-200"
                label="Надіслати повторно"
                type="submit"
            />
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
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
import AuthLayout from "../../UI/ComponentLayouts/AuthLayout.vue";

export default {
  name: "forgotPassword",
  components: {
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
    ...mapGetters('auth', {
      emailStatus: 'isEmailSent',
    }),
  },
  data() {
    return {
      email: '',
      // fields with verification
      fields: ['email'],
    }
  },
  methods: {
    ...mapActions('auth', {
      onForgotPassword: 'onForgotPassword',
    }),
    submit() {
      this.onForgotPassword({
        email: this.email,
      });
    },
  },
};
</script>