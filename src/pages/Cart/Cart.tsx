import { useEffect, useState } from "react";
import { axiosRequest } from "../../utils/axiosRequest";
// import { IProducts } from "../../Types/types";

//For react icons
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { message } from "antd";

//From redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProductInCart } from "../../api/api";
// import { setProductsOfCart } from "../../reducers/states";

const Cart = () => {
  //States from redux
  const productsOfCard = useAppSelector((store) => store.states.productsOfCart);

  const dispatch = useAppDispatch();

  const [anotherAmountsFromCard, setAnotherAmountsFromCard] = useState<any>([]);
  // const [productsOfCard, setProductsOfCard] = useState([]);

  async function getAnotherAmountsFromCart() {
    try {
      const { data } = await axiosRequest.get("/Cart/get-products-from-cart");

      setAnotherAmountsFromCard(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function increseChosenProductInCart(id: number) {
    try {
      const { data } = await axiosRequest.put(
        `/Cart/increase-product-in-cart?id=${id}`
      );

      console.log(data);

      dispatch(getProductInCart());
      getAnotherAmountsFromCart();
    } catch (error) {}
  }

  async function reduceChosenProductInCart(id: number) {
    try {
      const { data } = await axiosRequest.put(
        `/Cart/reduce-product-in-cart?id=${id}`
      );

      console.log(data);

      dispatch(getProductInCart());
      getAnotherAmountsFromCart();
    } catch (error) {}
  }

  async function deleteChosenProductInCart(id: number) {
    try {
      const { data } = await axiosRequest.delete(
        `/Cart/delete-product-from-cart?id=${id}`
      );

      console.log(data);

      dispatch(getProductInCart());
      getAnotherAmountsFromCart();
    } catch (error) {}
  }

  async function clearCart() {
    try {
      const { data } = await axiosRequest.delete("/Cart/clear-cart");
      console.log(data);
      dispatch(getProductInCart());
      getAnotherAmountsFromCart();
    } catch (error) {}
  }

  useEffect(() => {
    dispatch(getProductInCart());
    getAnotherAmountsFromCart();
  }, [dispatch]);

  return (
    <div className="mt-[130px] px-[60px]">
      <div className="for_all_blocks flex justify-between">
        <section className="s1">
          <div className="container m-[0_auto]">
            <div className="s1_block">
              <div className="min_block_1_of_s1 flex items-center justify-between w-[400px] p-[15px_20px] rounded-[25px]">
                <div className="block_1_for_texts_of_cart_and_product flex items-center gap-3">
                  <h1 className="text-[27px] font-[700]">Cart</h1>
                  <p className="text-[18px] font-[600]">
                    {productsOfCard.length} product
                    {productsOfCard.length <= 1 ? null : `s`}
                  </p>
                </div>
                <div className="block_2_for_texts_of_cart_and_product">
                  <button
                    className="outline-none text-[blue] text-[17px]"
                    onClick={() => {
                      if (productsOfCard.length === 0) {
                        message.error("The cart is already cleaned");
                      } else {
                        clearCart();
                      }
                    }}
                  >
                    Clean the cart
                  </button>
                </div>
              </div>
              <div className="min_block_2_of_s1 flex items-center justify-between bg-[#f5f5f5] p-[15px_20px] rounded-[25px]">
                <div className="block_of_text_1">
                  <p className="text-[16px] text-[gray]">Delivery method</p>
                  <h2 className="text-[20px] text-[#0a0a0a]">
                    Delivery from Allo shop
                  </h2>
                </div>
                <div className="block_of_text_2">
                  <p className="text-[17px] font-[600]">Total amount</p>
                  <h2 className="text-[19px] font-[700]">0с.</h2>
                </div>
              </div>
              <div className="min_block_3_of_s1 flex flex-col gap-7 mt-[20px]">
                {productsOfCard.length > 0 ? (
                  productsOfCard.map((item: any) => {
                    return (
                      <div key={item.id} className=" flex flex-col gap-2">
                        <div className="block_1_products_into_cart flex gap-4">
                          <div className="mim_block_1_of_block_1_products_into_cart">
                            <img
                              src={`${import.meta.env.VITE_API_URL}images/${
                                item.product.image
                              }`}
                              alt=""
                              className="w-[130px]"
                            />
                          </div>
                          <div className="mim_block_2_of_block_1_products_into_cart flex flex-col gap-1">
                            <p className="text-[16px] font-[700]">
                              {item.product.price} somoni.
                            </p>
                            <h1 className="text-[18px] font-[400] max-w-[340px]">
                              {item.product.productName}
                            </h1>
                            <button className="text-[15px] bg-[#ffc863] p-[5px_10px] font-[500] rounded-[10px] flex items-center gap-2 w-[340px]">
                              in installments {item.product.discountPrice}{" "}
                              somoni/month.{" "}
                              <RiArrowDropDownLine className="text-[27px]" />
                            </button>
                            <button className="mt-[10px] text-[15px] bg-[#ececec] p-[5px_10px] font-[500] rounded-[10px] w-[340px]">
                              Free Shipping
                            </button>
                          </div>
                        </div>
                        <div className="block_2_product_into_cart flex items-center justify-end gap-[20px] max-w-[600px]">
                          <div className="min_block_1_of_block_2 flex items-center">
                            <button
                              className={
                                item.quantity > 1
                                  ? `outline-none p-[10px_16px] border-[1px] border-[#d8d8d8] flex justify-center items-center text-[18px] rounded-[10px_0_0_10px]`
                                  : "cursor-not-allowed outline-none p-[10px_16px] border-[1px] border-[#f3f1f1] bg-[#f3f1f1] flex justify-center items-center text-[18px] rounded-[10px_0_0_10px]"
                              }
                              onClick={() => {
                                if (item.quantity > 1) {
                                  reduceChosenProductInCart(item.id);
                                } else {
                                  message.error("You can't choose 0 product");
                                }
                              }}
                            >
                              -
                            </button>
                            <p className="p-[10px_16px] border-[1px] border-[#d8d8d8] flex justify-center items-center text-[18px]">
                              {item.quantity}
                            </p>
                            <button
                              className={
                                item.quantity < 10
                                  ? `outline-none p-[10px_16px] border-[1px] border-[#d8d8d8] text-[18px] flex justify-center items-center rounded-[0px_10px_10px_0px]`
                                  : `outline-none p-[10px_16px] border-[1px] border-[#f3f1f1] bg-[#f3f1f1] text-[18px] flex justify-center items-center rounded-[0px_10px_10px_0px] cursor-not-allowed`
                              }
                              onClick={() => {
                                if (item.quantity < 10) {
                                  increseChosenProductInCart(item.id);
                                } else {
                                  message.error(
                                    "You can't choose more than 10 products"
                                  );
                                }
                              }}
                            >
                              +
                            </button>
                          </div>
                          <div className="min_block_2_of_block_2">
                            <MdDelete
                              className="text-[28px] text-[red] cursor-pointer"
                              onClick={() => deleteChosenProductInCart(item.id)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <h1 className="text-center text-[50px] font-[800]">
                      The Cart is empty
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="s2">
          <div className="container m-[0_auto]">
            <div className="s2_block w-[400px]">
              <h1 className="text-start text-[gray]">Payment method</h1>
              <div className="for_btns flex items-center gap-2 mt-[20px]">
                <button className="text-[15px] p-[10px_40px] font-[800] rounded-[8px] border-[3px] border-[orange]">
                  In installments
                </button>
                <button className="text-[15px] p-[13px_40px] bg-[#e7e6e6] rounded-[10px] w-[170px]">
                  Сash
                </button>
              </div>
              <div className="for_prices_and_payments bg-[#e7e6e6] p-[12px] mt-[30px] rounded-[10px]">
                <p>
                  Products (
                  {anotherAmountsFromCard.totalProducts > 0
                    ? anotherAmountsFromCard.totalProducts
                    : 0}
                  )
                  ...............................................................
                  <span>
                    {anotherAmountsFromCard.totalPrice > 0
                      ? anotherAmountsFromCard.totalPrice
                      : 0}{" "}
                    s.
                  </span>
                </p>
                <p>
                  Discount
                  ......................................................
                  <span>
                    {anotherAmountsFromCard.totalDiscountPrice > 0
                      ? anotherAmountsFromCard.totalDiscountPrice
                      : 0}{" "}
                    s.
                  </span>
                </p>
                <p>
                  Total delivery amount
                  ..................................................
                  <span>0 s.</span>
                </p>
                <p>
                  Product commission (
                  {anotherAmountsFromCard.totalProducts > 0
                    ? anotherAmountsFromCard.totalProducts
                    : 0}
                  ) ......................................
                  <span>0 s.</span>
                </p>
                <h1 className="mt-[30px] text-[30px] font-[700]">
                  Total ...................
                  <span>
                    {anotherAmountsFromCard.totalPrice > 0
                      ? anotherAmountsFromCard.totalPrice
                      : 0}{" "}
                    s.
                  </span>
                </h1>
                <div className="for_btn flex justify-center mt-[20px]">
                  <button className="text-[18px] font-[700] p-[10px_10px] w-[100%] rounded-[30px] bg-[orange]">
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
