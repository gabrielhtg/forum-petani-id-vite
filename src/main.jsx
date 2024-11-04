import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginPage from "@/pages/login.jsx";
import RegisterPage from "@/pages/register";
import SidebarNavbar from "@/pages/sidebarNavbar.jsx";
import Marketplace from "@/pages/marketplace.jsx";
import WeatherPage from "@/pages/weather.jsx";
import HomePage from "@/pages/home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SidebarNavbar/>,
        children: [
            {
                path: '',
                title: 'Home',
                element: <HomePage/>,
            },
            {
                path: 'marketplace',
                title: 'Marketplace',
                element: <Marketplace/>,
            },
            {
                path: 'weather',
                title: 'Weather',
                element: <WeatherPage/>,
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
