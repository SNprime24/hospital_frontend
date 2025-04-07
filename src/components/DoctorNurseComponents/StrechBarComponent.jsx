import React, { useState } from "react";

import classes from "./StrechBarComponent.module.css";

function StrechBarComponent({ discharged, patient }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.general}>
        <div className={classes.name}>{patient.patient.name}</div>
        <div className={classes.genderAge}>
          <span>{patient.patient.gender}</span>
          <span>{patient.patient.age}</span>
        </div>
      </div>

      {!discharged && (
        <div className={classes.medicalInfo}>
          <div>
            APPOINTMENT TIME: {new Date(patient.time).toLocaleString()}
          </div>
        </div>
      )}
      {discharged && (
        <div className={classes.medicalInfo}>
          <div>
            <span>DISEASE :</span>{" "}
            {patient.disease.map((val) => val.name).join(", ")}
          </div>
          <div>
            <span>DISCHARGED :</span>{" "}
            {new Date(patient.dischargeTime).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}


export {StrechBarComponent};