import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import AllProducts from "../pages/AllProducts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CreateProducts from "../pages/CreateProducts";
import Home from "../pages/Home";
import MyBids from "../pages/MyBids";
import MyProducts from "../pages/MyProducts";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoutes>
            <MyProducts></MyProducts>
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoutes>
            <MyBids></MyBids>
          </PrivateRoutes>
        ),
      },
      {
        path: "/create-product",
        element: (
          <PrivateRoutes>
            <CreateProducts></CreateProducts>
          </PrivateRoutes>
        ),
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);
export default router;
