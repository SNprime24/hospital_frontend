import React from 'react'

import { StrechBarComponent } from '../components/DoctorNurseComponents/StrechBarComponent'

import classes from './PatientMedicalDetails.module.css'

const appointment = {
    "time": "2025-04-09T10:30:00.000Z",
    "dischargeTime": "2025-04-09T14:00:00.000Z",
    "status": "InProgress",
    "active": true,
    "patient": "661537a0c3b1f4b6a8d0ef01",
    "doctor": {
      "_id": "661538a1f2c4a7b6a9d2aa02",
      "name": "Dr. Ayesha Rahman",
      "spec": "Cardiology",
      "phoneNumber": "+92-300-1234567",
      "room": "305B"
    },
    "nurse": ["661539b3a5e2a2b6b3f1aa03"],
    "remarks": [
      {
        "remarkTime": "2025-04-09T11:00:00.000Z",
        "remarkMsg": "Patient showing stable vitals."
      },
      {
        "remarkTime": "2025-04-09T12:30:00.000Z",
        "remarkMsg": "Medication administered."
      }
    ],
    "tests": [
      "66153a7e8db5e1b6c2d4ab04",
      "66153b89e3a7f9b6e3f5bc05"
    ],
    "hps": ["66153ca4b2c7f0b6e6a7cd06"],
    "hs": ["66153dbab6f8e2b6e9b8de07"],
    "disease": ["66153ec2f8a3a9b6f0c9ef08"],
    "assignedRoom": {
      "_id": "66153fd9a4d1a1b6f2d0f009",
      "name": "Room 305B - Cardio Ward"
    },
    "drugs": [
      {
        "drug": "661540e7d5e1a2b6f4e1f10a",
        "dosage": "500mg twice a day"
      },
      {
        "drug": "661541f6f9a4b3b6f6f2f20b",
        "dosage": "250mg before bedtime"
      }
    ]
  }
  

function PatientMedicalDetails() {
    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapperForm}>
                <h3>APPOINT</h3>
                <hr/>
                <div>
                    APPOINTMENT TIME : {appointment.time}
                </div>
                <div>
                    <h5>DOCTOR : </h5>
                    <StrechBarComponent 
                        appointment={appointment.doctor}
                        type={3}
                    />
                </div>
            </div>

            <div className={classes.wrapperForm}>
                <h3>ADDMISSION</h3>
                <hr/>
                <div>
                    APPOINTMENT TIME : {appointment.time}
                </div>
                <div>
                    <h5>NURSES : </h5>
                    <StrechBarComponent 
                        appointment={appointment.doctor}
                        type={3}
                    />
                </div>
            </div>
        </div>
    )
}

export default PatientMedicalDetails;
