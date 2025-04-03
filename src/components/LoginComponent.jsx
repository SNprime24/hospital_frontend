import React,{useState} from "react";

import classes from "./LoginComponent.module.css";

export function LoginComponent(){
    const [currentPage,setCurrentPage] = useState(1);

    return(
        <div className={classes.mainWrapper}>
            <div className={`${classes.slideWrapper} 
                             ${currentPage===1?classes.slideWrapperTwo : ""}
                             ${currentPage===2?classes.slideWrapperThree : ""}
                             ${currentPage===3?classes.slideWrapperFour : ""}`
            }>
                <div className={classes.loginWrapper}>
                    <button onClick={()=>setCurrentPage(prev=>prev+1)}>NEXT</button>
                    {/* <button onClick={()=>setCurrentPage(prev=>prev-1)}>PREV</button> */}
                </div>
                <div className={classes.forgotEmailWrapper}>
                    <button onClick={()=>setCurrentPage(prev=>prev+1)}>NEXT</button>
                    <button onClick={()=>setCurrentPage(prev=>prev-1)}>PREV</button>
                </div>
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
