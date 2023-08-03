import { createSlice } from "@reduxjs/toolkit";

//Giá trị ban đầu của Popup
const initialPopupState = {
  data: { id: "", img: "", name: "", price: "", short_desc: "" },
  isShowPopup: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState: initialPopupState,
  reducers: {
    //action hiểm thị popup
    show_popup(state, action) {
      state.data.id = action.payload.id;
      state.data.img = action.payload.img;
      state.data.name = action.payload.name;
      state.data.price = action.payload.price;
      state.data.short_desc = action.payload.short_desc;
      state.isShowPopup = true;
    },

    //action ẩn popup
    hide_popup(state) {
      state.isShowPopup = false;
    },
  },
});

export const actionPopup = popupSlice.actions;

export default popupSlice.reducer;
