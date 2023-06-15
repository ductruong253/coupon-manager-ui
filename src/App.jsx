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
import CouponDetail, { couponDetailLoader } from "./components/CouponDetail";
import CouponForm, {createCoupon, updateCoupon} from "./components/CouponForm";

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
            children: [
              {
                path: "new",
                element: <CouponForm />,
                action: createCoupon,
              },
              {
                path: ":couponCode",
                id: "couponDetail",
                loader: couponDetailLoader,
                children: [
                  {
                    index: true,
                    element: <CouponDetail />,
                  },
                  {
                    path: "update",
                    element: <CouponForm />,
                    action: updateCoupon,
                  },
                ],
              },
            ],
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
