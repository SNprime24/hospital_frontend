import React from 'react'
import {  useLocation, useParams } from 'react-router-dom';

// eslint-disable-next-line
import classes from "./EntityForm.module.css"

import { NurseForm } from '../components/DEOComponents/NurseForm';
import { DoctorForm } from '../components/DEOComponents/DoctorForm';
import { RoomForm } from '../components/DEOComponents/RoomForm';
import { DiseaseForm } from '../components/DEOComponents/DiseaseForm';
import { TreatmentForm } from '../components/DEOComponents/TreatmentFom';

// FormInput = ({ label, value, onChange, type = "text", id, name, ...props})

function EntityForm() {
    const { type, entity, id } = useParams();
    const location = useLocation();
    const item = location.state;

    return (
        <div style={{paddingBottom : "20px"}}>
            { entity === "doctor" && <DoctorForm type = {type} item = {item} /> }
            { entity === "nurse" && <NurseForm type = {type} item = {item} /> }
            { entity === "room" && <RoomForm type = {type} item = {item} /> }
            { entity === "diseases" && <DiseaseForm type = {type} item = {item} /> }
            { entity === "treatment" && <TreatmentForm type = {type} item = {item} /> }
        </div>
    )
}





export default EntityForm;
