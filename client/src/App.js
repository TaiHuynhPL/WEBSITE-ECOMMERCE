import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import ShopPage, { loader as loaderProducts } from "./Pages/ShopPage";
import DetailPage from "./Pages/DetailPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HistoryPage from "./Pages/HistoryPage";
import DetailOrderPage from "./Pages/DetailOrderPage";
import { useSelector } from "react-redux";
import CheckoutSuccess from "./Pages/CheckoutSuccess";

const ProtectedRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.userlogin.isLogin);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
        loader: loaderProducts,
      },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: loaderProducts,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout-success",
        element: (
          <ProtectedRoute>
            <CheckoutSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "order/:orderId",
        element: <DetailOrderPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
