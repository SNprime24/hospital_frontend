import React from "react";
import { Outlet } from "react-router-dom";

import classes from "./RootLayout.model.css"

export default function RootLayout() {
    return (
        <div>
            RootLayout
            <Outlet/>
        </div>
    );
}
