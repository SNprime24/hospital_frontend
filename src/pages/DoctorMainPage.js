import React, { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faClockRotateLeft,  faNotesMedical } from "@fortawesome/free-solid-svg-icons";

import classes from "./DoctorMainPage.module.css";

function DoctorMainPage() {
    const [selectedPage, setSelectedPage] = useState(1);

    const handleSelectedPageOne = () => setSelectedPage(1);
    const handleSelectedPageTwo = () => setSelectedPage(2);
    const handleSelectedPageThree = () => setSelectedPage(3);

    return (
        <div className={classes.mainWrapper}>
            <div className={classes.navBarContainer}>
                <button 
                    className={(selectedPage===1)?classes.activeBtn:""}
                    onClick={handleSelectedPageOne}
                > 
                    <FontAwesomeIcon icon={faCalendarPlus}/> 
                    <span>APPOINTMENT</span> 
                </button> 

                <span className={classes.verticalBar}/>

                <button
                    className={(selectedPage===2)?classes.activeBtn:""}
                    onClick={handleSelectedPageTwo}
                > 
                    <FontAwesomeIcon icon={faNotesMedical}/> 
                    <span>CURRENT</span> 
                </button> 

                <span className={classes.verticalBar}/>

                <button
                    className={(selectedPage===3)?classes.activeBtn:""}
                    onClick={handleSelectedPageThree}
                > 
                    <FontAwesomeIcon icon={faClockRotateLeft}/> 
                    <span>PAST</span> 
                </button> 
            </div>
            <div className={classes.mainContent}>
                <div className={`${classes.contentWrapper} ${selectedPage===1 ? classes.one : selectedPage===2 ? classes.two : classes.three}`}>
                    <div className={`${classes.contentPage} ${classes.firstPage}`}>
                        
                    </div>
                    <div className={`${classes.contentPage} ${classes.secondPage}`}>

                    </div>
                    <div className={`${classes.contentPage} ${classes.thirdPage}`}>

                    </div>
                </div>      
            </div>
            
        </div>
    )
}

export default DoctorMainPage