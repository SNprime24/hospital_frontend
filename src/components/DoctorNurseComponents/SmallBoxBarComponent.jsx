import React from "react";

import ProfileImagePlaceholder from "./../../assets/ProfileImagePlaceholderGrey.jpg"

import classes from "./SmallBoxBarComponent.module.css";

function SmallBoxBarComponent({ user, handleClick, isActive=false }) {
  // console.log(user);
  
  return (
    <div 
      className={`${classes.wrapper} 
                  ${user.role==="Nurse"?classes.smallWrapper : ""} 
                  ${isActive ? classes.activeWrapper:""}`
                }
      onClick={(e)=>{
        e.stopPropagation();
        handleClick();
      }}
    >
      <div className={classes.sketch}>
        <div className={classes.sketchGeneral}>
          <div className={classes.generalProfileImage} title="Profile Image">
            <img
              src={ProfileImagePlaceholder}
              alt="profileImage"
            />
          </div>
          <div className={classes.generalInformation}>
            <div className={classes.name} title="Profile name">{user?.name}</div>
            <hr/>
            <div className={classes.specGender}>
              {user.role==="Doctor" && <span title="Specialisation">{user?.spec}</span>}
              {user.role==="Nurse" && <span title="Shift">{user?.shift}</span>}
              <span title="gender">{user?.gender}</span>
            </div>
            <hr/>
          </div>
        </div>

        <div className={classes.contacts}>
            <div className={classes.contactInfo}>
                <span title="Email">{user?.email}</span>
                <span title="Phone">{user?.phoneNumber}</span>
            </div>
            {user.role==="Doctor" && <hr/>}
            {user.role==="Doctor" &&
                <div className={classes.contactInfo}>
                    <span title="in Time"> In Time - {user?.inTime}</span>
                    <div title="out Time">Out Time - {user?.outTime}</div>
                </div>
            }
        </div>
      </div>
    </div>
  );
}


export {SmallBoxBarComponent};