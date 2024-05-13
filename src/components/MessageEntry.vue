<template>
  <div class="message-entry" :class="{ 'current-user': isCurrentUser }">
    <img
      :src="message.from.thumbnail"
      :title="message.from.firstName"
      alt="user"
      class="avatar"
    />
    <div class="message-bubble">
      <p>{{ message.message }}</p>
    </div>
  </div>
</template>

<script>
// I implemented just native tooltip, using title attr
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    isCurrentUser: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.message-entry {
  display: flex;
  margin-bottom: 12px;

  .message-bubble {
    max-width: 60%;
    padding: 8px;
    border-radius: 8px;
    background-color: #e0e0e0;
    margin-left: 12px;
    word-break: break-word;
    text-align: left;
    display: flex;
    align-items: center;

    p {
      margin: 0;
      white-space: pre-wrap;
    }
  }

  &.current-user {
    flex-direction: row-reverse;

    .message-bubble {
      background-color: #98c4e4;
      margin-left: 0;
      margin-right: 12px;
    }
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    align-self: flex-end;
  }
}
</style>
