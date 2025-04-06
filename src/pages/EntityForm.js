import React from 'react'
import {  useParams } from 'react-router-dom';

// eslint-disable-next-line
import classes from "./EntityForm.module.css"

import { NurseForm } from '../components/DEOComponents/NurseForm';
import { DoctorForm } from '../components/DEOComponents/DoctorForm';
import { RoomForm } from '../components/DEOComponents/RoomForm';
import { DiseaseForm } from '../components/DEOComponents/DiseaseForm';
import { TreatmentForm } from '../components/DEOComponents/TreatmentFom';

// FormInput = ({ label, value, onChange, type = "text", id, name, ...props})

function EntityForm() {
    const { entity } = useParams();

    return (
        <div style={{paddingBottom : "20px"}}>
            { entity === "doctor" && <DoctorForm /> }
            { entity === "nurse" && <NurseForm /> }
            { entity === "room" && <RoomForm /> }
            { entity === "diseases" && <DiseaseForm /> }
            { entity === "treatment" && <TreatmentForm /> }
        </div>
    )
}





export default EntityForm;
