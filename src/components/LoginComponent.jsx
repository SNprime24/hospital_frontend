import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faUserDoctor, faUserNurse, faUserPen, faUserGear } from "@fortawesome/free-solid-svg-icons";
import OtpInput from "react-otp-input";

import classes from "./LoginComponent.module.css";
import { server } from '../assets/config';
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userExists } from "../redux/reducers/auth";

export function LoginComponent() {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ email: "", role: " "});

    return(
        <div className={classes.mainWrapper}>
            <div className={`${classes.slideWrapper} 
                             ${currentPage===1?classes.slideWrapperTwo:""}
                             ${currentPage===2?classes.slideWrapperThree:""}
                             ${currentPage===3?classes.slideWrapperFour:""}`
            }>
                <LoginForm setCurrentPage={setCurrentPage} />
                <ForgotPasswordEmail setCurrentPage={setCurrentPage} setData={setData} />
                <OtpComponent setCurrentPage={setCurrentPage} data={data} />
                <PasswordChange setCurrentPage={setCurrentPage} data={data} />
            </div>
        </div>
    )
}


function LoginForm({ setCurrentPage }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({email : "", password : "", role : ""});

    function handleLoginFormChange(e){
        setLoginData((prev)=>({...prev, [e.target.name] : e.target.value}));
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        SubmitForm({ param: "login", formData: loginData, dispatch, navigate })
    }

    return(
        <div className={classes.loginWrapper}>
            <div className = {classes.loginHeadingDiv}>
                <div className = {classes.loginHeading}>WELCOME</div>
                <div className = {classes.loginSubHeading}>Login to your account to continue...</div>
            </div>
            <form className={classes.loginForm}>
                <div className={classes.loginInputDiv}>
                    <input 
                        type="email" 
                        name="email" 
                        value={loginData.email} 
                        onChange={handleLoginFormChange}
                        className={classes.loginInput}
                        onKeyDown={(event) => {
                            if (event.key === "Tab") {
                                event.preventDefault();
                            }
                        }}
                    />
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className={classes.loginInputDiv}>
                    <input 
                        type="password" 
                        name="password" 
                        value={loginData.password} 
                        onChange={handleLoginFormChange}
                        className={classes.loginInput}
                        onKeyDown={(event) => {
                            if (event.key === "Tab") {
                                event.preventDefault();
                            }
                        }}
                    />
                    <FontAwesomeIcon icon={faKey} />
                </div>
                <div className={classes.loginRoleDiv}>
                    <input
                        type="radio"
                        id = "loginDoctor"
                        name="role"
                        value="Doctor"
                        onChange={handleLoginFormChange}
                        checked={loginData.role === "Doctor"}
                        className = {classes.loginRole}
                    />
                    <label htmlFor="loginDoctor">
                        <FontAwesomeIcon icon={faUserDoctor}/>
                        <p>Doctor</p>
                    </label>

                    <input
                        type="radio"
                        id="loginNurse"
                        name="role"
                        value="Nurse"
                        onChange={handleLoginFormChange}
                        checked={loginData.role === "Nurse"}
                        className = {classes.loginRole}
                    />
                    <label htmlFor="loginNurse">
                        <FontAwesomeIcon icon={faUserNurse}/>
                        <p>Nurse</p>
                    </label>

                    <input
                        type="radio"
                        id="loginFDO"
                        name="role"
                        value="FDO"
                        onChange={handleLoginFormChange}
                        checked={loginData.role === "FDO"}
                        className = {classes.loginRole}
                    />
                    <label htmlFor="loginFDO">
                        <FontAwesomeIcon icon={faUserPen}/>
                        <p>FDO</p>
                    </label>

                    <input
                        type="radio"
                        id="loginDEO"
                        name="role"
                        value="DEO"
                        onChange={handleLoginFormChange}
                        checked={loginData.role === "DEO"}
                        className = {classes.loginRole}
                    />
                    <label htmlFor="loginDEO">
                        <FontAwesomeIcon icon={faUserGear}/>
                        <p>DEO</p>
                    </label>
                </div>
                <div className={classes.loginBtnDiv}>
                    <button 
                        className={classes.loginBtn} 
                        onClick={handleLoginSubmit}
                        onKeyDown={(event) => {
                            if (event.key === "Tab") {
                                event.preventDefault();
                            }
                        }}
                    >
                        Login
                    </button>
                </div>
            </form>
            <span className={classes.invButton} onClick={()=>setCurrentPage(prev=>prev+1)}>
                Forgot your password?
            </span>
        </div>
    );
}

