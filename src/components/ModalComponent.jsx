import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faClose } from "@fortawesome/free-solid-svg-icons";

import classes from "./ModalComponent.module.css";

export function ModalComponent({children, modalState, onHandleClose}){
    return(
        <div className={classes.modalWrapper} 
            style={{display : (!modalState)?"none":"" }}
            onClick={(e)=>{
                e.preventDefault();
                onHandleClose();
            }}
        >
            <div 
                className={classes.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {children}

                <button 
                    className={classes.modalClose}
                    onClick={(e)=>{
                        e.preventDefault();
                        onHandleClose();
                    }}
                > 
                    <FontAwesomeIcon icon={faClose}/> 
                </button>
            </div>
        </div>
    );
}