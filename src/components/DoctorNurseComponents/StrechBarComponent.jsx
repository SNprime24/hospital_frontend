import React from "react";

import classes from "./StrechBarComponent.module.css";

function StrechBarComponent({ discharged, appointment }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.profileImage} title="Profile Image">
        <img
          src="https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg"
          alt="profileImage"
        />
      </div>
      <div className={classes.general}>
        <div className={classes.name}>{appointment.name}</div>
        <div className={classes.genderAge}>
          <span>{appointment.gender}</span>
          <span>{appointment.age}</span>
        </div>
      </div>

      {!discharged && (
        <div className={classes.medicalInfo}>
          <div title="Appointment time">
            {new Date(appointment.time).toLocaleString()}
          </div>
        </div>
      )}
      {discharged && (
        <div className={classes.medicalInfo}>
          <div title="disease">
            <span>DISEASE :</span>{" "}
            {appointment.disease?.map((val) => val).join(", ")}
            {/* {appointment.disease} */}
          </div>
          <div title="Discharge time">
            {new Date(appointment.dischargeTime).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}


export {StrechBarComponent};