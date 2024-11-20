<template>
  <div class="form-group" :class="{'required': field,'error': err }">
    <vue-editor
        @text-change="handleInput"
        v-model="content"
        :class="classes"
        class="editor_class"
    />
    <small
        v-if="err"
        class="text-danger error font-xs-400"
    >
      <sup>*</sup>{{ error }}
    </small>
  </div>
</template>

<script>
import {VueEditor} from "vue3-editor";

export default {
  props: {
    modelValue: [String, Number],
    classes: [String],
    field: [Object, String],
    error: String,
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      content: this.modelValue || '',
      err: this.error && this.error.length > 0,
    };
  },
  watch: {
    error: function (error) {
      this.err = error && error.length > 0;
    }
  },
  methods: {
    handleInput() {
      this.err = false;
      this.$emit('update:modelValue', this.content);
    },
  },
  created() {
    this.content = this.modelValue ? this.modelValue : '';
    this.err = this.error;
  },
};
</script>
