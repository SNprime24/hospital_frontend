import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical, faSearch } from "@fortawesome/free-solid-svg-icons";
import { BoxBarComponent } from '../components/DoctorNurseComponents/BoxBarComponent';

import classes from "./NurseMainPage.module.css";

import { useErrors } from '../hooks/hooks'
import { useGetCurrentAppointmentsQuery } from '../redux/api/api'


function NurseMainPage() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const handleSelectedPageOne = () => setSelectedPage(1);

  const currentAppointmentsData = useGetCurrentAppointmentsQuery({ entity: "nurse", _id: user._id })
  const errors = [
    { isError: currentAppointmentsData.isError, error: currentAppointmentsData.error }
  ]
  useErrors(errors);

  const currentAppointments = currentAppointmentsData?.data?.appointments?.filter(item =>
    item?.patient?.name?.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <div class={classes.mainWrapper}>
      <div className={classes.navBarContainer}>
        <button
          className={(selectedPage === 1) ? classes.activeBtn : ""}
          onClick={handleSelectedPageOne}
        >
          <FontAwesomeIcon icon={faNotesMedical} />
          <span>CURRENT PATIENTS</span>
        </button>
      </div>
      <div className={classes.searchInputDiv}>
        <input
          type="text"
          name="text"
          value={searchText}
          className={classes.searchInput}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              event.preventDefault();
            }
          }}
          placeholder="Filter by name..."
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <div className={classes.mainContent}>
        <div className={classes.contentWrapper}>
            {(!currentAppointments || currentAppointments.length === 0) && 
              <p className={classes.unavailableData}>-- No Current Patients due --</p>
            }
          <div className={classes.contentPage}>

            {/* <BoxBarComponent appointment={patient[0]}/> */}
            
            {currentAppointments && currentAppointments
              ?.map((appointment) => (
                <BoxBarComponent
                  key={appointment._id}
                  appointment={appointment}
                  handleClick={() => {
                    navigate(`patient/${appointment.patient._id}`, {
                      state: {
                        appointmentID: appointment._id,
                        patientID: appointment.patient._id
                      }
                    });
                  }}
                />
              ))
            }
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default NurseMainPage