<template>
  <div>
    <div class="row row-cols-md-4 row-cols-sm-1 justify-content-start">
      <span class="p-b-15">{{ $t('ui.date_format') }} {{ formatLabel }}:</span>
      <div v-for="date in this.types_of_date" :key="this.types_of_date.id">
        <div @click="checkDateType($event, date, true)">
          <custom-toggle
              :label="$t(date.text)"
              v-model="date.checked"
              :is-disabled="date.checked"
          />
        </div>
      </div>
    </div>
    <div class="row row-cols-md-3 row-cols-1 justify-content-start">
      <date-field
          v-model="computed_dateValue"
          :label="(dateFieldLabelType === 'birthday') ? $t(selectedDate.birthday_text) : $t(selectedDate.deathdate_text)"
          :type="selectedDate.type"
          :placeholder="selectedDate.placeholder"
          :min="selectedDate.min"
          :max="selectedDate.max"
          :error="(dateFieldLabelType === 'birthday') ? error['birthday'] : error['deathdate']"
      />
      <select-field
          v-model="computed_countryId"
          classes="h-auto"
          :value="computed_countryId"
          :options="countries"
          :label="countryLabel"
      />
      <input-or-select-field
          v-model="computed_placeValue"
          :value="computed_placeValue"
          :options="location"
          :label="placeLabel"
      />
    </div>
  </div>
</template>

<script>
import {DATES} from "../../../utils/enums";
import Toggle from "./Toggle.vue";
import CustomToggle from "./CustomToggle.vue";
import DateField from "./NumberField.vue";
import SelectField from "./SelectField.vue";
import TextField from "./TextField.vue";
import {mapActions, mapState} from "vuex";
import errorShow from "../../../mixins/errorShow";
import InputOrSelectField from "../../../components/UI/Fields/InputOrSelectField.vue";

export default {
  components: {
    InputOrSelectField,
    Toggle,
    CustomToggle,
    DateField,
    SelectField,
    TextField,
  },
  mixins: [
    errorShow,
  ],
  props: {
    dateValue: {type: String, required: false},
    countryId: {type: [String, Number], required: false},
    placeValue: {type: String, required: false},

    formatLabel: {type: String, required: false},
    dateFieldLabelType: {type: String, required: true},
    countryLabel: {type: String, required: true},
    placeLabel: {type: String, required: true},
  },
  computed: {
    computed_dateValue: {
      get() {
        return this.dateValue;
      },
      set(newValue) {
        this.setData('dateValue', newValue);
      },
    },
    computed_countryId: {
      get() {
        return this.countryId;
      },
      set(newValue) {
        this.setData('countryId', newValue);
      },
    },
    computed_placeValue: {
      get() {
        return this.placeValue;
      },
      set(newValue) {
        this.setData('placeValue', newValue);
      },
    },
    ...mapState('person/countries', {
      countries: state => state.countries,
    }),
    ...mapState('trees', {
      location: state => state.tree.locations,
    }),
    types_of_date() {
      return JSON.parse(JSON.stringify(DATES));
    },
  },
  methods: {
    ...mapActions('person/countries', {
      onGetCountries: 'onGetCountries',
    }),
    setData(field, value) {
      this.$emit('update:' + field.toString(), value);
    },
    loadCountries() {
      this.onGetCountries();
    },
    setDataCheckStatus(id) {
      for (let i = 0; i < this.types_of_date.length; i++) {
        this.types_of_date[i].checked = this.types_of_date[i].id === id;
      }
    },
    checkDateType(e, date) {
      this.$emit('update:dateType', date.id);
      this.selectedDate = date;
      // for (let i = 0; i < this.types_of_date.length; i++) {
      //   this.types_of_date[i].checked = this.types_of_date[i].id === date.id;
      // }
      this.setDataCheckStatus(date.id);
    },
    setDataType() {
      if (this.computed_dateValue?.length === 4) return 2;
      if (this.computed_dateValue?.length === 7) return 1;
      // if(!this.dateValue || this.dateValue.length === 10) return 0;
      return 0;
    },
  },
  data: () => {
    return {
      selectedDate: null,
      types_of_date_key: 0,
      fields: ['birthday', 'deathdate'],
    }
  },
  watch: {
    selectedDate: function () {
      this.types_of_date_key++;
    },
  },
  created() {
    this.loadCountries();
    const dataType = this.setDataType();
    this.selectedDate = this.types_of_date[dataType];
    this.setDataCheckStatus(dataType + 1);
  }
}
</script>

<style scoped>

</style>