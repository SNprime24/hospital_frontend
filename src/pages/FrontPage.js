import React,{useState} from "react";

import classes from "./FrontPage.module.css";
import Logo from "./../assets/AzuremedLogo.png";
import FrontImage from "./../assets/AzuremedHospital.png"

import { LoginComponent } from "../components/LoginComponent";

export default function FrontPage() {
    const [login,setLogin] =  useState(false);

    return (
        <div className={classes.background}>
            <div className={classes.mainWrapper}>
                <div className={`${classes.firstWrapper} ${login ? classes.showLoginPage : ""}`}>
                    <div className={classes.logo}>
                        <img src={Logo} alt="hospitalLogo"/>
                    </div>
                    <div className={classes.frontImage}>
                        <img src={FrontImage} alt="HosptalImage"/>
                    </div>
                    <div className={classes.btnDiv}>
                        <button 
                            className={classes.loginBtn} 
                            onClick={()=>setLogin(prev=>!prev)} 
                            onKeyDown={(event) => {
                                if (event.key === "Tab") {
                                    event.preventDefault();
                                }
                            }}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className={`${classes.secondWrapper} ${login ? classes.showLoginPage : ""}`}>
                    <LoginComponent/>
                </div>
            </div>            
        </div>
    );
}

