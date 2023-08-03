import { createSlice } from "@reduxjs/toolkit";

const initialStateAuth = {
  user: { id: "", name: "", email: "", phone: "", role: "" },
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    //action đăng nhập
    on_login(state, action) {
      state.isLogin = true;
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.phone = action.payload.phone;
      state.user.role = action.payload.role;
    },

    //action đăng xuất
    on_logout(state) {
      state.isLogin = false;
      state.user.id = "";
      state.user.name = "";
      state.user.email = "";
      state.user.phone = "";
      state.user.role = "";
    },
  },
});

export const actionAuth = authSlice.actions;

export default authSlice.reducer;
