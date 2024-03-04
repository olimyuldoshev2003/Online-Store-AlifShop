import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Layout.css";

//For React Icons
import { IoLocationOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

//For images
import logoHeader from "../assets/logoHeader.svg";
import { Box, Modal } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setModalSignIn } from "../reducers/states";
import { useState } from "react";
import { axiosRequest } from "../utils/axiosRequest";
import { message } from "antd";
import { saveToken } from "../utils/token";

const Layout = () => {
  const location = useLocation();

  const closeModalSearch = useRef<any>();

  const productsOfCart = useAppSelector((store) => store.states.productsOfCart);

  // const [productsOfCard, setProductsOfCard] = useState([]);

  const [categories, setCategories] = useState([]);
  const [categoriesById, setCategoriesById] = useState([]);

  //States from react
  const [typePassword, setTypePassword] = useState("password");
  const [check, setCheck] = useState<boolean>(false);
  const [hideAndShowText, setHideAndShowText] = useState<string>("Hidden");

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [openModalSearch, setOpenModalSearch] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [searchedProducts, setSearchedProducts] = useState<any>([]);

  //States from redux
  const modalSignIn = useAppSelector((store) => store.states.modalSignIn);

  const [modalCategories, setModalCategories] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function handleCloseModalSignIn() {
    dispatch(setModalSignIn(false));
  }

  function handleCloseModalCategories() {
    setModalCategories(false);
  }

  // function handleCloseOpenModalSearch() {
  //   setOpenModalSearch(false);
  // }

  function closeModalCategories() {
    setModalCategories(false);
  }

  // async function getProductInCart() {
  //   try {
  //     const { data } = await axiosRequest.get("/Cart/get-products-from-cart");

  //     setProductsOfCard(data.data[0].productsInCart);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function searchProducts(inpSearch: string) {
    try {
      const { data } = await axiosRequest.get(
        // inpSearch === ""
        //   ? `/Product/get-products`
        //   :
          `/Product/get-products?ProductName=${inpSearch}`
      );
      setSearchedProducts(data.data.products);
      console.log(data.data.products);
    } catch (error) {}
  }

  async function getCategories() {
    try {
      const { data } = await axiosRequest.get("/Category/get-categories");
      setCategories(data.data);
    } catch (error) {}
  }

  async function getCategoriesById(id: number) {
    try {
      const { data } = await axiosRequest.get(
        `/Category/get-category-by-id?id=${id}`
      );
      setCategoriesById(data.data.subCategories);
    } catch (error) {}
  }

  async function postSignIn(event: React.FormEvent<HTMLFormElement>) {
    try {
      if (userName.trim().length === 0 || password.length === 0) {
        event.preventDefault();
        message.error("Please enter your username and password together");
      } else {
        event.preventDefault();
        let existedUser = {
          userName: userName,
          password: password,
        };

        const { data } = await axiosRequest.post("/Account/login", existedUser);

        if (
          data.statusCode === 200 &&
          data.data !== "Your UserName or password is incorrect!!!"
        ) {
          saveToken(data.data);
          message.success("You successfully signed up to your account");
          dispatch(setModalSignIn(false));
          setUserName("");
          setPassword("");
        } else if (
          data.statusCode === 200 &&
          data.status === "Your UserName or password is incorrect!!!"
        ) {
          message.error("Your email or password is incorrect");
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    // getProductInCart();
    getCategories();
    searchProducts(inputSearch);
  }, [inputSearch]);

  return (
    <div>
      <header className="w-[100%] fixed top-0 z-30 shadow-2xl backdrop-blur-[100px]">
        <div className="container m-[0_auto]">
          <div className="header_blocks  p-[25px_0px] flex items-center gap-[10px] justify-between">
            <div className="block_1_h flex items-center gap-[20px]">
              <Link to={`/`}>
                <img src={logoHeader} alt="" />
              </Link>
              <button
                className="btn_catalog flex items-center gap-[5px] p-[10px_20px] bg-[orange] rounded-[5px]"
                aria-label="Catalog"
                onClick={() => {
                  setModalCategories(true);
                }}
              >
                <span>
                  <svg
                    className="md:-mr-0.75"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </span>
                <span className="hidden md:inline">Catalog of products</span>
              </button>
            </div>
            <div className="block_2_h">
              <input
                className="p-[8px_20px] w-[400px] outline-none border-[2px] border-[#e4e1e1] rounded-[5px] text-[#000] placeholder:text-[#000] hover:border-[gray] focus:border-[orange]"
                type="search"
                name=""
                value={inputSearch}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setInputSearch(event.target.value)
                }
                onFocus={() => setOpenModalSearch(true)}
                id=""
                placeholder="Search"
              />
              <button className="p-[8px_8px] bg-[#fff] outline-none border-[1px] border-[#e4e1e1]">
                🔎
              </button>
            </div>
            <div className="block_3_h flex items-center gap-4">
              <button className="min_block_1_of_block_3_h flex flex-col justify-center items-center cursor-pointer">
                <IoLocationOutline className="text-[26px]" />
                <p className="text-[17px] font-[800]">Hisor</p>
              </button>
              <button
                className="min_block_2_of_block_3_h flex flex-col justify-center items-center cursor-pointer"
                onClick={() => dispatch(setModalSignIn(true))}
              >
                <FaUser className="text-[23px]" />
                <p className="text-[17px] font-[800]">Sign In</p>
              </button>
              <Link
                to={`/cart`}
                className="min_block_3_of_block_3_h flex flex-col justify-center items-center cursor-pointer w-[30px]"
              >
                <FaShoppingCart className="text-[26px]" />
                <span
                  className={
                    productsOfCart.length > 0
                      ? `absolute top-[12px] right-[28px] bg-[red] p-[0px_3px] rounded-full text-[#fff]`
                      : `hidden`
                  }
                >
                  {productsOfCart.length}
                </span>
                <p className="text-[17px] font-[800]">Cart</p>
              </Link>
            </div>
          </div>
        </div>
        <Modal
          open={modalSignIn}
          onClose={handleCloseModalSignIn}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <Box className="outline-none bg-[green] rounded-[10px]">
            <div className="for_btn_close px-[10px] flex justify-end">
              <button
                className="text-[#fff] text-[30px]"
                onClick={() => dispatch(setModalSignIn(false))}
              >
                &times;
              </button>
            </div>
            <h1 className="text-center text-[#fff] text-[32px]">Sign In</h1>
            <form
              action=""
              className="px-[30px] pb-[30px] flex flex-col gap-[20px]"
              onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                postSignIn(event)
              }
            >
              <div className="label_input_email flex flex-col gap-3 items-start">
                <label htmlFor="userName" className="text-[19px] text-[#fff]">
                  Username
                </label>
                <input
                  type="text"
                  name=""
                  id="userName"
                  className="outline-none p-[5px_20px] rounded-[20px] text-[#000] placeholder:text-[#000] font-[700]"
                  placeholder="Enter your username"
                  value={userName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setUserName(event.target.value)
                  }
                  required
                />
              </div>
              <div className="label_input_password flex flex-col gap-3 items-start">
                <label htmlFor="password" className="text-[19px] text-[#fff]">
                  Password
                </label>
                <input
                  type={typePassword}
                  name=""
                  id="password"
                  className="outline-none p-[5px_20px] rounded-[20px] text-[#000] placeholder:text-[#000] font-[700]"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                  required
                />
                <div className="for_hiding_and_showing_the_password flex items-center gap-2">
                  <label htmlFor="checkbox" className="text-[16px] text-[#fff]">
                    {hideAndShowText}
                  </label>
                  <input
                    type="checkbox"
                    name=""
                    id="checkbox"
                    checked={check}
                    onChange={() => {
                      if (!check) {
                        setTypePassword("text");
                        setHideAndShowText("Showed");
                      } else {
                        setTypePassword("password");
                        setHideAndShowText("Hidden");
                      }
                      setCheck(!check);
                    }}
                  />
                </div>
              </div>
              <div className="for_btn_submit flex justify-center">
                <button
                  className="p-[5px_20px] bg-[blue] text-[#fff] rounded-[20px]"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </Box>
        </Modal>
        <Modal
          open={modalCategories}
          onClose={handleCloseModalCategories}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-start items-start"
        >
          <Box className="outline-none w-[100%] bg-[#fff] p-[10px_60px]  h-[80vh]">
            <div className="for_close_btn flex justify-end">
              <button
                className="text-[42px]"
                onClick={() => {
                  closeModalCategories();
                }}
              >
                &times;
              </button>
            </div>
            <h1 className="text-[23px] font-[700] text-center">Categories</h1>
            <div className="blocks_of_modal mt-[40px] flex gap-[10px]">
              <div className="block_1 flex flex-col gap-[10px] w-[40%] overflow-auto h-[55vh]">
                {categories.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <button
                        className="text-[18px] font-[700] p-[5px_10px] bg-[#e2e2e2] hover:bg-[orange]"
                        onMouseOver={() => {
                          getCategoriesById(item.id);
                        }}
                      >
                        {item.categoryName}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="block_2 flex items-start gap-[4px_40px] flex-wrap w-[60%] overflow-auto h-[55h]">
                {categoriesById.map((item: any) => {
                  return (
                    <div key={item.id} className="">
                      <h1 className="cursor-pointer text-[15px] font-[600]">
                        {item.subCategoryName}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </Box>
        </Modal>
        {openModalSearch ? (
          <div
            className={`w-[100%] h-[100vh] absolute top-0`}
            ref={closeModalSearch}
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              if (event.target === closeModalSearch.current) {
                setOpenModalSearch(false);
              }
            }}
          >
            <div className="modalSearch absolute bg-[#fff] z-50 top-[76px] left-[41.3%] border-[1px] border-[#000] w-[400px]  rounded-[10px] p-[10px]">
              {
                  inputSearch.trim().length === 0 ? (
                  <div>
                    <h1>There is not any products</h1>
                  </div>
                ) : (

                searchedProducts.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <h1>{item.productName}</h1>
                    </div>
                  );
                })
                )
              }
            </div>
          </div>
        ) : null}
      </header>
      <Outlet />
      {location.pathname === `/` ? (
        <footer className="footer mt-[60px] bg-[#000]">
          <div className="container m-[0_auto]">
            <div className="footer_blocks py-[40px] px-[60px] flex flex-col gap-4">
              <div className="block_1_footer flex justify-between">
                <div className="min_block_1_of_block_1_footer flex flex-col gap-3 text-[16px]">
                  <p className="text-[gray] text-[15px]">Help desk numbers</p>
                  <Link
                    to={``}
                    className="text-[#fff] hover:text-[orange] underline "
                  >
                    900
                  </Link>
                  <Link
                    to={``}
                    className="text-[#fff] hover:text-[orange] underline "
                  >
                    +992919697875
                  </Link>
                  <Link
                    to={``}
                    className="text-[#fff] hover:text-[orange] underline "
                  >
                    @alifshop.tj
                  </Link>
                </div>
                <div className="min_block_2_of_block_1_footer flex flex-col gap-3 text-[16px]">
                  <Link to={``} className="text-[#fff] hover:text-[orange]">
                    Catalog of products
                  </Link>
                  <Link to={``} className="text-[#fff] hover:text-[orange]">
                    Smartphones
                  </Link>
                  <Link to={``} className="text-[#fff] hover:text-[orange]">
                    Televisions
                  </Link>
                </div>
                <div className="min_block_3_of_block_1_footer flex flex-col gap-3 text-[16px]">
                  <Link to={``} className="text-[#fff] hover:text-[orange]">
                    Washing machine
                  </Link>
                  <Link to={``} className="text-[#fff] hover:text-[orange]">
                    Conditioners
                  </Link>
                </div>
                <div className="min_block_4_of_block_1_footer flex flex-col gap-3 text-[16px]">
                  <p className="text-[gray] text-[16px]">
                    We are in the social media
                  </p>
                  <div className="icons flex items-center gap-3 text-[31px]">
                    <Link to={``}>
                      <FaFacebook className="text-[#fff] hover:scale-125 duration-200" />
                    </Link>
                    <Link to={``}>
                      <FaInstagram className="text-[#fff] hover:scale-125 duration-200" />
                    </Link>
                    <Link to={``}>
                      <FaTelegramPlane className="text-[#fff] hover:scale-125 duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="block_2 flex justify-between border-t-[1px] border-t-[gray] pt-[20px]">
                <p className="text-[15px] text-[gray]">
                  © 2024 Alif Bank OJSC. Dushanbe, 101 microdistrict, st.
                  Bagautdinova, 9
                </p>
                <Link
                  to={``}
                  className="text-[17px] text-[#ffffff] hover:text-[orange]"
                >
                  support@alif.tj
                </Link>
              </div>
            </div>
          </div>
        </footer>
      ) : null}
    </div>
  );
};

export default Layout;
