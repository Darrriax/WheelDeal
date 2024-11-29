<template>
  <nav class="sidebar">
    <logo/>
    <form class="row" @submit.prevent>
      <div class="row g-2">
        <div class="col-md col-6">
          <select-field
              :options="types"
              :label="$t('car.type')"
          />
        </div>
        <div class="col-md col-6">
          <select-field
              :options="manufacturers"
              :label="$t('car.manufacturer')"
          />
        </div>
      </div>
      <div class="row g-2">
        <div class="col-md col-6">
          <select-field
              :options="technical_conditions"
              :label="$t('car.technicalCondition')"
          />
        </div>
        <div class="col-md col-6">
          <select-field
              :options="mileage"
              :label="$t('car.mileage')"
          />
        </div>
      </div>
      <div class="row g-2">
        <div class="col-8">
          <number-field
              :label="$t('car.price')"
          />
        </div>
        <div class="col-4">
          <select-field
              :options="currencies"
              :label="$t('car.currency')"
          />
        </div>
      </div>
      <div class="row g-2">
        <toggle :label="$t('car.accident')"/>
        <toggle :label="$t('car.trade')"/>
      </div>
      <div class="d-flex flex-column align-items-center">
        <button-blue
            @click="postData()"
            :label="$t('ui.search')"
            classes="w100 max-w-200 m-b-15 m-t-15 m-l-auto m-r-auto"
            type="submit"
        />
        <hr>
      </div>
    </form>
  </nav>
</template>

<script>

import Logo from "../../../components/UI/main/Logo.vue";
import SelectField from "../../../components/UI/Fields/SelectField.vue";
import {CONDITIONS, CURRENCIES, MANUFACTURERS, MILEAGE, TYPES} from "../../../utils/enums.js";
import PasswordField from "../../../components/UI/Fields/PasswordField.vue";
import PhoneField from "../../../components/UI/Fields/PhoneField.vue";
import DateField from "../../../components/UI/Fields/NumberField.vue";
import TextField from "../../../components/UI/Fields/TextField.vue";
import ButtonBlue from "../../../components/UI/Buttons/ButtonBlue.vue";
import Toggle from "../../../components/UI/Fields/Toggle.vue";
import NumberField from "../../../components/UI/Fields/NumberField.vue";

export default {
  name: "Sidebar",
  components: {
    Toggle,
    NumberField,
    TextField,
    ButtonBlue,
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
    manufacturers() {
      return MANUFACTURERS;
    },
    technical_conditions() {
      return CONDITIONS;
    },
    mileage() {
      return MILEAGE;
    },
    currencies() {
      return CURRENCIES;
    }
  },
  data() {
    return {};
  },
  methods: {},
}
</script>