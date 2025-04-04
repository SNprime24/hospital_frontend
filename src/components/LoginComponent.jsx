import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faUserDoctor, faUserNurse, faUserPen, faUserGear } from "@fortawesome/free-solid-svg-icons";
import OtpInput from "react-otp-input";

import classes from "./LoginComponent.module.css";

export function LoginComponent(){
    const [currentPage,setCurrentPage] = useState(0);
    

    return(
        <div className={classes.mainWrapper}>
            <div className={`${classes.slideWrapper} 
                             ${currentPage===1?classes.slideWrapperTwo:""}
                             ${currentPage===2?classes.slideWrapperThree:""}
                             ${currentPage===3?classes.slideWrapperFour:""}`
            }>
                <LoginForm setCurrentPage={setCurrentPage} />
                <ForgotPasswordEmail setCurrentPage={setCurrentPage}/>
                <OtpComponent setCurrentPage={setCurrentPage}/>
                <PasswordChange setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    )
}


function LoginForm({setCurrentPage}){
    const [loginData, setLoginData] = useState({email : "", password : "", role : ""});

    function handleLoginFormChange(e){
        setLoginData((prev)=>({...prev, [e.target.name] : e.target.value}));
    }
    console.log(loginData);

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
                    <label for="loginDoctor">
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
                    <label for="loginNurse">
                        <FontAwesomeIcon icon={faUserNurse}/>
                        <p>Nurse</p>
                    </label>

                    <input
                        type="radio"
                        id="loginFDO"
                        name="role"
                        value="Front Desk Operator"
                        onChange={handleLoginFormChange}
                        checked={loginData.role === "Front Desk Operator"}
                        className = {classes.loginRole}
                    />
                    <label for="loginFDO">
                        <FontAwesomeIcon icon={faUserPen}/>
                        <p>FDO</p>
                    </label>

                    <input
                        type="radio"
                        id="loginDEO"
                        name="role"
                        value="Data Entry Operator"
                        onChange={handleLoginFormChange}
                        checked={loginData.role === "Data Entry Operator"}
                        className = {classes.loginRole}
                    />
                    <label for="loginDEO">
                        <FontAwesomeIcon icon={faUserGear}/>
                        <p>DEO</p>
                    </label>
                </div>
                <div className={classes.loginBtnDiv}>
                    <button 
                        className={classes.loginBtn} 
                        onClick={(e)=>{
                            e.preventDefault();
                        }}
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

function ForgotPasswordEmail({setCurrentPage}){
    const [formData,setFormData] = useState({email : "", role : ""});

    function handleFormChange(e){
        setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    }

    console.log(formData);

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
                    <label for="forgotDoctor">
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
                    <label for="forgotNurse">
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
                    <label for="forgotFDO">
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
                    <label for="forgotDEO">
                        <FontAwesomeIcon icon={faUserGear}/>
                        <p>DEO</p>
                    </label>
                </div>
                
                <div className={classes.loginBtnDiv}>
                    <button className={classes.loginBtn} onClick={(e)=>{
                        e.preventDefault();
                        setCurrentPage(prev=>prev+1)
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



function OtpComponent({setCurrentPage}){
    const [otpForm, setOtpForm] = useState("");
    
    console.log(otpForm)

    return(
        <div className={classes.otpWrapper}>
            <div className = {classes.otpHeadingDiv}>
                <div className = {classes.loginHeading}>OTP</div>
            </div>

            <OtpInput
                id="otp"
                value={otpForm}
                onChange={setOtpForm}
                numInputs={6}
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
                    setCurrentPage(prev=>prev+1)
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

function PasswordChange({setCurrentPage}){
    const [formData, setFormData] = useState({password : "", confirmPassword : ""});

    function handleFormChange(e){
        setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    }
    console.log(formData);

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
                        value={formData.confirmPpassword} 
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