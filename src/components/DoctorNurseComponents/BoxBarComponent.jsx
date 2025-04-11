import React from "react";

import classes from "./BoxBarComponent.module.css";

function BoxBarComponent({ appointment }) {
  // console.log(appointment);
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

  const nurseInfo = appointment?.nurse?.find((val) => val.shift === timeOfDay);

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
            <div className={classes.name} title="Profile name">{appointment?.patient?.name}</div>
            <div className={classes.genderAge}>
              <span title="gender">{appointment?.patient?.gender}</span>
              <span title="age">{appointment?.patient?.age}</span>
            </div>
            <div className={classes.guardian}>
              <span title="Guardian name">{appointment?.patient?.gname}</span>
              <span title="Guardian Phone Number">{appointment?.patient?.gPhoneNo}</span>
            </div>
          </div>
        </div>

        <div className={classes.medicalInformation}>
          <div classname={classes.infoDisease}>
            <span title="disease">{appointment?.disease?.map((val) => val.name).join(", ")}</span>
            <span title="patient room">{appointment?.room?.name}</span>
          </div>
          <hr/>
          <div className={classes.infoDoctor} title="doctor">
            <span className={(appointment===undefined || appointment?.doctor===undefined || appointment?.doctor.name==="") ? classes.lightText : ""}>
              {(appointment===undefined || appointment?.doctor===undefined || appointment?.doctor.name==="") ? "-- Doctor Currently Unavailable --" : appointment?.doctor.name}
            </span>
            <span>{appointment?.doctor.phoneNumber}</span>
          </div>
          <hr/>
          <div className={classes.infoNurse} title="nurse">
            {console.log(nurseInfo)}
            <span className={(nurseInfo===undefined || nurseInfo?.name==="") ? classes.lightText : ""}>
              {(nurseInfo===undefined || nurseInfo?.name==="") ? "-- Nurse Currently Unavailable --" : nurseInfo?.name}
            </span>
            <span>{nurseInfo?.phoneNumber}</span>
          </div>
          <hr/>
          <div className={classes.infoHP} title="hospital professional">
            <span className={(appointment===undefined || appointment?.hps===undefined || appointment?.hps[0]?.name==="") ? classes.lightText : ""}>
              {(appointment===undefined || appointment?.hps===undefined || appointment?.hps[0]?.name==="") ? "-- Professional Currently Unavailable --" : appointment?.hps[0]?.name}
            </span>
            <span>{appointment?.hps[0]?.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


export {BoxBarComponent};