<template>
  <div
      class="input_group form-floating"
      :class="blockClasses"
  >
    <input
        class="form-control"
        :class="[classes, error ? 'form-control-error' : '']"
        :type="type"
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :minlength="minlength"
        :max="max"
        :min="min"
        :disabled="disabled"
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
export default {
  props: {
    id: {type: String, required: false},
    type: {type: String, required: false},
    maxlength: {type: String, required: false},
    minlength: {type: String, required: false},
    max: {type: String, required: false},
    min: {type: String, required: false},
    classes: {required: false},
    blockClasses: {required: false},
    modelValue: {type: String, required: false},
    placeholder: {type: String, default: 'placeholder'},
    name: {type: String, default: ''},
    label: {type: String, required: true},
    disabled: {type: Boolean, default: false},
    error: {type: String, default: ''},
  },
  methods: {
    submitValue(event, value) {
      this.$emit('submit', event);
      this.$emit('update:modelValue', value);
    },
  },
}
</script>