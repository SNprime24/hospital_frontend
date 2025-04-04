import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./RootLayout.module.css";
import axios from "axios";
import { server } from "../assets/config";
import toast from "react-hot-toast";
import NavLogo from "./../assets/AzureMedNavLogo.png";
import { useDispatch } from "react-redux";
import { userNotExists } from "../redux/reducers/auth";

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/auth/logOut`, { withCredentials: true });
      dispatch(userNotExists());
      toast.success(data.message);
      navigate('/');
    }
    catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className={classes.rootLayout}>
      <nav className={classes.navbar}>
        <div className={classes.navbarFirst}>
            <button 
                className={classes.menuButton} 
                onClick={() => setSidebarOpen(prev => !prev)}
            >
                ☰
            </button>
            <div className={classes.navTitle}>
                <img src={NavLogo} alt="NavgationLogo"/>
            </div>
        </div>
        <button className={classes.navBarLogoutButton} onClick={handleLogOut}>Logout</button>
      </nav>

      <aside className={`${classes.sidebar} ${sidebarOpen ? classes.open : classes.close}`}>
        lorem ipsum
      </aside>

      <main className={classes.mainContent}>        
        <Outlet />
      </main>
    </div>
  );
}
