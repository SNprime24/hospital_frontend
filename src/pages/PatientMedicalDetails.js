import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { StrechBarComponent } from "../components/DoctorNurseComponents/StrechBarComponent";
import { AppointForm } from "../components/PatientForms/AppointForm";
import { AdmitForm } from "../components/PatientForms/AdmitForm";
import { ExaminationForm } from "../components/PatientForms/ExaminationForm";
import { PrescriptionForm } from "../components/PatientForms/PrescriptionForm";
import { TestForm } from "../components/PatientForms/TestForm";

import classes from "./PatientMedicalDetails.module.css";
import { FormTextArea } from "../components/DEOComponents/FormInput";

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
  tests: [
    {
      test: {
        _id: "661abc1234ef567890abcdeb",
        tname: "MRI",
        tequip: "MRI Scanner",
        active: false,
        room: {
          _id: "660aaa1111aaa1111aaa1113",
          name: "MRI Chamber"
        },
        doctor: {
          _id: "660bbb2222bbb2222bbb2224",
          name: "Dr. Ayesha Rahman"
        },
        nurse: {
          _id: "660ccc3333ccc3333ccc3335",
          name: "Priya Sharma"
        }
      },
      remark: "MRI scan shows no signs of intracranial bleeding."
    },
    {
      test: {
        _id: "66153b89e3a7f9b6e3f5bc05",
        tname: "ECG",
        tequip: "ECG Machine",
        active: true,
        room: {
          _id: "660aaa2222aaa2222aaa2223",
          name: "Cardio Room 2"
        },
        doctor: {
          _id: "660bbb3333bbb3333bbb3333",
          name: "Dr. Faisal Khan"
        },
        nurse: {
          _id: "660ccc4444ccc4444ccc4444",
          name: "Anjali Mehra"
        }
      },
      remark: "ECG indicates mild arrhythmia. Further monitoring recommended."
    }
  ],
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
      drug: {
        _id: "661555aaa6f2a1c1a2b3c4d4",
        dgname: "Cetirizine",
        dgcomposition: "10mg Cetirizine Hydrochloride",
        active: true
      },
      dosage: "10mg once at night"
    },
    {
      drug: {
        _id: "661555aaa6f2a1c1a2b3c4d5",
        dgname: "Metformin",
        dgcomposition: "500mg Metformin Hydrochloride",
        active: true
      },
      dosage: "500mg twice daily after meals"
    }
  ]
};

function PatientMedicalDetails() {
  // appoint logic
  const [appointEdit, setAppointEdit] = useState(0);
  const [newAppointdata,setNewAppointData] = useState({date : "", time : "", doctor : null});
  const handleAppointSubmit = ()=>{
    setAppointEdit(0)
    alert("appoint Form submitted ")
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
  const [newExamData ,setNewExamData] = useState({diseases : [], hps : []});
  const handleExamSubmit = () =>{
    setExamEdit(0);
    alert("Examination Form Submitted");
  }
  console.log(newAdmitData);

  //prescription logic
  const [presEdit,setPresEdit] = useState(0);
  const [newPresData, setNewPresData] = useState([
    {drug : null, dosage : ""}
  ]);
  const handlePresSubmit = () =>{
    setPresEdit(0);
    alert("Prescription Form Submitted");
  }

  //Test logic
  const [testEdit, setTestEdit] = useState(0);
  const [newTestData, setNewTestData] = useState([
    {test : null, remark : ""}
  ]);
  const handleTestSubmit = () =>{
    setTestEdit(0);
    alert("Test Form Submitted");
  }

  // const appointment = {}
  const type = 'ne'

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
            <div>APPOINTMENT TIME : {appointment?.time}</div>
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
            handleSubmit={handleAppointSubmit}
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
            formData = {newExamData}
            setFormData = {setNewExamData}
            handleSubmit={handleExamSubmit}
            type = "edit"
          />
        }
      </div>



      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>TESTS</h3>
          <button 
            className={classes.smallButton} 
            title="Edit Tests Form"
            onClick = {()=>setTestEdit((prev)=>prev^1)}
          > 
            <FontAwesomeIcon icon = {faPen}/> 
          </button>
        </div>
        <hr />

        {testEdit===0 && <>
            <div>
              {appointment?.tests?.map((test, _) => {
                return(
                  <>
                    <h2>{test.test.tname}</h2>
                    <div className={classes.testInfo}>
                      <span>{test.test.doctor.name}</span>
                      <span>{test.test.room.name}</span>
                    </div>
                    <p>
                      {test.remark}
                    </p>
                  </>
                );
              })}
            </div>
          </>
        }

        {testEdit===1 && 
          <TestForm
            formData={newTestData}
            setFormData={setNewTestData}
            handleSubmit={handleTestSubmit}
            type = "edit"
          />
        }
      </div>



      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>PRESCRIPTION</h3>
          <button 
            className={classes.smallButton} 
            title="Edit Prescription Form"
            onClick = {()=>setPresEdit((prev)=>prev^1)}
          > 
            <FontAwesomeIcon icon ={faPen}/> 
          </button>
        </div>
        <hr />

        {presEdit===0 && <>
            <div>
              {appointment?.drugs?.map((drug, _) => {
                return(
                  <>
                    <h4>{drug.drug.dgname}</h4>
                    <p>
                      {drug.dosage}
                    </p>
                  </>
                );
              })}
            </div>
          </>
        }

        {presEdit===1 && 
          <PrescriptionForm
            formData={newPresData}
            setFormData={setNewPresData}
            handleSubmit={handlePresSubmit}
            type = "edit"
          />
        }
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



