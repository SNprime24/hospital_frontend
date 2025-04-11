import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { StrechBarComponent } from "../components/DoctorNurseComponents/StrechBarComponent";
import { AppointForm } from "../components/PatientForms/AppointForm";
import { AdmitForm } from "../components/PatientForms/AdmitForm";
import { ExaminationForm } from "../components/PatientForms/ExaminationForm";

import classes from "./PatientMedicalDetails.module.css";
import { FormTextArea } from "../components/DEOComponents/FormInput";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const user = {
  name: "Suprit Naik",
  role: "Doctor",
};

const appointment = {
  time: "2025-04-09T10:30:00.000Z",
  dischargeTime: "2025-04-09T14:00:00.000Z",
  status: "InProgress",
  active: true,
  name: "Suprit naik",
  patient: "661537a0c3b1f4b6a8d0ef01",
  doctor: {
    _id: "661538a1f2c4a7b6a9d2aa02",
    name: "Ayesha Rahman",
    spec: "Cardiology",
    phoneNumber: "+92-300-1234567",
    room: "305B",
    role: "Doctor",
  },
  room: {
    name: "R-123",
  },
  bed: {
    name: "B-123",
  },
  nurse: [
    {
      _id: "661539b3a5e2a2b6b3f1aa03",
      name: "Priya Sharma",
      shift: "Morning",
      phoneNumber: "+91-98101-12345",
      role: "Nurse",
    },
    {
      _id: "661539b3a5e2a2b6b3f1aa04",
      name: "Rajesh Verma",
      shift: "Evening",
      phoneNumber: "+91-98202-23456",
    },
    {
      _id: "661539b3a5e2a2b6b3f1aa05",
      name: "Anjali Mehra",
      shift: "Night",
      phoneNumber: "+91-98303-34567",
    },
  ],
  remarks: [
    {
      remarkUser : "Suprit Naik",
      remarkUserRole : "Doctor",
      remarkTime: "2025-04-09T11:00:00.000Z",
      remarkMsg: "Patient showing stable vitals.",
    },
    {
      remarkUser : "Ishan Kinger",
      remarkUserRole : "Nurse",
      remarkTime: "2025-04-09T12:30:00.000Z",
      remarkMsg: "Medication administered.",
    },
  ],
  tests: ["66153a7e8db5e1b6c2d4ab04", "66153b89e3a7f9b6e3f5bc05"],
  hps: [
    {
      _id: "66153ca4b2c7f0b6e6a7cd06",
      name: "Kiran Joshi",
      phoneNumber: "+91-98765-43210",
    },
    {
      _id: "66153ca4b2c7f0b6e6a7cd07",
      name: "Arvind Nair",
      phoneNumber: "+91-98987-12345",
    },
  ],
  hs: ["66153dbab6f8e2b6e9b8de07"],
  disease: [
    {
      _id: "66153ec2f8a3a9b6f0c9ef08",
      disname: "Hypertension",
    },
    {
      _id: "66153ec2f8a3a9b6f0c9ef09",
      disname: "Type 2 Diabetes",
    },
  ],
  assignedRoom: {
    _id: "66153fd9a4d1a1b6f2d0f009",
    name: "Room 305B - Cardio Ward",
  },
  drugs: [
    {
      drug: "661540e7d5e1a2b6f4e1f10a",
      dosage: "500mg twice a day",
    },
    {
      drug: "661541f6f9a4b3b6f6f2f20b",
      dosage: "250mg before bedtime",
    },
  ],
};

