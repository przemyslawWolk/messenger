<template>
  <textarea
    :value="modelValue"
    ref="textarea"
    rows="1"
    placeholder="Type your message here..."
    @input="handleInput"
    @keydown="handleKeyDown"
  />
</template>

<script>
export default {
  emits: ["update:modelValue", "sendMessage"],
  props: {
    modelValue: String,
  },
  watch: {
    modelValue() {
      // no idea why, but this should properly shrink the textarea after submitting
      this.formatTextArea();
    },
  },
  methods: {
    handleInput(event) {
      // every input activates formatting the size of textarea.
      // I'm sure there are better ways, but no time to do this.
      this.$emit("update:modelValue", event.target.value);
      this.formatTextArea();
    },
    handleKeyDown(event) {
      // emits the message by clicking Enter only, without shift
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        this.$emit("sendMessage");
      }
    },
    formatTextArea() {
      // not the most elegant way, but I have no time for this detail
      const textarea = this.$refs.textarea;
      textarea.rows = 1;

      while (
        textarea.scrollHeight > textarea.clientHeight &&
        textarea.rows < 3
      ) {
        textarea.rows++;
      }

      textarea.style.overflowY =
        textarea.scrollHeight > textarea.clientHeight ? "scroll" : "hidden";
    },
  },
};
</script>

<style lang="less" scoped>
.compose-section {
  textarea {
    width: 100%;
    overflow: hidden;
    resize: none;
    flex-grow: 1;
    margin-right: 12px;
    border: 1px solid #ccc;
    resize: none;
  }
}
</style>
