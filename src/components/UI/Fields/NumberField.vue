<template>
  <div class="input_group form-floating">
    <input
        class="form-control"
        type="text"
        :class="classes"
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="validateInput($event)"
        @change="$emit('change', $event.target.value)"
        @keydown.enter="submitValue($event, $event.target.value)"
    />
    <label
        class="form-label label_text"
        :for="id">
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
export default {
  props: {
    id: {type: String, required: false},
    modelValue: {type: [String, Number], required: false},
    classes: {required: false},
    placeholder: {type: String, required: false},
    label: {type: String, required: true},
    disabled: {type: Boolean, default: false},
    error: {type: String, default: ''},
  },
  methods: {
    validateInput(event) {
      // Забрати всі символи, які не є цифрами
      let value = event.target.value.replace(/\D/g, '');

      // Перевірити, чи значення не менше нуля
      if (value < 0) {
        value = '0';
      }

      // Оновити значення в полі
      event.target.value = value;

      // Передати оновлене значення через модель
      this.$emit('update:modelValue', value);
    },
    submitValue(event, value) {
      this.$emit('submit', event);
      this.$emit('update:modelValue', value);
    },
  },
};
</script>