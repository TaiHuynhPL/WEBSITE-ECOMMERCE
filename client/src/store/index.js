import { configureStore } from "@reduxjs/toolkit";

import popupReducer from "./popup";
import userLoginReducer from "./userlogin";
import listCartReducer from "./listCart";
import chatReducer from "./chat";

const store = configureStore({
  reducer: {
    popup: popupReducer,
    userlogin: userLoginReducer,
    listcart: listCartReducer,
    chat: chatReducer,
  },
});

export default store;
