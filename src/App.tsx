import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import CategoryById from "./pages/CategoryById/CategoryById";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "categoryById",
          element: <CategoryById />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "products/:id",
          element: <Product />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
