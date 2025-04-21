import React, { useEffect } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import ProtectRoute from './components/Auth/ProtectRoute'
import {server} from './assets/config'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth';

import FrontPage from './pages/FrontPage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './pages/RootLayout';
import SubRootLayout from './pages/SubRootLayout'
import DoctorMainPage from './pages/DoctorMainPage';
import NurseMainPage from './pages/NurseMainPage';
import FDOMainPage from './pages/FDOMainPage';
import DEOMainPage from './pages/DEOMainPage';
import EntityForm from './pages/EntityForm';

// import classes from "./App.module.css";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() =>{
    axios
      .get(`${server}/api/v1/auth/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()))
  }, [dispatch])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectRoute user = {!user} redirect = '/app' />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <FrontPage /> }
      ]
    },
    {
      path: "/app",
      element: <ProtectRoute user = {user} />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <RootLayout />,
          children: [
            { index: true, element: (
              user?.role === "Doctor" ? <DoctorMainPage /> : 
              user?.role === "Nurse"  ? <NurseMainPage  /> :
              user?.role === "FDO"    ? <FDOMainPage    /> : <DEOMainPage />
            ) },
            { path: "patient/:patientID", element: <SubRootLayout /> },
            {
              path: "form/:type/:entity",
              element: user?.role === "DEO" ? 
                <EntityForm /> : 
                user?.role === "FDO" ? 
                  <EntityForm isFDO = {true} /> :
                  <Navigate to="/unauthorized" />,
            }          
          ]
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router = {router} />
      <Toaster position = 'bottom-center' />
    </>
  );
}

export default App;
