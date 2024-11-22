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
                    v-model="user.birthday"
                    type="date"
                    :max="max"
                    :error="error['birthday']"
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

export default {
  name: "Profile",
  components: {
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