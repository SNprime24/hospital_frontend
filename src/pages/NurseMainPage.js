import React, { useState } from 'react'

import classes from "./NurseMainPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical, faSearch } from "@fortawesome/free-solid-svg-icons";

import { BoxBarComponent } from '../components/DoctorNurseComponents/BoxBarComponent';

const patient = [
    {
      "_id": "6611c0f9e45788b6f06c5678",
      "time": "2025-04-06T09:00:00.000Z",
      "status": "Completed",
      "patient": {
        "name": "Anita Desai",
        "age": 45,
        "gender": "Female",
        "email": "anita.desai@example.com",
        "phoneNumber": "9823456789",
        "guardianName": "Vikram Desai",
        "guardianPhoneNumber": "9898989898"
      },
      "doctor": {
        "name": "Dr. Prakash Iyer",
        "d_email": "prakash.iyer@hospital.com",
        "dspec": "Neurologist",
        "phoneNumber": "9123498765",
        "roomNumber": "B102"
      },
      "nurse": [
        {
          "name": "Pooja Jain",
          "n_email": "pooja.jain@hospital.com",
          "shift": "Night",
          "phoneNumber": "6267325100"
        }
      ],
      "prescription": [
        {
          "name": "Gabapentin",
          "dosage": "300mg",
          "frequency": "Once daily"
        }
      ],
      "tests": [
        {
          "tname": "EEG",
          "tequip": "EEG Scanner"
        }
      ],
      "hps": [
        {
          "name": "Dr. Asha Patel",
          "phoneNumber": 9876543211,
          "department": "Neurology",
          "designation": "Consultant"
        }
      ],
      "hs": [
        {
          "s_name": "Kunal Verma",
          "department": "Reception",
          "designation": "Clerk"
        }
      ],
      "disease": [
        {
          "name": "Epilepsy",
          "description": "Seizure disorder"
        }
      ],
      "room": {
        "name": "A-205"
      },
      "drugs": [
        {
          "name": "Carbamazepine",
          "dosage": "200mg",
          "frequency": "Twice daily"
        }
      ]
    },
    {
      "_id": "6611c0f9e45788b6f06c8910",
      "time": "2025-04-06T11:45:00.000Z",
      "status": "Scheduled",
      "patient": {
        "name": "Rajeev Kapoor",
        "age": 60,
        "gender": "Male",
        "email": "rajeev.kapoor@example.com",
        "phoneNumber": "9900112233",
        "guardianName": "Sunil Kapoor",
        "guardianPhoneNumber": "9988776655"
      },
      "doctor": {
        "name": "Dr. Meera Sinha",
        "d_email": "meera.sinha@hospital.com",
        "dspec": "Oncologist",
        "phoneNumber": "9234567890",
        "roomNumber": "D301"
      },
      "nurse": [
        {
          "name": "Rita Das",
          "n_email": "rita.das@hospital.com",
          "shift": "Afternoon",
          "phoneNumber": "6267325111"
        }
      ],
      "prescription": [
        {
          "name": "Tamoxifen",
          "dosage": "20mg",
          "frequency": "Once daily"
        }
      ],
      "tests": [
        {
          "tname": "CT Scan",
          "tequip": "CT Scanner"
        }
      ],
      "hps": [
        {
          "name": "Dr. Nikhil Bansal",
          "phoneNumber": 9321123456,
          "department": "Oncology",
          "designation": "Senior Oncologist"
        }
      ],
      "hs": [
        {
          "s_name": "Anjali Bhatt",
          "department": "Lab",
          "designation": "Lab Technician"
        }
      ],
      "disease": [
        {
          "name": "Lung Cancer",
          "description": "Malignant lung tumor"
        }
      ],
      "room": {
        "name": "C-112"
      },
      "drugs": [
        {
          "name": "Cisplatin",
          "dosage": "50mg",
          "frequency": "Weekly"
        }
      ]
    }
  ]


function NurseMainPage() {
    const [selectedPage, setSelectedPage] = useState(1);
    const [searchText,setSearchText] = useState("");
    
    const handleSelectedPageOne = () => setSelectedPage(1);

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
                    <FontAwesomeIcon icon={faNotesMedical}/> 
                    <span>CURRENT PATIENTS</span> 
                </button> 
            </div>
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
                    placeholder="Filter by name..."
                />
                <FontAwesomeIcon icon={faSearch} onClick={handleSearchClickAction}/>
            </div>
            <div className={classes.mainContent}>
                <div className={classes.contentWrapper}>
                    <div className={classes.contentPage}>
                        <BoxBarComponent patient={patient[0]}/>
                        <BoxBarComponent patient={patient[1]}/>
                        <BoxBarComponent patient={patient[0]}/>
                        <BoxBarComponent patient={patient[1]}/>
                        <BoxBarComponent patient={patient[0]}/>
                        <BoxBarComponent patient={patient[1]}/>
                    </div>
                </div>      
            </div>
            
        </div>
    )
}

export default NurseMainPage