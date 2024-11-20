<template>
  <nav class="sidebar">
    <logo/>
    <form
        action="#"
        @submit.prevent="submit($event)"
    >
      <!--      <h6 class="mt-3">Реєстрація особистого кабінету</h6>-->
      <div class="row g-2 py-md-2">
        <div class="col-md">
          <select-field
              :options="types"
              :label="$t('car.type')"
          />
        </div>
        <div class="col-md">
          <select-field
              :options="brands"
              :label="$t('car.brand')"
          />
        </div>
      </div>
      <div class="row g-2 py-md-2 py-sm-2">
        <div class="col-md">
          <select-field
              :options="models"
              :label="$t('car.model')"
          />
        </div>
        <div class="col-md">
          <select-field
              :options="regions"
              :label="$t('car.region')"
          />
        </div>
      </div>
      <div class="row g-2 py-md-2">
        <div class="col-md">
          <date-field
              label="Рік випуску"
              type="date"
          />
        </div>
        <div class="col-md">
          <text-field
              label="Ціна"
          />
        </div>
      </div>
      <div class="d-flex flex-column align-items-center">
        <button-white
            classes="btn btn-outline-primary mt-3 mb-2 max-w-200 w100"
            label="Пошук"
            type="submit"
        />
        <hr>
      </div>
    </form>
  </nav>
</template>

<script>

import Logo from "@/components/UI/main/Logo.vue";
import SelectField from "@/components/UI/Fields/SelectField.vue";
import {BRANDS, MODELS, REGIONS, TYPES} from "@/utils/enums.js";
import PasswordField from "@/components/UI/Fields/PasswordField.vue";
import PhoneField from "@/components/UI/Fields/PhoneField.vue";
import DateField from "@/components/UI/Fields/DateField.vue";
import ButtonWhite from "@/components/UI/Buttons/ButtonWhite.vue";
import TextField from "@/components/UI/Fields/TextField.vue";

export default {
  name: "Sidebar",
  components: {
    TextField,
    ButtonWhite,
    DateField,
    PhoneField,
    PasswordField,
    SelectField,
    Logo
  },
  computed: {
    types() {
      return TYPES;
    },
    brands() {
      return BRANDS;
    },
    models() {
      return MODELS;
    },
    regions() {
      return REGIONS;
    },
  },
  data() {
    return {};
  },
  methods: {
  },
}
</script>