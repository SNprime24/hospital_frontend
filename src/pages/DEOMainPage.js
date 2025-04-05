import React,{ useRef,useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faLessThan, faGreaterThan, faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./DEOMainPage.module.css";


const doctorData = [
    {
        "_id": "doc1",
        "name": "Dr. Amit Kumar",
        "daddr": "Patna, Bihar",
        "dspec": "Cardiologist",
        "inTime": "09:00",
        "outTime": "17:00",
        "phoneNumber": "9876543210",
        "d_email": "amit.kumar@example.com",
        "d_userName": "dr_amit_kumar_amit.kumar",
        "password": "********",
        "gender": "Male",
        "role": "Doctor",
        "qualification": "MD",
        "DOJ": "2022-05-01T00:00:00.000Z",
        "room": {
            "_id": "room1",
            "tor": "Consultation",
            "capacity": 1,
            "isAC": true
        },
        "hps": [
            {
                "_id": "nurse1",
                "name": "Rita Sharma",
                "role": "Nurse",
                "shift": "Morning"
            }
        ],
        "appointments": [
            {
                "_id": "app1",
                "date": "2024-05-01",
                "patient": {
                    "_id": "pat1",
                    "name": "Rajeev Kumar"
                }
            },
            {
                "_id": "app2",
                "date": "2024-06-15",
                "patient": {
                    "_id": "pat2",
                    "name": "Suman Sinha"
                }
            }
        ]
    },
    {
        "_id": "doc2",
        "name": "Dr. Neha Singh",
        "daddr": "Ranchi, Jharkhand",
        "dspec": "Pediatrician",
        "inTime": "10:00",
        "outTime": "16:00",
        "phoneNumber": "9876500000",
        "d_email": "neha.singh@example.com",
        "d_userName": "dr_neha_singh_neha.singh",
        "password": "********",
        "gender": "Female",
        "role": "Doctor",
        "qualification": "MBBS, DCH",
        "DOJ": "2021-11-10T00:00:00.000Z",
        "room": {
            "_id": "room2",
            "tor": "Pediatric",
            "capacity": 1,
            "isAC": false
        },
        "hps": [
            {
                "_id": "nurse2",
                "name": "Anjali Mehta",
                "role": "Nurse",
                "shift": "Evening"
            }
        ],
        "appointments": [
            {
                "_id": "app3",
                "date": "2024-04-20",
                "patient": {
                    "_id": "pat3",
                    "name": "Baby Rohan"
                }
            },
            {
                "_id": "app4",
                "date": "2024-07-10",
                "patient": {
                    "_id": "pat4",
                    "name": "Baby Sia"
                }
            }
        ]
    },
    {
        "_id": "doc3",
        "name": "Dr. Rohan Verma",
        "daddr": "Delhi",
        "dspec": "Orthopedic",
        "inTime": "08:00",
        "outTime": "14:00",
        "phoneNumber": "9123456789",
        "d_email": "rohan.verma@example.com",
        "d_userName": "dr_rohan_verma_rohan.verma",
        "password": "********",
        "gender": "Male",
        "role": "Doctor",
        "qualification": "MS Ortho",
        "DOJ": "2023-01-01T00:00:00.000Z",
        "room": {
            "_id": "room3",
            "tor": "Orthopedic",
            "capacity": 2,
            "isAC": true
        },
        "hps": [
            {
                "_id": "nurse3",
                "name": "Mohit Das",
                "role": "Physiotherapist",
                "shift": "Morning"
            }
        ],
        "appointments": [
            {
                "_id": "app5",
                "date": "2024-03-10",
                "patient": {
                    "_id": "pat5",
                    "name": "Rakesh Tiwari"
                }
            },
            {
                "_id": "app6",
                "date": "2024-08-12",
                "patient": {
                    "_id": "pat6",
                    "name": "Meena Singh"
                }
            }
        ]
    }
]

const nurseData = [
    {
        "_id": "nurse1",
        "name": "Priya Sharma",
        "gender": "Female",
        "qualification": "BSc Nursing",
        "phoneNumber": "9111122233",
        "room": {
            "_id": "room1",
            "tor": "Consultation"
        },
        "tests": [
            {
                "_id": "test1",
                "tname": "Blood Test"
            }
        ],
        "n_userName": "priya_nurse_priya",
        "password": "********"
    },
    {
        "_id": "nurse2",
        "name": "Sunita Yadav",
        "gender": "Female",
        "qualification": "GNM",
        "phoneNumber": "9222233344",
        "room": {
            "_id": "room2",
            "tor": "Pediatric"
        },
        "tests": [
            {
                "_id": "test3",
                "tname": "MRI"
            }
        ],
        "n_userName": "sunita_nurse_sunita",
        "password": "********"
    },
    {
        "_id": "nurse3",
        "name": "Ravi Verma",
        "gender": "Male",
        "qualification": "ANM",
        "phoneNumber": "9333344455",
        "room": {
            "_id": "room3",
            "tor": "Orthopedic"
        },
        "tests": [
            {
                "_id": "test2",
                "tname": "X-Ray"
            }
        ],
        "n_userName": "ravi_nurse_ravi",
        "password": "********"
    }
]



function DEOMainPage() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [searchText, setSearchText] = useState("");
    const navBarRef = useRef(null);

    console.log(selectedComponent);
    console.log(searchText);

    let data ;
    if(selectedComponent==="DOCTOR") data = doctorData;
    if(selectedComponent==="NURSE") data = nurseData;

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
                        <a key={index} href="#" className={classes.navItem} onClick={()=>setSelectedComponent(item)}>
                            {item}
                        </a>
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
                    <button className={classes.addNewData}>ADD</button>
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
                                <td>{item.id}</td>
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