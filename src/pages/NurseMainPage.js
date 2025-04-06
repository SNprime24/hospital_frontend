import React, { useState } from 'react'

import classes from "./NurseMainPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";

function NurseMainPage() {
    const [selectedPage, setSelectedPage] = useState(1);
    
    const handleSelectedPageOne = () => setSelectedPage(1);

    return (
        <div class={classes.mainWrapper}>
            <div className={classes.navBarContainer}>                
                <button
                    className={(selectedPage===1)?classes.activeBtn:""}
                    onClick={handleSelectedPageOne}
                > 
                    <FontAwesomeIcon icon={faNotesMedical}/> 
                    <span>CURRENT PATIENTS</span> 
                </button> 
            </div>
            <div className={classes.mainContent}>
                <div className={classes.contentWrapper}>
                    <div className={classes.contentPage}>

                    </div>
                </div>      
            </div>
            
        </div>
    )
}

export default NurseMainPage