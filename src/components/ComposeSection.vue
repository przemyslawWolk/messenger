<template>
  <div class="compose-section">
    <CustomTextArea v-model="message" @sendMessage="sendMessage" />
    <button @click="sendMessage">
      <img src="@/assets/paper-plane.png" alt="Send" />
    </button>
  </div>
</template>

<script>
import CustomTextArea from "./common/CustomTextArea.vue";

export default {
  components: { CustomTextArea },
  emits: ["submit"],
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      // if the message is empty, don't do anything.
      // otherwise, emit the submitted message and then empty the variable
      if (!this.message) return;
      this.$emit("submit", this.message);
      this.message = "";
    },
  },
};
</script>

<style lang="less" scoped>
.compose-section {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
  border-top: 1px solid #ccc;

  button {
    width: 60px;
    height: 40px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 30px;
      height: auto;
    }
  }
}
</style>
