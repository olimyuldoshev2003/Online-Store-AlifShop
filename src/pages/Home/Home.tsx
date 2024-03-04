import { useEffect, useState } from "react";
import { axiosRequest } from "../../utils/axiosRequest";
import { IProducts } from "../../Types/types";
import Swiper1 from "../../components/Swiper1/Swiper1";

//For React Icons
import { FaShoppingCart } from "react-icons/fa";
import { message } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { getProductInCart } from "../../api/api";
// import { useAppSelector } from "../../store/hooks";

const Home = () => {
  const dispatch = useAppDispatch();

  const [addToCartText] = useState("Add to cart");

  // const productsOfCart = useAppSelector((store)=>store.states.productsOfCart)

  const [products, setProducts] = useState<IProducts[]>([]);
  const [categories, setCategories] = useState([]);

  async function getProducts() {
    try {
      const { data } = await axiosRequest.get("/Product/get-products");
      setProducts(data.data.products);
    } catch (error) {}
  }

  async function getCategories() {
    try {
      const { data } = await axiosRequest.get("/Category/get-categories");
      setCategories(data.data);
    } catch (error) {}
  }

  async function postToCart(id: number) {
    try {
      const { data } = await axiosRequest.post(
        `Cart/add-product-to-cart?id=${id}`
      );
      console.log(data);
      dispatch(getProductInCart());
        message.success("Product successfully added to cart");

      // if (data.errors[0] === "This product already exist in your cart!") {
      //   message.error("You already added this product");
      // } else {
      //   message.success("Product successfully added to cart");
      // }

      // console.log(data);
    } catch (error) {}
  }

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <div className="mt-[110px]">
      <section className="section_1 mt-[20px]">
        <div className="container m-[0_auto]">
          <div className="section_1_block">
            <Swiper1 />



            
          </div>
        </div>
      </section>
      <section className="section_2 mt-[40px]">
        <div className="container m-[0_auto]">
          <div className="section_2_blocks flex flex-col gap-[20px]">
            <div className="block_1_texts flex items-center gap-4">
              <h1 className="text-[26px] text-[#000] font-[700]">Products</h1>
              <button className="text-[16px] text-[blue]">See all</button>
            </div>
            <div className="block_2_products_from_backend flex items-center gap-3">
              {products.map((item: IProducts) => {
                return (
                  <div key={item.id} className="flex flex-col gap-[20px]">
                    <Link to={`products/${item.id}`}>
                      <img
                        src={`${import.meta.env.VITE_API_URL}images/${
                          item.image
                        }`}
                        className="w-[240px]"
                        alt=""
                      />
                      <p className="text-[20px] font-[700]">{item.price} с.</p>
                      <h1 className="text-[18px] font-[700] max-w-[340px]">
                        {item.productName}
                      </h1>
                    </Link>
                    <button
                      onClick={() => {
                        postToCart(item.id);
                      }}
                      className="p-[10px_10px] bg-[orange] flex items-center justify-center gap-[10px] rounded-[5px] text-[19px] font-[700]"
                    >
                      <FaShoppingCart className="text-[24px]" />
                      {addToCartText}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="section_3 mt-[40px]">
        <div className="container m-[0_auto]">
          <div className="section_3_blocks flex flex-col gap-[20px]">
            <div className="block_1_texts flex items-center gap-4">
              <h1 className="text-[26px] text-[#000] font-[700]">Categories</h1>
              {/* <button className="text-[16px] text-[blue]">See all</button> */}
            </div>
            <div className="block_2_products_from_backend flex items-center flex-wrap gap-5">
              {categories.map((item: any) => {
                return (
                  <Link
                    to={``}
                    key={item.id}
                    className="flex flex-col gap-[20px]"
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}images/${
                        item.categoryImage
                      }`}
                      className="w-[240px]"
                      alt=""
                    />
                    <h1 className="text-[18px] font-[700]">
                      {item.categoryName}
                    </h1>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
