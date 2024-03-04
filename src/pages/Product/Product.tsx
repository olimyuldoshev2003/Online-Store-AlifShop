import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../utils/axiosRequest";
import { FaShoppingCart } from "react-icons/fa";
import { message } from "antd";

const Product = () => {
  const { id } = useParams();

  const [addToCartText] = useState("Add to cart");
  const [productsById, setProductsById] = useState<any>([]);

  async function getProductsById() {
    try {
      const { data } = await axiosRequest.get(
        `/Product/get-product-by-id?id=${id}`
      );

      setProductsById(data.data);
      // console.log(data.data.images[0].images);
    } catch (error) {}
  }

  async function postToCart(id: number) {
    try {
      const { data } = await axiosRequest.post(
        `Cart/add-product-to-cart?id=${id}`
      );

      console.log(data);
      message.success("Product successfully added to cart");
    } catch (error) {}
  }

  useEffect(() => {
    getProductsById();
  }, []);

  return (
    <div>
      <section className="section_1 mt-[130px]">
        <div className="container m-[0_auto]">
          <div className="section_1_block flex pb-[60px]">
            <div className="block_1">
              <img
                src={`${import.meta.env.VITE_API_URL}${
                  productsById?.images
                }`}
                className="w-[600px]"
                alt=""
              />
            </div>
            <div className="block_2 flex flex-col gap-3">
              <h1 className="text-[23px]">{productsById.productName}</h1>
              <h3 className="text-[17px]">
                Code of product: {productsById.code}
              </h3>
              <h1 className="text-[34px] font-[800]">{productsById.price}</h1>
              <h3 className="text-[20px]">
                In installments {productsById.discountPrice} s/month.
              </h3>
              <hr className="mt-[15px] border-[1px] w-[600px]" />
              <h2 className="text-[gray] mt-[20px] text-[18px]">
                Brand <span className="text-[#000]">{productsById.brand}</span>
              </h2>
              <h2 className="text-[gray] mt-[20px] text-[18px]">
                Color <span className="text-[#000]">{productsById.color}</span>
              </h2>
              <h2 className="text-[gray] mt-[20px] text-[18px]">
                Weight{" "}
                <span className="text-[#000]">{productsById.weight}</span>
              </h2>
              <h2 className="text-[gray] mt-[20px] text-[18px]">
                Size <span className="text-[#000]">{productsById.size}</span>
              </h2>
              <h2 className="text-[gray] mt-[20px] text-[18px]">
                Description{" "}
                <span className="text-[#000]">{productsById.description}</span>
              </h2>
              <div className="for_btn">
                <button
                  onClick={() => {
                    postToCart(productsById.id);
                  }}
                  className="p-[10px_30px] bg-[orange] flex items-center justify-center gap-[10px] rounded-[5px] text-[26px] font-[700]"
                >
                  <FaShoppingCart className="text-[28px]" />
                  {addToCartText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
