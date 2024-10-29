import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginPage from "@/pages/login.jsx";
import SidebarNavbar from "@/pages/sidebarNavbar.jsx";
import Marketplace from "@/pages/marketplace.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SidebarNavbar/>,
        children: [
            {
                path: 'marketplace',
                element: <Marketplace/>,
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>,
    }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
