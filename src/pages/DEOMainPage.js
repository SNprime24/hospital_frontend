import React,{ useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faGreaterThan, faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./DEOMainPage.module.css";
import { useGetAllDiseasesQuery, useGetAllDoctorsQuery, useGetAllDrugsQuery, useGetAllHPsQuery, useGetAllNursesQuery, useGetAllPatientsQuery, useGetAllRoomsQuery, useGetAllTestsQuery, useGetAllTreatmentsQuery } from '../redux/api/api';
import { useErrors } from '../hooks/hooks';


const testData = [
    {"id":"doc1","name":"Dr. Amit Kumar"},
    {"id":"doc2","name":"Dr. Sneha Verma"},
    {"id":"doc3","name":"Dr. Rajeev Singh"},
    {"id":"doc4","name":"Dr. Meera Joshi"},
    {"id":"doc5","name":"Dr. Arjun Mehta"},
    {"id":"doc6","name":"Dr. Nisha Sharma"},
    {"id":"doc7","name":"Dr. Vikram Patel"},
    {"id":"doc8","name":"Dr. Alok Das"},
    {"id":"doc9","name":"Dr. Priya Reddy"},
    {"id":"doc10","name":"Dr. Anil Kapoor"},
    {"id":"doc11","name":"Dr. Sunita Nair"},
    {"id":"doc12","name":"Dr. Harsh Vardhan"},
    {"id":"doc13","name":"Dr. Kavita Mishra"},
    {"id":"doc14","name":"Dr. Deepak Jain"},
    {"id":"doc15","name":"Dr. Neha Bansal"}
  ];
  


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
    const hpsData = useGetAllHPsQuery(undefined, {
        skip: selectedComponent !== "HOSPITAL PROFESSIONALS",
    })
    const patientsData = useGetAllPatientsQuery(undefined, {
        skip: selectedComponent !== "PATIENTS",
    })
    const roomData = useGetAllRoomsQuery(undefined, {
        skip: selectedComponent !== "ROOM",
    })
    const drugData = useGetAllDrugsQuery(undefined, {
        skip: selectedComponent !== "DRUGS",
    })
    const testData = useGetAllTestsQuery(undefined, {
        skip: selectedComponent !== "TESTS",
    })
    const diseaseData = useGetAllDiseasesQuery(undefined, {
        skip: selectedComponent !== "DISEASES",
    })
    const treatmentData = useGetAllTreatmentsQuery(undefined, {
        skip: selectedComponent !== "TREATMENT",
    })
    const errors = [
        { isError: doctorData.isError, error: doctorData.error },
        { isError: nurseData.isError,  error: nurseData.error  },
        { isError: hpsData.isError,  error: hpsData.error  },
        { isError: patientsData.isError,  error: patientsData.error  },
        { isError: roomData.isError,  error: roomData.error  },
        { isError: drugData.isError,  error: drugData.error  },
        { isError: testData.isError,  error: testData.error  },
        { isError: diseaseData.isError,  error: diseaseData.error  },
        { isError: treatmentData.isError, error: treatmentData.error }
    ];
    useErrors(errors);

    console.log(selectedComponent);
    console.log(searchText);

    let data = [];
    if (selectedComponent === "DOCTOR") data = doctorData?.data?.data || [];
    if (selectedComponent === "NURSE")  data = nurseData?.data?.data || [];
    if (selectedComponent === "HOSPITAL PROFESSIONALS")  data = hpsData?.data?.data || [];
    if (selectedComponent === "PATIENTS")  data = patientsData?.data?.data || [];
    if (selectedComponent === "ROOM")   data = roomData?.data?.data || [];
    if (selectedComponent === "DRUGS")   data = drugData?.data?.data || [];
    if (selectedComponent === "TESTS")   data = testData?.data?.data || [];
    if (selectedComponent === "DISEASES") data = diseaseData?.data?.data || [];
    if (selectedComponent === "TREATMENT") data = treatmentData?.data?.data || [];
    console.log(data);

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
                        onClick={()=>navigate(`form/new/${selectedComponent?.toLowerCase().split(" ").join("")
 }`)}
                    >ADD</button>
                </div>
                
                {selectedComponent != null && <div className={classes.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th className={classes.actionButtons}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td className={classes.actionButtons}>
                                        <div className={classes.actionBtn} onClick = {(e) => {
                                            e.preventDefault();
                                            navigate(`form/edit/${selectedComponent?.toLowerCase().split(" ").join("")
 }`, {
                                                state: {item}
                                            })
                                        }}>📝</div>
                                        <div className={classes.actionBtn}>❌</div>
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