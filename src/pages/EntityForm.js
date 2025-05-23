import React from 'react'
import {  useLocation, useParams } from 'react-router-dom';

import { NurseForm } from '../components/DEOComponents/NurseForm';
import { DoctorForm } from '../components/DEOComponents/DoctorForm';
import { HPForm } from '../components/DEOComponents/HPForm';
import { HSForm } from '../components/DEOComponents/HSForm';
import { RoomForm } from '../components/DEOComponents/RoomForm';
import { DrugForm } from '../components/DEOComponents/DrugForm';
import { TestForm } from '../components/DEOComponents/TestForm';
import { DiseaseForm } from '../components/DEOComponents/DiseaseForm';
import { PatientForm } from '../components/DEOComponents/PatientForm';


function EntityForm({ isFDO }) {
    const { type, entity } = useParams();
    const location = useLocation();
    const item = location.state;
    if(isFDO) {
        return( <div style={{paddingBottom : "20px"}}> <PatientForm type = {type} item = {item} /> </div> )
    }

    return (
        <div style={{paddingBottom : "20px"}}>
            { entity === "doctor"                && <DoctorForm    type = {type} item = {item} /> }
            { entity === "nurse"                 && <NurseForm     type = {type} item = {item} /> }
            { entity === "hospitalprofessionals" && <HPForm        type = {type} item = {item} /> }
            { entity === "hospitalstaff"         && <HSForm        type = {type} item = {item} /> }
            { entity === "patients"              && <PatientForm   type = {type} item = {item} /> }
            { entity === "room"                  && <RoomForm      type = {type} item = {item} /> }
            { entity === "drugs"                 && <DrugForm      type = {type} item = {item} /> }
            { entity === "tests"                 && <TestForm      type = {type} item = {item} /> }
            { entity === "diseases"              && <DiseaseForm   type = {type} item = {item} /> }
        </div>
    )
}

export default EntityForm;