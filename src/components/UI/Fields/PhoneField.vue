<template>
  <div class="input_group form-floating">
    <input
        class="form-control"
        :class="[classes, error ? 'form-control-error' : '']"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        v-mask="'38(0##)###-##-##'"
        @input="$emit('update:modelValue', $event.target.value)"
        @change="$emit('change', $event.target.value)"
        @keydown.enter="submitValue($event, modelValue)"
    />
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
import {mask} from 'vue-the-mask'

export default {
  props: {
    id: {type: String, required: false},
    modelValue: {type: String, required: false},
    classes: {required: false},
    placeholder: {type: String, default: '38(0__)___-__-__'},
    name: {type: String, default: ''},
    label: {type: String, required: true},
    disabled: {type: Boolean, default: false},
    error: {type: String, default: ''},
  },
  directives: {mask},
  methods: {
    submitValue(event, value) {
      this.$emit('submit', event);
      this.$emit('update:modelValue', value);
    },
  }
}
</script>