import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenClip, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { FormInput } from "../DEOComponents/FormInput";
import { ModalComponent } from "../ModalComponent";
import { SmallBoxBarComponent } from "../DoctorNurseComponents/SmallBoxBarComponent";
import { StrechBarComponent } from "../DoctorNurseComponents/StrechBarComponent";

import classes from "./AppointForm.module.css";

const doctors = [
    {
      "_id": "6615c6d1e725bfa2c832f7e1",
      "name": "Dr. Arjun Mehta",
      "addr": "123 Main Street, Delhi",
      "spec": "Cardiologist",
      "inTime": "09:00",
      "outTime": "17:00",
      "phoneNumber": "9876543210",
      "email": "arjun.mehta@example.com",
      "userName": "dr_arjun_mehta_arjun.mehta",
      "gender": "Male",
      "role": "Doctor",
      "qualification": "MBBS, MD",
      "DOJ": "2023-07-12T00:00:00.000Z",
      "active": true,
      "room" : "B-107",
      "hps": [
        "6615bbac9d1bce7e27e8f21a"
      ],
      "appointments": [
        "6615c632b45131a67e51d214",
        "6615c640f99297c6a1c743aa"
      ]
    },
    {
      "_id": "6615c7a6e5c4bfb8e90cc8f2",
      "name": "Dr. Sneha Kapoor",
      "addr": "456 Green Lane, Mumbai",
      "spec": "Dermatologist",
      "inTime": "10:00",
      "outTime": "16:00",
      "phoneNumber": "9123456789",
      "email": "sneha.kapoor@example.com",
      "userName": "dr_sneha_kapoor_sneha.kapoor",
      "gender": "Female",
      "role": "Doctor",
      "qualification": "MBBS, DDVL",
      "DOJ": "2024-03-01T00:00:00.000Z",
      "active": true,
      "room": "6615babc7c728e4b1c1b45a2",
      "hps": [
        "6615bbac9d1bce7e27e8f21b",
        "6615bbac9d1bce7e27e8f21c"
      ],
      "appointments": []
    },
    {
        "_id": "6615c7a6e5c4bfb8e90cc8f2",
        "name": "Dr. Sneha Kapoor",
        "addr": "456 Green Lane, Mumbai",
        "spec": "Dermatologist",
        "inTime": "10:00",
        "outTime": "16:00",
        "phoneNumber": "9123456789",
        "email": "sneha.kapoor@example.com",
        "userName": "dr_sneha_kapoor_sneha.kapoor",
        "gender": "Female",
        "role": "Doctor",
        "qualification": "MBBS, DDVL",
        "DOJ": "2024-03-01T00:00:00.000Z",
        "active": true,
        "room": "B-103",
        "hps": [
          "6615bbac9d1bce7e27e8f21b",
          "6615bbac9d1bce7e27e8f21c"
        ],
        "appointments": []
      },
      {
        "_id": "6615c7a6e5c4bfb8e90cc8f2",
        "name": "Dr. Sneha Kapoor",
        "addr": "456 Green Lane, Mumbai",
        "spec": "Dermatologist",
        "inTime": "10:00",
        "outTime": "16:00",
        "phoneNumber": "9123456789",
        "email": "sneha.kapoor@example.com",
        "userName": "dr_sneha_kapoor_sneha.kapoor",
        "gender": "Female",
        "role": "Doctor",
        "qualification": "MBBS, DDVL",
        "DOJ": "2024-03-01T00:00:00.000Z",
        "active": true,
        "room": "6615babc7c728e4b1c1b45a2",
        "hps": [
          "6615bbac9d1bce7e27e8f21b",
          "6615bbac9d1bce7e27e8f21c"
        ],
        "appointments": []
      }
  ]

  
function AppointForm({type = "new",formData, setFormData, handleSubmit}){
    const [searchTime,setSearchTime] = useState("");          {/* You will know search time from here */}
    const [searchSpec,setSearchSpec] = useState("");          {/* You will know search specialisation from here */}

    // const [formData, setFormData] = useState({date : "", time : "", doctor : null});
    const [modalState,setModalState] = useState(0);

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleCloseModal = () =>{
        setSearchTime("");
        setSearchSpec("");
        setModalState(0);
    }

    console.log(formData);
    console.log(searchTime,searchSpec);

    return(
        <div className={classes.wrapper}>
            {type==="new" &&
                <div className = {classes.divFlex}>
                    <FormInput
                        type="date"
                        id="Adate"
                        name="date"
                        label="Appointment Date"
                        value={formData.date}
                        onChange={handleFormChange}
                    />
                    <FormInput
                        type="time"
                        id="Adate"
                        name="time"
                        label="Appointment Time"
                        value={formData.time}
                        onChange={handleFormChange}
                    />
                </div>  
            }        
            <h5>ASSIGN DOCTOR : </h5>  
            {formData.doctor===null?
                <button 
                    className={classes.chooseInput}
                    onClick={()=>setModalState(1)}
                >
                    <FontAwesomeIcon icon={faPlusCircle}/>
                </button>:
                <div className={classes.divFlex}>
                    <StrechBarComponent appointment={formData?.doctor} type={3} />
                    <button 
                        className={`${classes.chooseInput} ${classes.edit}`}
                        onClick={()=>setModalState(1)}
                    >
                    <FontAwesomeIcon icon={faPenClip}/>
                </button>
                </div>
            }
            
            <button className={classes.submitBtn} onClick={handleSubmit}>
                Submit
            </button>

            <ModalComponent
                modalState={modalState}
                onHandleClose={handleCloseModal}
            >
                <ChooseDoctor
                    type = {type==="new"?"ADD" : "EDIT"}
                    searchTime = {searchTime}
                    searchSpec = {searchSpec}
                    setSearchTime = {setSearchTime}
                    setSearchSpec = {setSearchSpec}  
                    formData = {formData}
                    setFormData = {setFormData} 
                />               
            </ModalComponent>

        </div>
    );  
}

export {AppointForm}

function ChooseDoctor({
    type="ADD",
    searchTime,
    searchSpec,
    setSearchTime,
    setSearchSpec,
    formData,
    setFormData,
}){
    return (
        <div className={classes.chooseWrapper}>
            <h2>{type} A DOCTOR</h2>
            <div className={classes.searchInputDiv}>
                <input
                    type="time"
                    name="Time"
                    value={searchTime}
                    className={classes.searchInput}
                    onChange={(e) => setSearchTime(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Tab") {
                            event.preventDefault();
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Filter by Time..."
                />
            </div>
            <div className={classes.searchInputDiv}>
                <input
                    type="text"
                    name="Spec"
                    value={searchSpec}
                    className={classes.searchInput}
                    onChange={(e) => setSearchSpec(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Tab") {
                            event.preventDefault();
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Filter by Specialisation..."
                />
            </div>
            <div className={classes.slidingList}>
                {doctors?.map((val,_)=>(
                    <SmallBoxBarComponent user={val}
                        handleClick = {()=>setFormData((prev)=>({...prev, "doctor" : val}))}
                        isActive={val?._id===formData?.doctor?._id}
                    />
                ))}
            </div>

        </div>
    )
}