import React from 'react'
import { createPortal } from 'react-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faClose } from "@fortawesome/free-solid-svg-icons";

import classes from "./ModalComponent.module.css";

export function ModalComponent({children, modalState, onHandleClose}){
    return createPortal(
        <div className={classes.modalWrapper} 
            style={{display : (!modalState)?"none":"" }}
            onScroll={(e)=>{
                e.stopPropagation();
            }}
            onClick={(e)=>{
                e.preventDefault();
                onHandleClose();
            }}
        >
            <div className={classes.modalContent}>
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
        </div>, document.getElementById('modal-root')
    );
}