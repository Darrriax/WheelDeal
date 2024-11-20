<template>
  <div class="input_group form-floating">
    <v-select
        class="form-control"
        :class="[classes, error ? 'form-control-error' : '']"
        :options="options"
        :label="reduceLabel"
        :value="value"
        :placeholder="placeholder"
        v-model="selectedValue"
        :reduce="item => item[reduceKey]"
        @input="$emit('update:modelValue', $event.target.value)"
    >
      <span slot="no-options">Співпадіння відсутні</span>
    </v-select>
    <label
        :class="[error ? 'text-danger' : '']"
        class="form-label label_text"
        :for="id"
    >
      {{ label }}
    </label>
    <small
        v-show="error"
        class="text-danger error font-xs-400"
    >
      <sup>*</sup>{{ error }}
    </small>

  </div>
</template>

<script>
import vSelect from 'vue-select'
import "vue-select/dist/vue-select.css";

export default {
  props: {
    options: {type: Array, required: true},
    classes: {type: String, required: false},
    label: {type: String, required: true},
    value: {type: [Number, String], required: false},
    reduceLabel: {type: String, default: 'name'},
    reduceKey: {type: String, default: 'id'},
    id: {type: String, required: false},
    placeholder: {type: String, default: 'Нічого не вибрано'},
    error: {type: String, default: ''},
  },
  components: {
    vSelect
  },
  data() {
    return {
      selectedValue: '',
    };
  },
  created() {
    this.selectedValue = this.value;
  },
};
</script>
<style>
.form-control .vs__actions {
  padding-right: 2.5px;
  padding-top: 5px;
}
.form-control .vs__clear {
  padding-bottom: 4px;
}

.form-control .vs__dropdown-toggle,
.form-control .vs__dropdown-menu,
.form-control .vs__selected-options,
.form-control .vs__search,
.form-control .vs__selected {
  /*background: #dfe5fb;*/
  /*border: none;*/
  /*color: #394066;*/
  /*text-transform: lowercase;*/
  /*font-variant: small-caps;*/
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  border: none;
}
.form-control .vs__dropdown-toggle {
  margin-top: -4px;
}
.form-control .vs__dropdown-option {
  margin-left: -8px;
}

.form-floating > .form-control:focus, .form-floating > .form-control:not(:placeholder-shown), .form-floating > .form-control-plaintext:focus, .form-floating > .form-control-plaintext:not(:placeholder-shown) {
  padding-top: 1.525rem;
  padding-bottom: 0.625rem;
}
</style>