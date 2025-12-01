import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import MainLayout from "../components/layouts/MainLayout";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <MainLayout />,
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
  
//   {
//     path: "active",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "",
//         element: <ActivePage />,
//       },
//     ],
//   },
 
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}