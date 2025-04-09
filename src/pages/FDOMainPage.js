import React, { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faUserDoctor, faUserNurse, faSearch } from "@fortawesome/free-solid-svg-icons";

import { ModalComponent } from '../components/ModalComponent';
import { NewAppointment } from '../components/DEOComponents/NewAppointment';
import { SmallBoxBarComponent } from '../components/DoctorNurseComponents/SmallBoxBarComponent';
import { StrechBarComponent } from '../components/DoctorNurseComponents/StrechBarComponent';

import classes from "./FDOMainPage.module.css";
import { useGetAllCurrentDoctorsQuery, useGetAllCurrentNursesQuery, useGetAllCurrentAppointmentsQuery } from '../redux/api/api';
import { useErrors } from '../hooks/hooks';

const user = {
    "name": "Amit Kumar",
    "daddr": "Patna, Bihar",
    "spec": "Cardiologist",
    "inTime": "09:00",
    "outTime": "17:00",
    "phoneNumber": "9876543210",
    "email": "amit.kumar@example.com",
    "d_userName": "dr_amit_kumar_amit.kumar",
    "password": "********",
    "gender": "Male",
    "role": "Doctor",
    "qualification": "MD",
    "DOJ": "2022-05-01T00:00:00.000Z",
    "active": true,
    "room": null,
    "hps": [],
    "appointments": []
  }

const nuser = {
    "name": "Priya Sharma",
    "email": "priya.sharma@example.com",
    "n_addr": "Mumbai, Maharashtra",
    "phoneNumber": "9876543210",
    "n_userName": "nurse_priya_sharma_priya.sharma",
    "shift": "Morning",
    "password": "********",
    "gender": "Female",
    "qualification": "BSc Nursing",
    "role": "Nurse",
    "active": true,
    "tests": [],
    "appointments": []
  }

  const appointment = 
    {
      "_id": "6611c0f9e45788b6f06c5678",
      "time": "2025-04-06T09:00:00.000Z",
      "status": "InProgress",
      "name": "Anita Desai",
      "gender" : "female",
      "age" : 12,
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
      "bed" : {
        "name":"B-123"
      },
      "drugs": [
        {
          "name": "Carbamazepine",
          "dosage": "200mg",
          "frequency": "Twice daily"
        }
      ]
    }


function FDOMainPage() {
    const [selectedPage, setSelectedPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const [modalState, setModalState] = useState(0);

    const handleSelectedPageOne = () => setSelectedPage(1);
    const handleSelectedPageTwo = () => setSelectedPage(2);
    const handleSelectedPageThree = () => setSelectedPage(3);

    const currentDoctorsData = useGetAllCurrentDoctorsQuery();
    const currentNursesData = useGetAllCurrentNursesQuery();
    const currentAppointmentsData = useGetAllCurrentAppointmentsQuery();
    const errors = [
        { isError: currentDoctorsData.isError, error: currentDoctorsData.error },
        { isError: currentNursesData.isError, error: currentNursesData.error },
        { isError: currentAppointmentsData.isError, error: currentAppointmentsData.error },
    ]
    useErrors(errors);

    const doctors = currentDoctorsData?.data?.data?.filter(item =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    const nurses = currentNursesData?.data?.data?.filter(item =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    const appointments = currentAppointmentsData?.data?.appointments?.filter(item =>
        item?.patient?.pname?.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(doctors);
    console.log(nurses);
    console.log(appointments);

    const handleSearchClickAction = () => {
        console.log(searchText);
        alert("You clicked the search buttton")
    }

    return (
        <div className={classes.mainWrapper}>
            <div className={classes.navBarContainer}>
                <button
                    className={(selectedPage === 1) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageOne}
                >
                    <FontAwesomeIcon icon={faFilePen} />
                    <span>APPOINTMENT</span>
                </button>

                <span className={classes.verticalBar} />

                <button
                    className={(selectedPage === 2) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageTwo}
                >
                    <FontAwesomeIcon icon={faUserDoctor} />
                    <span>DOCTOR</span>
                </button>

                <span className={classes.verticalBar} />

                <button
                    className={(selectedPage === 3) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageThree}
                >
                    <FontAwesomeIcon icon={faUserNurse} />
                    <span>NURSE</span>
                </button>
            </div>

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
                        placeholder="Filter by name..."
                    />
                    <FontAwesomeIcon icon={faSearch} onClick={handleSearchClickAction}/>
                </div>
                <button 
                    className={classes.addNewData}
                    onClick={()=>setModalState(1)}
                >NEW</button>
            </div>

            <div className={classes.mainContent}>
                <div className={`${classes.contentWrapper} ${selectedPage===1 ? classes.one : selectedPage===2 ? classes.two : classes.three}`}>
                    <div className={`${classes.contentPage} ${classes.firstPage}`}>
                        <StrechBarComponent 
                            appointment={appointment}
                            type={2}
                            discharged={false}
                        />
                        
                    </div>
                    <div className={`${classes.contentPage} ${classes.secondPage}`}>
                            <SmallBoxBarComponent user={user}/>
                            <SmallBoxBarComponent user={user}/>
                            <SmallBoxBarComponent user={user}/>
                            <SmallBoxBarComponent user={user}/>
                            <SmallBoxBarComponent user={user}/>
                            <SmallBoxBarComponent user={user}/>
                            <SmallBoxBarComponent user={user}/>
                    </div>
                    <div className={`${classes.contentPage} ${classes.thirdPage}`}>
                            <SmallBoxBarComponent user={nuser}/>
                            <SmallBoxBarComponent user={nuser}/>
                            <SmallBoxBarComponent user={nuser}/>
                            <SmallBoxBarComponent user={nuser}/>
                            <SmallBoxBarComponent user={nuser}/>
                            <SmallBoxBarComponent user={nuser}/>
                            <SmallBoxBarComponent user={nuser}/>
                            <SmallBoxBarComponent user={nuser}/>
                            <SmallBoxBarComponent user={nuser}/>
                            <SmallBoxBarComponent user={nuser}/>

                    </div>
                </div>

            </div>

            <ModalComponent
                modalState={modalState}
                onHandleClose={() => setModalState(0)}
            >
                <NewAppointment />
            </ModalComponent>

        </div>
    )
}

export default FDOMainPage;

