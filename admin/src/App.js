import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import { useSelector } from "react-redux";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/NewProduct/NewProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import DetailOrder from "./pages/DetailOrder/DetailOrder";
import Register from "./pages/Register/Register";
import Users from "./pages/Users/Users";
import NewUser from "./pages/NewUser/NewUser";
import EditUser from "./pages/EditUser/EditUser";
import { toast } from "react-toastify";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (user.role === "Counselor") {
    toast.error("Counselor only has access to the chat page!");
    return <Chat />;
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
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "product/new",
        element: (
          <ProtectedRoute>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/edit/:productId",
        element: (
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "user/edit/:userId",
        element: (
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "user/new",
        element: (
          <ProtectedRoute>
            <NewUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "order/detail/:id",
        element: (
          <ProtectedRoute>
            <DetailOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "chat",
        element: (
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

  return <RouterProvider router={router} />;
}

export default App;
