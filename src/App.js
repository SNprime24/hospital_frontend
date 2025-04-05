import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectRoute from './components/Auth/ProtectRoute'
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import {server} from './assets/config'

import FrontPage from './pages/FrontPage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './pages/RootLayout';
import DoctorMainPage from './pages/DoctorMainPage';
import NurseMainPage from './pages/NurseMainPage';
import { useSelector } from 'react-redux';
import FDOMainPage from './pages/FDOMainPage';
import DEOMainPage from './pages/DEOMainPage';
import PatientDetails from './pages/PatientDetails';
import EntityForm from './pages/EntityForm';
import { useDispatch } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth';

// import classes from "./App.module.css";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() =>{
    axios
      .get(`${server}/api/v1/auth/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data)))
      .catch((err) => dispatch(userNotExists()))
  }, [dispatch])

  const router = createBrowserRouter([
    {
      path : "/dev",
      element : <RootLayout/>,
      children : [
        {index : true, element : <DEOMainPage/>},
        { path: "new/:entity",  element : (<EntityForm/>)},
        { path: "edit/:entity/:id", element : (<EntityForm/>)},
      ]
    },
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
            { path: "patient/:patientID", element: <PatientDetails /> },
            { path: "new/:entity",  element : (user?.role==="DEO" && <EntityForm/>)},
            { path: "edit/:entity/:id", element : (user?.role==="DEO" && <EntityForm/>)},
          ]
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position = 'bottom-center' />
    </>
  );
}

export default App;