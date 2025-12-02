import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "logout",
        element: <h1>Logout</h1>,
      },

      {
        path: "*",
        element: <h1>404: Page Not Found</h1>,
      },
    ],
  },
  
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}