function ForgotPasswordEmail({ setCurrentPage, setData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email : "", role : "" });

    function handleFormChange(e){
        setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    }

    function handleForgetPasswordEmail() {
        SubmitForm({ param: "verifyEmail", formData: formData, navigate, setCurrentPage, setData })
    }

    return(
        <div className={classes.forgotEmailWrapper}>
            <div className = {classes.forgotHeadingDiv}>
                <div className = {classes.loginHeading}>FORGOT YOUR PASSWORD?</div>
            </div>
            <form className={classes.forgotEmailForm}>
                <div className={classes.loginInputDiv}>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleFormChange}
                        className={classes.loginInput}
                        onKeyDown={(event) => {
                            if (event.key === "Tab") {
                                event.preventDefault();
                            }
                        }}
                    />
                    <FontAwesomeIcon icon={faUser} />
                </div>

                <div className={classes.loginRoleDiv}>
                    <input
                        type="radio"
                        id = "forgotDoctor"
                        name="role"
                        value="Doctor"
                        onChange={handleFormChange}
                        checked={formData.role === "Doctor"}
                        className = {classes.loginRole}
                    />
                    <label htmlFor="forgotDoctor">
                        <FontAwesomeIcon icon={faUserDoctor}/>
                        <p>Doctor</p>
                    </label>

                    <input
                        type="radio"
                        id="forgotNurse"
                        name="role"
                        value="Nurse"
                        onChange={handleFormChange}
                        checked={formData.role === "Nurse"}
                        className = {classes.loginRole}
                    />
                    <label htmlFor="forgotNurse">
                        <FontAwesomeIcon icon={faUserNurse}/>
                        <p>Nurse</p>
                    </label>

                    <input
                        type="radio"
                        id="forgotFDO"
                        name="role"
                        value="Front Desk Operator"
                        onChange={handleFormChange}
                        checked={formData.role === "Front Desk Operator"}
                        className = {classes.loginRole}
                    />
                    <label htmlFor="forgotFDO">
                        <FontAwesomeIcon icon={faUserPen}/>
                        <p>FDO</p>
                    </label>

                    <input
                        type="radio"
                        id="forgotDEO"
                        name="role"
                        value="Data Entry Operator"
                        onChange={handleFormChange}
                        checked={formData.role === "Data Entry Operator"}
                        className = {classes.loginRole}
                    />
                    <label htmlFor="forgotDEO">
                        <FontAwesomeIcon icon={faUserGear}/>
                        <p>DEO</p>
                    </label>
                </div>
                
                <div className={classes.loginBtnDiv}>
                    <button className={classes.loginBtn} onClick={(e) => {
                        e.preventDefault();
                        handleForgetPasswordEmail();
                    }}>
                        Submit
                    </button>
                </div>
            </form>
            <span className={classes.invButton} onClick={()=>setCurrentPage(prev=>prev-1)}>
                Back to Login!
            </span>
        </div>
    );
}

function OtpComponent({ setCurrentPage, data }) {
    const navigate = useNavigate();
    const [OTP, setOTP] = useState("");
    const formData = { email: data.email, role: data.role, otp: OTP };

    function validateOTP() {
        SubmitForm({ param: "verifyOTP", formData: formData, navigate, setCurrentPage })
    }

    return(
        <div className={classes.otpWrapper}>
            <div className = {classes.otpHeadingDiv}>
                <div className = {classes.loginHeading}>OTP</div>
            </div>

            <OtpInput
                id="otp"
                value={OTP}
                onChange={setOTP}
                numInputs={5}
                renderSeparator={<span>-</span>}
                containerStyle={{justifyContent:"center"}}
                style={{justifyContent : 'center'}}
                renderInput={(props) => (
                    <input
                        {...props}
                        className={classes.otpBox}
                        style={{width : '10%'}}
                    />
                )}
            />
            <input 
                onKeyDown={(event) => {
                    if (event.key === "Tab") {
                        event.preventDefault();
                    }
                }}
                style={{display:"none"}}
            />
            <div className={classes.loginBtnDiv}>
                <button className={classes.loginBtn} onClick={(e)=>{
                    e.preventDefault();
                    validateOTP();
                }}>
                    Submit
                </button>
            </div>
            <span className={classes.invButton} onClick={()=>setCurrentPage(prev=>prev-2)}>
                Back to Login!
            </span>
        </div>
    );
}

function PasswordChange({ setCurrentPage, data }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({password : "", confirmPassword : ""});

    function handleFormChange(e){
        setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    }

    const changeData = { ...formData, ...data };

    async function submitChangePassword() {
        SubmitForm({ param: "setPassword", formData: changeData, navigate, setCurrentPage })
    }

    return(
        <div className={classes.passwordWrapper}>
            <div className = {classes.forgotHeadingDiv}>
                <div className = {classes.loginHeading}>CHANGE PASSWORD!</div>
            </div>
            <form className={classes.changePasswordForm}>
                <div className={classes.loginInputDiv}>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleFormChange}
                        className={classes.loginInput}
                        onKeyDown={(event) => {
                            if (event.key === "Tab") {
                                event.preventDefault();
                            }
                        }}
                    />
                    <FontAwesomeIcon icon={faKey} />
                </div>

                <div className={classes.loginInputDiv}>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleFormChange}
                        className={classes.loginInput}
                        onKeyDown={(event) => {
                            if (event.key === "Tab") {
                                event.preventDefault();
                            }
                        }}
                    />
                    <FontAwesomeIcon icon={faKey} />
                </div>
                
                <div className={classes.loginBtnDiv}>
                    <button className={classes.loginBtn} onClick={(e)=>{
                        e.preventDefault();
                        submitChangePassword();
                    }}>
                        Submit
                    </button>
                </div>
            </form>
            <span className={classes.invButton} onClick={()=>setCurrentPage(prev=>prev-3)}>
                Back to Login!
            </span>
        </div>
    );
}

async function SubmitForm({ param, formData, dispatch, navigate, setCurrentPage, setData }) {
    try {
        const response = await fetch(`${server}/api/v1/auth/${param}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        })

        const resData = await response.json();

        if(!response.ok) {
            throw new Error(resData.message || "Error while loading data...");
        }

        if(resData.success) {
            toast.success(resData.message);
            console.log(resData.user);
            if(param === "login") dispatch(userExists(resData.user));
            if(param === "login") navigate("/app");
            if(param === "verifyEmail") setData(formData);
            if(param === "verifyEmail" || param === "verifyOTP") setCurrentPage(prev => prev + 1);
            if(param === "setPassword") setCurrentPage(0);
        }
        else {
            toast.error(resData.message);
        }
    }
    catch (error) {
        console.error("Error: ", error);
        toast.error(error.message || "An unexpected error occured.");
        navigate("/");
    }
}