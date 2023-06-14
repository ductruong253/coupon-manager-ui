import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import CouponPage, { couponsLoader } from "./pages/Coupons";
import { loader as logoutLoader } from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "login",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "coupons",
        element: <CouponPage />,
        loader: couponsLoader,
        children: [
          {
            path: "",
            loader: checkAuthLoader,
            element: <Outlet></Outlet>,
            children: [],
          },
        ],
      },
      {
        path: "logout",
        loader: logoutLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
