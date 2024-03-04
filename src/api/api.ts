import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

export const getProductInCart = createAsyncThunk(
  "api/getProductInCart",
  async function () {
      try {
          const { data } = await axiosRequest.get(
            "/Cart/get-products-from-cart"
          );
          return data.data[0].productsInCart;
      } catch (error) {
          console.log(error);
          
    }
  }
);
