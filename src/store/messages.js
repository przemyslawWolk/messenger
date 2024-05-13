import { formatDate } from "@/utils/formatDate";
import { conversation, currentUser } from "@/data/mockapi";
import { generateUniqueId } from "@/utils/generateUniqueId";

export default {
  namespaced: true,
  state: {
    conversation: [],
    currentUser: null,
  },
  mutations: {
    SET_CONVERSATION(state, payload) {
      state.conversation = payload;
    },
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload;
    },
    ADD_MESSAGE(state, message) {
      state.conversation = [...state.conversation, message];
    },
    REMOVE_MESSAGE(state) {
      state.conversation.pop();
    },
  },
  actions: {
    // fake api calls
    fetchConversation({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("SET_CONVERSATION", JSON.parse(conversation));
          resolve();
        }, 500);
      });
    },
    fetchCurrentUser({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("SET_CURRENT_USER", JSON.parse(currentUser));
          resolve();
        }, 500);
      });
    },
    sendMessage({ commit, state }, message) {
      const optimisticMessage = {
        id: generateUniqueId(), // my quick approach to generate unique id
        from: state.currentUser,
        message,
        date: formatDate(new Date()),
      };
      commit("ADD_MESSAGE", optimisticMessage);

      // so the Promise comes after instant message injection
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // my way is to just generate a random number and check if it's lower than 10%.
          // If yes, then proceed to the rejection. If not, just resolve.
          const isFailed = Math.random() < 0.1;
          if (isFailed) {
            commit("REMOVE_MESSAGE");
            reject("Failed to send message.");
          } else {
            resolve();
          }
        }, 500);
      });
    },
  },
};
