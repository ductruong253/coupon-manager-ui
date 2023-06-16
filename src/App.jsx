import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import CampaignPage, { campaignsLoader } from "./pages/Campaigns";
import { loader as logoutLoader } from "./pages/Logout";
import CampaignDetail, {
  campaignDetailLoader,
} from "./components/CampaignDetail";
import CampaignForm, {
  createCampaign,
  updateCampaign,
} from "./components/CampaignForm";

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
        path: "campaigns",
        element: <CampaignPage />,
        loader: campaignsLoader,
        children: [
          {
            path: "",
            loader: checkAuthLoader,
            element: <Outlet></Outlet>,
            children: [
              {
                path: "new",
                element: <CampaignForm />,
                action: createCampaign,
              },
              {
                path: ":campaignCode",
                id: "campaignDetail",
                loader: campaignDetailLoader,
                children: [
                  {
                    index: true,
                    element: <CampaignDetail />,
                  },
                  {
                    path: "update",
                    element: <CampaignForm />,
                    action: updateCampaign,
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
