import React from "react";

import ProfileImagePlaceholder from "./../../assets/ProfileImagePlaceholderGrey.jpg"
import classes from "./StrechBarComponent.module.css";

function StrechBarComponent({ appointment, handleClick, type = 1, discharged=false, isActive=0}) {
  const date = new Date(appointment?.time);
  const dichargedDate = new Date(appointment?.dischargeTime);

  const datePart = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
  const timePart = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  }); 

  const dischargeDatePart = dichargedDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
  const dischargeTimePart = dichargedDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  }); 

  return (
    <div 
      className={`${classes.wrapper} ${isActive?classes.active:""}`} 
      onClick={(e)=>{
        e.stopPropagation();
        handleClick()
      }}
    >
      <div className={classes.profileImage} title="Profile Image">
        <img
          src={ProfileImagePlaceholder}
          alt="profileImage"
        />
      </div>
      <div className={classes.general}>
        <div className={classes.name}>{appointment?.name}</div>

        {type===0 && <div className={classes.genderAge}>
          <span>{appointment?.gender}</span>
          <pre>     </pre>
          <span>{appointment?.page}</span>
        </div>}

        {type===1 && <div className={classes.genderAge}>
          <span>{appointment.patient?.gender}</span>
          <pre>     </pre>
          <span>{appointment?.age}</span>
        </div>}

        {type===2 && <div className={classes.genderAge}>
          <span><div>Status - </div><pre> </pre>{appointment?.status}</span>
          {appointment?.status==="InProgress" && 
            <>
              <span><div>Room no -  </div><pre> </pre>{appointment?.room}</span>
              <span><div>Bed no - </div><pre> </pre>{appointment?.bed?.name}</span>
            </>
          }
        </div>}

        {type===3 && <div className={classes.genderAge}>
            <span>{appointment?.spec}</span>
            <pre>  </pre>
            <span>{appointment?.phoneNumber}</span>
            <pre>  </pre>
            <span>{appointment?.room}</span>
          </div>
        }

        {type===4 && <div className={classes.genderAge}>
            <span>{appointment.shift}</span>
            <pre>     </pre>
            <span>{appointment.phoneNumber}</span>
          </div>
        }

        {type===5 && <div className={classes.genderAge}>
            <span>{appointment.phoneNumber}</span>
          </div>
        }

      </div>

      {!discharged && (
        <div className={classes.medicalInfo}>
          <div title="Appointment time">
            {appointment?.time===undefined?"" : `${datePart} ${timePart}`}
          </div>
        </div>
      )}
      {discharged && (
        <div className={classes.medicalInfo}>
          <div title="disease">
            <span>DISEASE :</span>{" "}
            {appointment?.disease?.map((val) => val).join(", ")}
            {/* {appointment.disease} */}
          </div>
          <div title="Discharge time">
            {`${dischargeDatePart}`} {`${dischargeTimePart}`}
          </div>
        </div>
      )}
    </div>
  );
}


export {StrechBarComponent};