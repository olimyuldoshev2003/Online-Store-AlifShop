import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { IProducts } from "../Types/types";
import { getProductInCart } from "../api/api";

// Define a type for the slice state

interface statesState {
  modalSignIn: boolean;
  productsOfCart: IProducts[];
}

const initialState: statesState = {
  modalSignIn: false,
  productsOfCart: [],
};

export const counterSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    setModalSignIn(state: statesState, action: PayloadAction<boolean>) {
      state.modalSignIn = action.payload;
    },
    setProductsOfCart(state: statesState, action: PayloadAction<any>) {
      state.productsOfCart = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductInCart.fulfilled, (state, action) => {
      state.productsOfCart = action.payload;
      console.log(state.productsOfCart);
      console.log(action.payload);
      
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.states;
export const { setModalSignIn, setProductsOfCart } =
  counterSlice.actions;

export default counterSlice.reducer;
