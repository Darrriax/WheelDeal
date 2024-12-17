<template>
  <layout>
    <div class="px-3 col-12" id="profile" :key="componentKey">
      <div class="row">
        <div
            class="white_card no-border-right justify-content-md-end justify-content-sm-center col-md-12 col-lg-12 col-xl-3"
        >
          <div class="avatar p-t-20" ref="profileContainer">

            <!--            BANNER-->
            <input
                type="file"
                ref="bannerInput"
                style="display: none"
                @change="changeAvatarBackground"
            />
            <avatar-form
                :avatar-background="banner"
                @click="clickBannerImage">
            </avatar-form>
            <button-delete
                @click="deleteBackground"
                class="deleteBackground"
            />

            <!--            AVATAR-->
            <input
                type="file"
                ref="avatarInput"
                style="display: none"
                @change="changeAvatar"
            />
            <button-avatar
                :avatar-url="avatar"
                @click="clickAvatarImage"
                :error="error['avatar']"
            />
            <div class="avatar-photo relative">
              <button-delete
                  @click="deleteAvatar"
                  class="deleteAvatar"
              />
            </div>


            <div class="title-text p-t-10 textCenter">
              {{ getUserFullName }}
            </div>
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
        <form
            class="d-md-block d-sm-block d-lg-flex m-0 p-0 col-md-12 col-lg-12 col-xl-6"
            @submit.prevent="updateUser($event)"
        >
          <div
              class="white_card no-border-radius no-border-top info col-md-12 col-lg-6 col-xl-12"
          >
            <h5 class="py-3 text-center">{{ $t("profile.title") }}</h5>
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
            <h5 class="py-3 text-center">{{ $t("profile.connect") }}</h5>
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
      <button-white
          classes="p-1 py-2 w-100 rounded-start rounded-end"
          :label="$t('ui.add')"
          icon="fa-solid fa-plus-circle"
          type="button"
      />
      <div class="px-3 col-12" id="profile">
        <div v-if="user?.usersCars?.length > 0">
          <h5 class="py-3 text-center">{{ $t("car.myCars") }}</h5>
          <car-box :cars="user.usersCars"/>
        </div>
        <div v-else>
          <box>
            {{ $t("car.noCars") }}
          </box>
        </div>
      </div>
    </div>

    <message :label="message"/>
  </layout>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {GENDERS} from "../../../utils/enums";
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
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Cars from "@/components/pages/car/Cars.vue";
import CarBox from "@/components/pages/car/CarBox.vue";
import Box from "@/components/UI/main/Box.vue";
import AvatarForm from "@/components/UI/Buttons/AvatarForm.vue";
import ButtonDelete from "@/components/UI/Buttons/ButtonDelete.vue";

export default {
  name: "Profile",
  components: {
    ButtonDelete,
    AvatarForm,
    Box,
    CarBox,
    Cars,
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
  mixins: [errorShow],
  computed: {
    ...mapGetters("user", {
      getUserFullName: "getUserFullName",
    }),
    ...mapGetters("reports", {
      message: "getMessage",
    }),
    ...mapState("user", {
      user: (state) => state.user,
      email: (state) => state.user.email,
      gender: (state) => state.user.gender,
      avatar: state => state.avatarUrl,
      banner: state => state.avatarBackground,
    }),
    avatar() {
      return this.$store.state.user.avatarUrl;
    },
    banner() {
      return this.$store.state.user.avatarBackground;
    },
    genders() {
      return GENDERS;
    },
    max() {
      return new Date().toISOString().split("T")[0];
    },
  },
  data() {
    return {
      componentKey: 0,
      password: "",
      fields: [
        "avatar",
        "name",
        "surname",
        "email",
        "gender",
        "phoneNumber",
        "password",
      ],
    };
  },
  watch: {
    "user.gender"(newGender) {
      this.updateAvatarBasedOnGender(newGender);
    },
  },
  methods: {
    ...mapActions("user", {
      onGetUser: "onGetUser",
      onUpdateUser: "onUpdateUser",
      onUpdateEmail: "onUpdateEmail",
      onUpdateDefaultAvatar: "onUpdateDefaultAvatar",
      onDeleteAvatar: "onDeleteAvatar",
      onDeleteBanner: "onDeleteBanner",
      onGetBanner: "onGetBanner",
      onUpdateBanner: "onUpdateBanner",
      onUpdateAvatar: "onUpdateAvatar",
      onGetAvatar: "onGetAvatar"
    }),
    updateAvatarBasedOnGender(newGender) {
      this.onUpdateDefaultAvatar({gender: newGender});
    },
    ...mapState("car", {
      cars: (state) => state.cars,
    }),
    updateUser() {
      this.onUpdateUser(this.user);
    },
    updateEmail() {
      this.onUpdateEmail({
        newEmail: this.email,
      });
    },
    clickAvatarImage() {
      this.$refs.avatarInput.click();
    },
    clickBannerImage() {
      this.$refs.bannerInput.click();
    },
    async changeAvatar(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("imageFile", file);

      try {
        // Спробуємо оновити аватар
        await this.onUpdateAvatar(formData);

        // Якщо успішно, оновлюємо аватар
        setTimeout(async () => {
          await this.onGetAvatar(this.user.id);
          location.reload();
        }, 100);
      } catch (error) {
        // У разі помилки виводимо повідомлення
        alert(
            `${this.$t("profile.avatarUpdateError")} \n` +
            `${this.$t("profile.supportedFormats")}`
        );
      }
    },
    async changeAvatarBackground(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("imageFile", file);

      try {
        // Спробуємо оновити банер
        await this.onUpdateBanner(formData);

        // Якщо успішно, оновлюємо банер
        setTimeout(async () => {
          await this.onGetBanner(this.user.id);
          location.reload();
        }, 100);
      } catch (error) {
        // У разі помилки виводимо повідомлення
        alert(
            `${this.$t("profile.bannerUpdateError")} \n` +
            `${this.$t("profile.supportedFormats")}`
        );
      }
    },
    async deleteAvatar() {
      await this.onDeleteAvatar(); // Видаляє аватар
      await this.onGetAvatar(this.user.id);
      location.reload();
    },
    async deleteBackground() {
      await this.onDeleteBanner(); // Видаляє банер
      await this.onGetBanner(this.user.id);
      location.reload();
    },
  },
  created() {
    this.onGetUser();
    this.onGetBanner(this.user.id);
    this.onGetAvatar(this.user.id);
  },
};
</script>
