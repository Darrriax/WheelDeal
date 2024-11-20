<template>
  <div class="input_group form-floating" ref="dropdownContainer">
    <div class="v-select vs--single vs--searchable form-control h-auto">
      <input
          class="vs__selected"
          :class="[classes, error ? 'form-control-error' : '']"
          v-model="userInput"
          @click="toggleDropdown"
          @input="filterOptions"
          @keydown.enter="submitValue($event, userInput)"
          :placeholder="placeholder"
      >
      <div v-if="showDropdown" class="vs__dropdown-menu">
        <div
            v-for="(option, index) in filteredOptions.slice(0, 4)"
            :key="index"
            @click="selectOption(option)"
            class="vs__dropdown-option">
          {{ option }}
        </div>
      </div>
    </div>
    <label :class="[error ? 'text-danger' : '']" class="form-label label_text">
      {{ label }}
    </label>
    <small v-show="error" class="text-danger error font-xs-400">
      <sup>*</sup>{{ error }}
    </small>
  </div>
</template>

<script>
export default {
  name: "InputOrSelectField",
  props: {
    options: {type: Array, required: true},
    classes: {type: String, required: false},
    label: {type: String, required: true},
    value: {type: [Number, String], required: false},
    placeholder: {type: String, default: 'Нічого не вибрано'},
    error: {type: String, default: ''},
  },
  data() {
    return {
      showDropdown: false,
      userInput: this.value || '',
      filteredOptions: this.options,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    handleClickOutside(event) {
      if (
          this.$refs.dropdownContainer &&
          !this.$refs.dropdownContainer.contains(event.target)
      ) {
        this.showDropdown = false;
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        this.filteredOptions = this.options;
      }
    },
    selectOption(option) {
      this.userInput = option;
      this.showDropdown = false;
      this.$emit('update:modelValue', option);
    },
    submitValue(event, value) {
      this.$emit('submit', event);
      this.$emit('update:modelValue', value);
    },
    filterOptions() {
      const matchingOptions = this.options.filter(option =>
          option.toLowerCase().includes(this.userInput.toLowerCase())
      );

      if (matchingOptions.length === 0) {
        this.$emit('update:modelValue', this.userInput);
      } else {
        this.filteredOptions = matchingOptions;
      }
    },

  },
};
</script>

<style scoped>
.form-floating > .form-control:focus,
.form-floating > .form-control:not(:placeholder-shown),
.form-floating > .form-control-plaintext:focus,
.form-floating > .form-control-plaintext:not(:placeholder-shown) {
  padding-top: 1.525rem;
  padding-bottom: 0.625rem;
}

.dropdown-options {
  border: 1px solid #ccc;
  max-height: 100px;
  overflow-y: auto;
}

.dropdown-options div {
  padding: 5px;
  cursor: pointer;
}
</style>