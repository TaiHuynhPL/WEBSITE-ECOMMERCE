import { createSlice } from "@reduxjs/toolkit";

//Giá trị ban đầu của danh sách giỏ hàng sẽ được lấy từ localstorage(nếu có)
const initialListCartState = JSON.parse(localStorage.getItem("listCart")) || {
  items: [],
  totalAmount: 0,
};

const listCartSlice = createSlice({
  name: "listCart",
  initialState: initialListCartState,
  reducers: {
    //action thêm mới vào giỏ hàng(payload là thông tin sản phẩm thêm mới)
    add_cart(state, action) {
      //Tổng tiền thanh toán
      state.totalAmount += action.payload.price * action.payload.amount;

      //vị trí sản phẩm nằm trong giỏ hàng
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      //thông tin sản phẩm đó trong giỏ hàng
      const existingCartItem = state.items[existingCartItemIndex];

      //nếu sản phẩn chọn có trong giỏ gành
      if (existingCartItem) {
        state.items[existingCartItemIndex].amount += action.payload.amount;
        //sản phẩm chọn không có trong giỏ hàng
      } else {
        state.items.push(action.payload);
      }

      //lưu lại state mới được cập nhật vào localStorage
      localStorage.setItem("listCart", JSON.stringify(state));
    },

    //action chỉnh sửa sản phẩm giỏ hàng(payload là danh sách giỏ hàng mới sau khi được cập nhật)
    update_cart(state, action) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;

      //lưu lại state mới được cập nhật vào localStorage
      localStorage.setItem("listCart", JSON.stringify(state));
    },

    //action xóa sản phẩm trong giỏ hàng(payload là id sản phẩm bị xóa)
    delete_cart(state, action) {
      const indexItem = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items.splice(indexItem, 1);
      state.totalAmount =
        state.totalAmount - action.payload.amount * action.payload.price;

      //lưu lại state mới được cập nhật vào localStorage
      localStorage.setItem("listCart", JSON.stringify(state));
    },

    //action reset giỏ hàng(sử dụng nếu đăng xuất tài khoản)
    reset_cart(state) {
      state.items = [];
      state.totalAmount = 0;

      localStorage.removeItem("listCart");
    },
  },
});

export const actionListCart = listCartSlice.actions;

export default listCartSlice.reducer;
