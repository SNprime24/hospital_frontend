import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";

import NavLogo from "./../assets/AzureMedNavLogo.png";

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <button className={classes.navBarLogoutButton}>Logout</button>
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
