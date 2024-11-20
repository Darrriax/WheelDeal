<template>
  <div class="input_group form-floating">
    <select
        class="form-control"
        :class="[classes, error ? 'form-control-error' : '']"
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @change="$emit('change', $event.target.value)"
        @keydown.enter="submitValue"
    >
      <option value="">Відсутня</option>
      <option
          v-for="option in options"
          :value="option"
          :key="option"
      >
        {{option}}
      </option>
    </select>
    <label
        :class="[error ? 'text-danger' : '']"
        class="form-label label_text" :for="id">
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
    classes: {required: false},
    modelValue: {type: String, required: false},
    name: {type: String, default: ''},
    label: {type: String, required: true},
    disabled: {type: Boolean, default: false},
    error: {type: String, default: ''},
    options: {type: Array, required: true}
  },
  methods: {
    submitValue(event, value) {
      this.$emit('submit', event);
      this.$emit('update:modelValue', value);
    },
  },
}
</script>