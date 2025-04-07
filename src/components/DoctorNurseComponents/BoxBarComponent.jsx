import React, { useState } from "react";

import classes from "./BoxBarComponent.module.css";



function BoxBarComponent({ patient }) {
  const date = new Date();
  const hours = date.getHours();

  let timeOfDay = "";

  if (hours >= 5 && hours < 12) {
    timeOfDay = "Morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "Afternoon";
  } else if (hours >= 17 && hours < 21) {
    timeOfDay = "Evening";
  } else {
    timeOfDay = "Night";
  }

  const nurseInfo = patient?.nurse?.find((val) => val.shift === timeOfDay);

  return (
    <div className={classes.wrapper}>
      <div className={classes.sketch}>
        <div className={classes.sketchGeneral}>
          <div className={classes.generalProfileImage} title="Profile Image">
            <img
              src="https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg"
              alt="profileImage"
            />
          </div>
          <div className={classes.generalInformation}>
            <div className={classes.name} title="Profile name">{patient?.patient?.name}</div>
            <div className={classes.genderAge}>
              <span title="gender">{patient?.patient?.gender}</span>
              <span title="age">{patient?.patient?.age}</span>
            </div>
            <div className={classes.guardian}>
              <span title="Guardian name">{patient?.patient?.guardianName}</span>
              <span title="Guardian Phone Number">{patient?.patient?.guardianPhoneNumber}</span>
            </div>
          </div>
        </div>

        <div className={classes.medicalInformation}>
          <div classname={classes.infoDisease}>
            <span title="disease">{patient?.disease?.map((val) => val.name).join(", ")}</span>
            <span title="room">{patient?.room?.name}</span>
          </div>
          <hr/>
          <div className={classes.infoDoctor} title="doctor">
            <span>{patient?.doctor?.name}</span>
            <span>{patient?.doctor?.phoneNumber}</span>
          </div>
          <hr/>
          <div className={classes.infoNurse} title="nurse">
            <span>{nurseInfo?.name}</span>
            <span>{nurseInfo?.phoneNumber}</span>
          </div>
          <hr/>
          <div className={classes.infoHP} title="hospital professional">
            <span>{patient?.hps[0]?.name}</span>
            <span>{patient?.hps[0]?.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


export {BoxBarComponent};