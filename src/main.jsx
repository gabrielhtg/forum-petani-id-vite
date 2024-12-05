import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "@/pages/login.jsx";
import RegisterPage from "@/pages/register";
import SidebarNavbar from "@/pages/sidebarNavbar.jsx";
import Marketplace from "@/pages/marketplace.jsx";
import WeatherPage from "@/pages/weather.jsx";
import HomePage from "@/pages/home.jsx";
import ItemDetail from "@/pages/item-detail.jsx";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage"; // Import halaman lupa sandi
import ProfilePage from "@/pages/profile.jsx";
import PopularPage from "@/pages/popular.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import YourPost from "@/pages/your-post.jsx";
import EditProfilePage from "@/pages/profile-edit.jsx";
import YourProduct from "@/pages/your-product.jsx";
// import KomunitasPage from "@/pages/komunitas.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarNavbar />,
    children: [
      {
        path: "",
        title: "Home",
        element: <HomePage />,
      },
      {
        path: "marketplace",
        title: "Marketplace",
        element: <Marketplace />,
      },
      {
        path: "weather",
        title: "Weather",
        element: <WeatherPage />,
      },
      {
        path: "marketplace/:id",
        title: "Item Detail",
        element: <ItemDetail />,
      },
      {
        path: "profile",
        title: "Profile",
        element: <ProfilePage />,
      },
      {
        path: "profile/edit",
        title: "Edit Profile",
        element: <EditProfilePage />,
      },
      {
        path: "popular",
        title: "Popular",
        element: <PopularPage />,
      },
      {
        path: "your-post",
        title: "Your Posts",
        element: <YourPost />,
      },
      {
        path: "your-product",
        title: "Your Products",
        element: <YourProduct />,
      },
      // {
      //     path: 'komunitas',
      //     title: "Komunitas",
      //     element: <KomunitasPage />,
      // }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
