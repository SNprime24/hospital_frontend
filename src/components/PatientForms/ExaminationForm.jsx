import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenClip, faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FormInput,FormSelect } from "../DEOComponents/FormInput";
import { ModalComponent } from "../ModalComponent";
import { StrechBarComponent } from "../DoctorNurseComponents/StrechBarComponent";

import classes from "./AppointForm.module.css";
import examClasses from "./ExaminationForm.module.css";


const fetchHP = [
    {
      _id: "6617c1f6e9a5f19b3c1a0001",
      name: "Dr. Ayesha Sharma",
      addr: "123 Medical Lane, Delhi",
      phoneNumber: "9876543210",
      email: "ayesha.sharma@example.com",
      password: "securePass1",
      gender: "Female",
      uni: "AIIMS Delhi",
      degree: "MBBS",
      supervisedBy: [],
      appointments: []
    },
    {
      _id: "6617c1f6e9a5f19b3c1a0002",
      name: "Dr. Rohan Mehta",
      addr: "456 Wellness Avenue, Mumbai",
      phoneNumber: "9811122233",
      email: "rohan.mehta@example.com",
      password: "strongPass2",
      gender: "Male",
      uni: "Grant Medical College",
      degree: "MD",
      supervisedBy: [],
      appointments: []
    },
    {
      _id: "6617c1f6e9a5f19b3c1a0003",
      name: "Dr. Neha Patel",
      addr: "78 Cure Street, Ahmedabad",
      phoneNumber: "9008899776",
      email: "neha.patel@example.com",
      password: "neha12345",
      gender: "Female",
      uni: "BJ Medical College",
      degree: "MBBS",
      supervisedBy: [],
      appointments: []
    },
    {
      _id: "6617c1f6e9a5f19b3c1a0004",
      name: "Dr. Ankit Verma",
      addr: "12 Health Plaza, Lucknow",
      phoneNumber: "8123456789",
      email: "ankit.verma@example.com",
      password: "ankitSecure99",
      gender: "Male",
      uni: "King George Medical University",
      degree: "MS",
      supervisedBy: [],
      appointments: []
    }
  ];
  
  
  const fetchDisease = [
    {
      _id: "6618d2a1e9a5f19b3c1a1001",
      disname: "Diabetes Mellitus",
      dissymp: "Increased thirst, frequent urination, fatigue, blurred vision",
      disdesc: "A chronic condition where the body fails to regulate blood sugar levels properly.",
      active: true,
      appointments: [],
      treatment: []
    },
    {
      _id: "6618d2a1e9a5f19b3c1a1002",
      disname: "Hypertension",
      dissymp: "Headache, shortness of breath, nosebleeds (often asymptomatic)",
      disdesc: "A condition in which the force of the blood against artery walls is too high.",
      active: true,
      appointments: [],
      treatment: []
    },
    {
      _id: "6618d2a1e9a5f19b3c1a1003",
      disname: "Asthma",
      dissymp: "Shortness of breath, wheezing, coughing, chest tightness",
      disdesc: "A respiratory condition marked by spasms in the bronchi of the lungs.",
      active: true,
      appointments: [],
      treatment: []
    },
    {
      _id: "6618d2a1e9a5f19b3c1a1004",
      disname: "COVID-19",
      dissymp: "Fever, cough, fatigue, loss of taste or smell, difficulty breathing",
      disdesc: "An infectious disease caused by the SARS-CoV-2 virus.",
      active: true,
      appointments: [],
      treatment: []
    },
    {
      _id: "6618d2a1e9a5f19b3c1a1005",
      disname: "Migraine",
      dissymp: "Intense headaches, nausea, sensitivity to light and sound",
      disdesc: "A neurological condition causing recurring headaches with sensory disturbances.",
      active: true,
      appointments: [],
      treatment: []
    }
  ];
  
  
  
  
