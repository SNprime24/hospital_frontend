import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faUserDoctor, faUserNurse, faUserPen, faUserGear } from "@fortawesome/free-solid-svg-icons";

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
                <div className={classes.otpWrapper}>
                    <button onClick={()=>setCurrentPage(prev=>prev+1)}>NEXT</button>
                    <button onClick={()=>setCurrentPage(prev=>prev-1)}>PREV</button>
                </div>
                <div className={classes.passwordWrapper}>
                    {/* <button onClick={()=>setCurrentPage(prev=>prev+1)}>NEXT</button> */}
                    <button onClick={()=>setCurrentPage(prev=>prev-1)}>PREV</button>
                </div>
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
                    <button className={classes.loginBtn} onClick={(e)=>{
                        e.preventDefault();
                    }}>
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
    return(
        <div className={classes.forgotEmailWrapper}>
            <button onClick={()=>setCurrentPage(prev=>prev+1)}>NEXT</button>
            <button onClick={()=>setCurrentPage(prev=>prev-1)}>PREV</button>
        </div>
    );
}