import React,{useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

import { StrechBarComponent } from "../DoctorNurseComponents/StrechBarComponent";

import classes from "./NewAppointment.module.css";

const patient = {
    "name": "Anita Desai",
    "age": 45,
    "gender": "Female",
    "email": "anita.desai@example.com",
    "phoneNumber": "9823456789",
    "guardianName": "Vikram Desai",
    "guardianPhoneNumber": "9898989898"
}

function NewAppointment (){
    const [selectedPage, setSelectedPage] = useState(1);
    const [searchText,setSearchText] = useState("");

    const handleSelectedPageOne = () => setSelectedPage(1);
    const handleSelectedPageTwo = () => setSelectedPage(2);

    const handleSearchClickAction = ()=>{
        console.log(searchText);
        alert("You clicked the search buttton")
    }

    const handleNewPatientButton = ()=>{
        console.log("new patient");
    }

    return(
        <div className={classes.appWrapper}>
            <div className={classes.appHeading}>
                NEW APPOINTMENT
            </div>
            <div className={classes.appContent}>
                <div className={classes.navBarContainer}>
                    <button 
                        className={(selectedPage===1)?classes.activeBtn:""}
                        onClick={(e)=>{
                            e.stopPropagation()
                            handleSelectedPageOne()
                        }}
                    > 
                        <FontAwesomeIcon icon={faFileCirclePlus}/> 
                        <span>NEW</span> 
                    </button> 
                    <span className={classes.verticalBar}/>
                    <button
                        className={(selectedPage===2)?classes.activeBtn:""}
                        onClick={(e)=>{
                            e.stopPropagation()
                            handleSelectedPageTwo()
                        }}
                    > 
                        <FontAwesomeIcon icon={faUser}/> 
                        <span>EXISTING</span> 
                    </button> 
                </div>
                <div className={classes.mainContent}>
                    <div className={`${classes.contentWrapper} ${selectedPage===1 ? classes.one : classes.two}`}>
                        <div className={`${classes.contentPage} ${classes.firstPage}`}>
                            <button 
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    handleNewPatientButton();
                                }}
                            >
                                NEW PATIENT
                            </button>                            
                        </div>
                        <div className={`${classes.contentPage} ${classes.secondPage}`}>

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
                                    placeholder="Filter by Phone Number..."
                                />
                                <FontAwesomeIcon 
                                    icon={faSearch} 
                                    onClick={(e)=>{
                                        e.stopPropagation()
                                        handleSearchClickAction()
                                    }}
                                />
                            </div>
                            
                            <StrechBarComponent 
                                discharged={false} 
                                appointment={patient} 
                                handleClick={(e)=>{
                                    console.log("clicked");
                                }}
                            />
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export { NewAppointment };