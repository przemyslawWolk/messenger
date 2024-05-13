<template>
  <div id="app">
    <div class="app-container">
      <conversation-area v-if="currentUser" ref="conversationArea" />
      <compose-section @submit="sendReply" />
    </div>
  </div>
</template>

<script>
import ConversationArea from "./components/ConversationArea.vue";
import ComposeSection from "./components/ComposeSection.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    ConversationArea,
    ComposeSection,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.messages.currentUser,
    }),
  },
  created() {
    // fetching the data on app creation
    this.fetchConversation();
    this.fetchCurrentUser();
  },
  methods: {
    ...mapActions("messages", [
      "fetchConversation",
      "fetchCurrentUser",
      "sendMessage",
    ]),
    sendReply(message) {
      // sending the message, handling the error and scrolling to bottom
      this.sendMessage(message).catch((error) => {
        // I'd handle it better, implementing something similar to the error on Messenger, but unfortunately I got out of time.
        alert(error);
      });
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const conversation = this.$refs.conversationArea.$el;
        conversation.scrollTop = conversation.scrollHeight;
      });
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-container {
  width: 500px;
  height: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
</style>
