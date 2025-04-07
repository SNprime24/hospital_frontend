import React, { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faUserDoctor, faUserNurse, faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./FDOMainPage.module.css";

function FDOMainPage() {
    const [selectedPage, setSelectedPage] = useState(1);
    const [searchText,setSearchText] = useState("");

    const handleSelectedPageOne = () => setSelectedPage(1);
    const handleSelectedPageTwo = () => setSelectedPage(2);
    const handleSelectedPageThree = () => setSelectedPage(3);

    const handleSearchClickAction = ()=>{
        console.log(searchText);
        alert("You clicked the search buttton")
    }

    return (
        <div class={classes.mainWrapper}>
            <div className={classes.navBarContainer}>
                <button 
                    className={(selectedPage===1)?classes.activeBtn:""}
                    onClick={handleSelectedPageOne}
                > 
                    <FontAwesomeIcon icon={faFilePen}/> 
                    <span>APPOINTMENT</span> 
                </button> 

                <span className={classes.verticalBar}/>

                <button
                    className={(selectedPage===2)?classes.activeBtn:""}
                    onClick={handleSelectedPageTwo}
                > 
                    <FontAwesomeIcon icon={faUserDoctor}/> 
                    <span>DOCTOR</span> 
                </button> 

                <span className={classes.verticalBar}/>

                <button
                    className={(selectedPage===3)?classes.activeBtn:""}
                    onClick={handleSelectedPageThree}
                > 
                    <FontAwesomeIcon icon={faUserNurse}/> 
                    <span>NURSE</span> 
                </button> 
            </div>
            <div className={classes.mainContent}>
                <div className={`${classes.contentWrapper} ${selectedPage===1 ? classes.one : selectedPage===2 ? classes.two : classes.three}`}>
                    <div className={`${classes.contentPage} ${classes.firstPage}`}>

                        <div className={classes.dataSubHeader}>
                            <div className={classes.searchInputDiv}>
                                <input 
                                    type="text" 
                                    name="text" 
                                    value={searchText}
                                    className={classes.searchInput}
                                    onChange = {(e)=>setSearchText(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <FontAwesomeIcon icon={faSearch} onClick={handleSearchClickAction}/>
                            </div>
                            <button 
                                className={classes.addNewData}
                                onClick={()=>alert("New button clicked !!")}
                            >NEW</button>
                        </div>
                        
                    </div>
                    <div className={`${classes.contentPage} ${classes.secondPage}`}>

                    </div>
                    <div className={`${classes.contentPage} ${classes.thirdPage}`}>

                    </div>
                </div> 

            </div>
{/* 
            <div className={classes.modalWrapper}>
                <div className={classes.modalContent}>
                    <div></div>
                </div>
            </div>      */}
            
        </div>
    )
}

export default FDOMainPage;