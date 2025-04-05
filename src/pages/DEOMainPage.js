import React,{ useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faGreaterThan, faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./DEOMainPage.module.css";
import { useGetAllDoctorsQuery, useGetAllNursesQuery } from '../redux/api/api';
import { useErrors } from '../hooks/hooks';


function DEOMainPage() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [searchText, setSearchText] = useState("");
    const navBarRef = useRef(null);
    const navigate = useNavigate();

    const doctorData = useGetAllDoctorsQuery(undefined, {
        skip: selectedComponent !== "DOCTOR",
    });
    const nurseData = useGetAllNursesQuery(undefined, {
        skip: selectedComponent !== "NURSE",
    });
    const errors = [
        { isError: doctorData.isError, error: doctorData.error },
        { isError: nurseData.isError,  error: nurseData.error  },
    ];
    useErrors(errors);
    console.log("doctors: ", doctorData);
    console.log("nurses: ", nurseData);

    console.log(selectedComponent);
    console.log(searchText);

    let data = [];
    if (selectedComponent === "DOCTOR") data = doctorData?.data?.data || [];
    if (selectedComponent === "NURSE") data = nurseData?.data?.data || [];

    const scrollLeft = () =>{
        navBarRef.current.scrollLeft -= 150;
    }
    const scrollRight = () =>{
        navBarRef.current.scrollLeft += 150;
    }
    const handleSearchClickAction = ()=>{
        console.log(searchText);
        alert("You clicked the search buttton")
    }

    return (
        <div className={classes.mainWrapper}>
            <div className={classes.navBarContainer}>
                <button onClick={scrollLeft} className={classes.scrollBtn}><FontAwesomeIcon icon={faLessThan} /></button>
                <div ref={navBarRef} className={classes.navBar}>
                    {[
                        "DOCTOR",
                        "NURSE",
                        "HOSPITAL PROFESSIONALS",
                        "HOSPITAL STAFF",
                        "PATIENTS",
                        "APPOINTMENTS",
                        "ROOM",
                        "DRUGS",
                        "TESTS",
                        "DISEASES",
                        "TREATMENT"
                    ].map((item,index)=>(
                        <span key={index} className={classes.navItem} onClick={() => {

                            setSelectedComponent(item)
                        }}>
                            {item}
                        </span>
                    ))}
                </div>
                <button onClick={scrollRight} className={classes.scrollBtn}><FontAwesomeIcon icon={faGreaterThan} /></button>
            </div>
            <div className={classes.dataList}>
                <div className={classes.dataSubHeader}>
                    <div className={classes.searchInputDiv}>
                        <input 
                            type="email" 
                            name="email" 
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
                        onClick={()=>navigate(`new/${selectedComponent?.toLowerCase()}`)}
                    >ADD</button>
                </div>
                
                {selectedComponent != null && <div className={classes.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <span className={classes.editBtn}>📝</span>
                                    <span className={classes.deleteBtn}>❌</span>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
                
            </div>
        </div>
    )
}

export default DEOMainPage