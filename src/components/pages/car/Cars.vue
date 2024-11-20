<template>
  <layout>
    <button-avatar
        :avatar-url="getAvatarUrl"
        @click="clickAvatar"
    />

    <text-field
        :label="$t('ui.name')"
        v-model="user.name"
    />
    <text-field
        :label="$t('ui.surname')"
        v-model="user.surname"
    />
    <text-field
        :label="$t('ui.patronymic')"
        v-model="user.patronymic"
    />
    <select-field
        v-model="user.gender"
        :value="user.gender"
        :options="genders"
        label="Гендер"
    />
  </layout>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import errorShow from "@/mixins/errorShow.js";
import {GENDERS} from "@/utils/enums.js";
import ButtonAvatar from "@/components/UI/Buttons/ButtonAvatar.vue";
import TextField from "@/components/UI/Fields/TextField.vue";
import SelectField from "@/components/UI/Fields/SelectField.vue";
import Layout from "@/components/layout.vue";

export default {
  name: "Profile",
  components: {
    Layout,
    SelectField,
    TextField,
    ButtonAvatar
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
      return this.onUpdateDefaultAvatar();
    },
    genders() {
      return GENDERS;
    },
  },
  data() {
    return {
      user: {
        name: "Andrey",
        surname: "Sereda",
        patronymic: "Batkovich",
        gender: "F"
      },
      componentKey: 0,
      password: '',
      current_password: '',
      password_confirmation: '',
      fields: ['avatar', 'name', 'surname', 'email', 'gender', 'phone', 'password', 'current_password'],
    };
  },
  watch: {
  },
  methods: {
    clickAvatar() {
      this.$refs.fileInput.click();
    },
  }
}
</script>