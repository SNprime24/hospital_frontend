import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import FrontPage from './pages/FrontPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import RootLayout from './pages/RootLayout';

// import classes from "./App.module.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <RootLayout />,
    children: [
      { path: "", element: <MainPage /> }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
