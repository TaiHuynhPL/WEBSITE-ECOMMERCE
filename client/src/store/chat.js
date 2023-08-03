import { createSlice } from "@reduxjs/toolkit";

const roomId = JSON.parse(localStorage.getItem("roomId"));

const initialChatState = roomId
  ? { isChatting: true, chatId: roomId }
  : {
      isChatting: false,
      chatId: "",
    };

const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatState,
  reducers: {
    on_chat(state, action) {
      state.isChatting = true;
      state.chatId = action.payload;

      //lưu tài khoản đăng nhập xuống localStorage
      localStorage.setItem("roomId", JSON.stringify(state.chatId));
    },

    off_chat(state) {
      state.isChatting = false;
      state.chatId = "";

      localStorage.removeItem("roomId");
    },
  },
});

export const actionChat = chatSlice.actions;

export default chatSlice.reducer;
