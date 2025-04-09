import React from "react";

import { StrechBarComponent } from "../components/DoctorNurseComponents/StrechBarComponent";

import classes from "./PatientMedicalDetails.module.css";
import { FormTextArea } from "../components/DEOComponents/FormInput";

const user = {
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
      remarkTime: "2025-04-09T11:00:00.000Z",
      remarkMsg: "Patient showing stable vitals.",
    },
    {
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
      diseaseName: "Hypertension",
    },
    {
      _id: "66153ec2f8a3a9b6f0c9ef09",
      diseaseName: "Type 2 Diabetes",
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

function PatientMedicalDetails() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperForm}>
        <h3>APPOINT</h3>
        <hr />
        <div>APPOINTMENT TIME : {appointment.time}</div>
        <div>
          <h5>DOCTOR : </h5>
          <StrechBarComponent appointment={appointment.doctor} type={3} />
        </div>
        {user.role === "FDO" && <button> DISCHARGE </button>}
      </div>

      <div className={classes.wrapperForm}>
        <h3>ADDMISSION</h3>
        <hr />
        <div className={classes.divFlex}>
          <div>
            <h5>ROOM No. </h5> {appointment.room.name}
          </div>
          <div>
            <h5>Bed No. </h5> {appointment.bed.name}
          </div>
        </div>
        <div>
          <h5>NURSES : </h5>
          {appointment?.nurse?.map((val, _) => (
            <StrechBarComponent appointment={val} type={4} />
          ))}
        </div>
        {user.role === "FDO" && <button> DISCHARGE </button>}
      </div>

      <div className={classes.wrapperForm}>
        <h3>EXAMINATION</h3>
        <hr />
        <div>
          <h2>DISEASE : </h2>
          {appointment.disease.map((val, _) => val.diseaseName).join(", ")}
        </div>
        <div>
          <h5>HOSPITAL PROFESSIONALS : </h5>
          {appointment?.hps?.map((val, _) => (
            <StrechBarComponent appointment={val} type={5} />
          ))}
        </div>
      </div>

      <div className={classes.wrapperForm}>
        <h3>TESTS</h3>
        <hr />
        <div>
          <h2>DISEASE : </h2>
          {appointment.disease.map((val, _) => val.diseaseName).join(", ")}
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
          {appointment.disease.map((val, _) => val.diseaseName).join(", ")}
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
        {appointment.remarks.map((val,_)=>(
          <>
            <h5>{val.remarkTime}</h5>
            <p>{val.remarkMsg}</p>
          </>
        ))}
      </div>

    </div>
  );
}

export default PatientMedicalDetails;
