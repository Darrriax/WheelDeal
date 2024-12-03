<template>
  <nav class="sidebar">
    <logo/>
    <form class="row" @submit.prevent>
      <div class="row g-2">
        <div class="col-md col-6">
          <select-field
              :options="types"
              :label="$t('car.type')"
              v-model="searchParams.bodyType"
          />
        </div>
        <div class="col-md col-6">
          <select-field
              :options="manufacturers"
              :label="$t('car.manufacturer')"
              v-model="searchParams.manufacturer"
          />
        </div>
      </div>
      <div class="row g-2">
        <div class="col-md col-6">
          <number-field
              :options="mileage"
              :label="$t('car.mileageFrom')"
              v-model="searchParams.mileageFrom"
          />
        </div>
        <div class="col-md col-6">
          <number-field
              :options="mileage"
              :label="$t('car.mileageTo')"
              v-model="searchParams.mileageTo"
          />
        </div>
      </div>
      <div class="row g-2">
        <div class="col-md col-6">
          <number-field
              :label="$t('car.priceFrom')"
              v-model="searchParams.priceFrom"
          />
        </div>
        <div class="col-md col-6">
          <number-field
              :label="$t('car.priceTo')"
              v-model="searchParams.priceTo"
          />
        </div>
      </div>
      <div class="d-flex flex-column align-items-center">
        <button-blue
            @click="search"
            :label="$t('ui.search')"
            classes="w100 max-w-200 m-b-15 m-t-15 m-l-auto m-r-auto"
            type="submit"
        />
      </div>
    </form>
    <div class="pagination">
      <button-blue
          icon="fa-arrow-left"
          class="btn-small-width"
          :disabled="searchParams.page === 0"
          @click="previousPage"
      />
      <button-blue
          icon="fa-arrow-right"
          class="btn-small-width"
          @click="nextPage"
      />
    </div>
  </nav>
</template>

<script>
import Logo from "../../../components/UI/main/Logo.vue";
import SelectField from "../../../components/UI/Fields/SelectField.vue";
import {MANUFACTURERS, TYPES} from "../../../utils/enums.js";
import ButtonBlue from "../../../components/UI/Buttons/ButtonBlue.vue";
import Toggle from "../../../components/UI/Fields/Toggle.vue";
import NumberField from "../../../components/UI/Fields/NumberField.vue";
import TextField from "@/components/UI/Fields/TextField.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Sidebar",
  components: {
    TextField,
    Toggle,
    NumberField,
    ButtonBlue,
    SelectField,
    Logo,
  },
  data() {
    return {
      searchParams: {
        manufacturer: '',
        bodyType: '',
        priceFrom: '',
        priceTo: '',
        mileageFrom: '',
        mileageTo: '',
        displayName: '',
        page: 0, // Початкове значення сторінки
        size: 10, // Розмір сторінки за замовчуванням
      },
      totalResults: 0, // Загальна кількість результатів
    };
  },
  computed: {
    types() {
      return TYPES;
    },
    manufacturers() {
      return MANUFACTURERS;
    },
    ...mapGetters('car', {
      getNext: 'getNext',
    }),
  },
  methods: {
    ...mapActions('car', {
      onSearchCars: 'onSearchCars',
    }),
    search() {
      this.onSearchCars(this.searchParams);
    },
    nextPage() {
      if (this.getNext) {
        this.searchParams.page += 1; // Збільшуємо номер сторінки
        this.search(); // Виконуємо пошук
      }
    },
    previousPage() {
      if (this.searchParams.page > 0) {
        this.searchParams.page -= 1; // Зменшуємо номер сторінки
        this.search(); // Виконуємо пошук
      }
    },
  },
};
</script>