function PatientMedicalDetails({ appointment, type = "edit" }) {
  console.log(appointment);
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const location = useLocation();
  console.log(location.state);
  const patientId = params.patientId;

  // appoint logic
  const [appointEdit, setAppointEdit] = useState(0);
  const [newAppointdata,setNewAppointData] = useState({ date : "", time : "", doctor : null });
  const handleAppointSubmit = () => {
    setAppointEdit(0)
    
  }

  //admission logic
  const [admitEdit, setAdmitEdit] = useState(0);
  const [newAdmitData ,setNewAdmitData] = useState({room : "", bed : "", nurses : []});
  const handleAdmitSubmit = () =>{
    setAdmitEdit(0);
    alert("Admit Form Submitted");
  }
  console.log(newAdmitData);

  //examination logic
  const [examEdit, setExamEdit] = useState(0);
  const [newExamData ,setNewExamData] = useState({room : "", bed : "", nurses : []});
  const handleExamSubmit = () =>{
    setExamEdit(0);
    alert("Examination Form Submitted");
  }
  console.log(newAdmitData);

  // const appointment = {}

  if(type==="new"){
    return(
        <div className={classes.wrapper}>
          <h2>NEW APPOINTMENT</h2>
          <AppointForm
            formData = {newAppointdata}
            setFormData = {setNewAppointData}
            handleSubmit={handleAppointSubmit}
          />
        </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>APPOINT</h3>
          <button 
            className={classes.smallButton} 
            title="Edit Appointment"
            onClick = {()=>setAppointEdit((prev)=>prev^1)}
          > 
              <FontAwesomeIcon icon ={faPen}/> 
          </button>
        </div>
        <hr />

        {appointEdit===0 &&
          <>
            {console.log(appointment?.time)}
            <div>APPOINTMENT TIME : {new Date(appointment?.time).toLocaleString()}</div><br/ >
            <div>
              <h5>DOCTOR : </h5>
              {appointment.doctor!==undefined && <StrechBarComponent appointment={appointment?.doctor} type={3} />}
            </div>
            {user.role === "FDO" && <button> DISCHARGE </button>}
          </>
        }

        {appointEdit===1 && 
          <AppointForm
            formData = {newAppointdata}
            setFormData = {setNewAppointData}
            handleSubmit = {handleAppointSubmit}
            type = "edit"
          />
        }

      </div>

      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>ADMISSION</h3>
          <button 
            className={classes.smallButton} 
            title="Edit Admission Form"
            onClick = {()=>setAdmitEdit((prev)=>prev^1)}
          > 
              <FontAwesomeIcon icon ={faPen}/> 
          </button>
        </div>
        <hr />
        
        {admitEdit===0 &&
          <>
            <div className={classes.divFlex}>
              <div>
                <h5>ROOM No. </h5> {appointment?.assignedRoom?.name}
              </div>
              <div>
                <h5>Bed No. </h5> {appointment?.bed?.name}
              </div>
            </div>
            <div>
              <h5>NURSES : </h5>
              {appointment?.nurse?.map((val, _) => (
                <StrechBarComponent appointment={val} type={4} />
              ))}
            </div>
            {user.role === "FDO" && <button> DISCHARGE </button>}
          </>
        }

        {admitEdit===1 && 
          <AdmitForm
            formData = {newAdmitData}
            setFormData = {setNewAdmitData}
            handleSubmit={handleAdmitSubmit}
            type = "edit"
          />
        }
      </div>

      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>EXAMINATION</h3>
          <button 
            className={classes.smallButton} 
            title="Edit Admission Form"
            onClick = {()=>setExamEdit((prev)=>prev^1)}
          > 
              <FontAwesomeIcon icon ={faPen}/> 
          </button>
        </div>
        <hr />
        {examEdit===0 && <>
            <div>
              <h2>DISEASE : </h2>
              {appointment?.disease?.map((val, _) => val.disname).join(", ")}
            </div>
            <div>
              <h5>HOSPITAL PROFESSIONALS : </h5>
              {appointment?.hps?.map((val, _) => (
                <StrechBarComponent appointment={val} type={5} />
              ))}
            </div>
          </>
        }
        {examEdit===1 && 
          <ExaminationForm
            handleSubmit={handleExamSubmit}
            type = "edit"
          />
        }
      </div>

      <div className={classes.wrapperForm}>
        <h3>TESTS</h3>
        <hr />
        <div>
          <h2>DISEASE : </h2>
          {appointment?.disease?.map((val, _) => val.disname).join(", ")}
        </div>
        <div>
          <h5>HOSPITAL PROFESSIONALS : </h5>
          {appointment?.hps?.map((val, _) => (
            <StrechBarComponent appointment={val} type={5} />
          ))}
        </div>
      </div>

      <div className={classes.wrapperForm}>
        <h3>PRESCRIPTION</h3>
        <hr />
        <div>
          <h2>DISEASE : </h2>
          {appointment?.disease?.map((val, _) => val.disname).join(", ")}
        </div>
        <div>
          <h5>HOSPITAL PROFESSIONALS : </h5>
          {appointment?.hps?.map((val, _) => (
            <StrechBarComponent appointment={val} type={5} />
          ))}
        </div>
      </div>

      <div className={classes.wrapperForm}>
        <h3>REMARKS</h3>
        <hr />
        {(user.role==="Doctor" && {/*(user._id===appointment.doctor._id)*/}) && 
          <>
            <h5>TODAY's REMARK ({new Date().toLocaleDateString()})</h5>
            <FormTextArea/>
            <button>SUBMIT</button>
          </>
        }
        {appointment?.remarks?.map((val,_)=>(
          <>
            <h5>{val.remarkTime}</h5>
            <span>{val.remarkUser}({val.remarkUserRole})</span>
            <p>{val.remarkMsg}</p> 
          </>
        ))}
      </div>

    </div>
  );
}

export default PatientMedicalDetails;