//   formData, setFormData
function ExaminationForm({type = "new", handleSubmit}){
    const [searchName,setSearchName] = useState("");          {/* You will know search name from here */}

    const [formData, setFormData] = useState({diseases : [], hps : []});
    const [modalState,setModalState] = useState(0);

    const handleCloseModal = () =>{
        setSearchName("");
        setModalState(0);
    }

    const diseaseOptions = fetchDisease.map(disease=>({
        label : disease.disname,
        value : disease._id,
    }))

    const handleSelectDiseases = (e) => {
        const selected = e.target.value;
        if (!selected) return;

        setFormData(prev => {
          if (prev.diseases.includes(selected)) return prev;
          return { ...prev, diseases: [...prev.diseases, fetchDisease.find((disease)=>disease._id===selected)] };
        });
    };

    console.log("formData",formData);
    console.log(searchName);

    return(
        <div className={classes.wrapper}>
            <h5>DISEASES : </h5>
            <div className={classes.tagContainer}>
                {formData.diseases.map((disease, index) => (
                    <div key={index} className={classes.diseaseTag}>
                        {disease.disname}
                        <button
                            className={classes.removeTagBtn}
                            onClick={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    diseases: prev.diseases.filter(d => d !== disease)
                                }));
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                ))}
            </div>  
            <FormSelect
                label="Select Disease"
                name="diseases"
                onChange={handleSelectDiseases}
                options={diseaseOptions}
                defaultValue="Choose Disease"
            />

            <h5>ASSIGN HOSPITAL PROFESSIONALS : </h5>  
            {formData?.hps.length===0?
                <button 
                    className={classes.chooseInput}
                    onClick={()=>setModalState(1)}
                >
                    <FontAwesomeIcon icon={faPlusCircle}/>
                </button>
                :
                <>
                    {formData?.hps.map((val, _) => (
                        <div className={classes.divFlex} key={val?._id || _}>
                            <StrechBarComponent appointment={val} type={4} />
                            <button 
                                className={`${classes.chooseInput} ${classes.edit}`}
                                onClick={() => setModalState(1)}
                            >
                                <FontAwesomeIcon icon={faPenClip} />
                            </button>
                            <button 
                                className={`${classes.chooseInput} ${classes.edit} ${examClasses.cross}`}
                                onClick={()=>{
                                    setFormData(prev=>(
                                        {...prev, hps:prev.hps.filter(hp=>hp._id !== val._id)}
                                    ));
                                }}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    ))}
                </>
            }
            
            <button className={classes.submitBtn} onClick={handleSubmit}>
                Submit
            </button>


            <ModalComponent
                modalState={modalState}
                onHandleClose={handleCloseModal}
            >
                <ChooseHPS
                    type = {type==="new"?"ADD" : "EDIT"}
                    searchName = {searchName}
                    setSearchName = {setSearchName}
                    formData={formData}
                    setFormData={setFormData}
                />               
            </ModalComponent>

        </div>
    );  
}

export {ExaminationForm}

function ChooseHPS({
    type="ADD",
    searchName,
    setSearchName,
    formData,
    setFormData,
}){
    const handleSelectHP = (selectedHP) => {
        setFormData((prev) => {
            if (prev.hps.find(hp => hp._id === selectedHP._id)) return prev;        
            return {...prev, hps: [...prev.hps, selectedHP]};
        });
    }

    return (
        <div className={classes.chooseWrapper}>
            <h2>{type} PROFESSIONALS</h2>
            <div className={classes.searchInputDiv}>
                <input
                    type="text"
                    name="Hname"
                    value={searchName}
                    className={classes.searchInput}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Tab") {
                            event.preventDefault();
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Filter by Name..."
                />
            </div>
            <div className={examClasses.slidingList}>
                {fetchHP?.map((val,_)=>(
                    <StrechBarComponent
                        appointment={val}
                        type={5}
                        isActive={formData?.hps?.find(hp=>(hp._id===val._id)?true:false)}
                        handleClick={() => handleSelectHP(val)}
                    />
                ))}
            </div>            
        </div>
    )
}