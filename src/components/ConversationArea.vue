<template>
  <div class="conversation-area">
    <message-entry
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :isCurrentUser="message.from.id === currentUser.id"
    />
  </div>
</template>

<script>
import MessageEntry from "./MessageEntry.vue";
import { mapState } from "vuex";

export default {
  components: {
    MessageEntry,
  },
  computed: {
    ...mapState({
      messages: (state) => state.messages.conversation,
      currentUser: (state) => state.messages.currentUser,
    }),
  },
};
</script>

<style lang="less" scoped>
.conversation-area {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 12px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
</style>
