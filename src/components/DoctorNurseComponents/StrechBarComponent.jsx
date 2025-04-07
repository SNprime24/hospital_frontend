import React from "react";

import classes from "./StrechBarComponent.module.css";

function StrechBarComponent({ discharged, patient }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.profileImage} title="Profile Image">
        <img
          src="https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg"
          alt="profileImage"
        />
      </div>
      <div className={classes.general}>
        <div className={classes.name}>{patient.patient.name}</div>
        <div className={classes.genderAge}>
          <span>{patient.patient.gender}</span>
          <span>{patient.patient.age}</span>
        </div>
      </div>

      {!discharged && (
        <div className={classes.medicalInfo}>
          <div title="Appointment time">
            {new Date(patient.time).toLocaleString()}
          </div>
        </div>
      )}
      {discharged && (
        <div className={classes.medicalInfo}>
          <div title="disease">
            <span>DISEASE :</span>{" "}
            {patient.disease.map((val) => val.name).join(", ")}
          </div>
          <div title="Discharge time">
            {new Date(patient.dischargeTime).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}


export {StrechBarComponent};