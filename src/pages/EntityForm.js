import React from 'react'
import {  useParams } from 'react-router-dom';

// eslint-disable-next-line
import classes from "./EntityForm.module.css"

import { NurseForm } from '../components/DEOComponents/NurseForm';
import { DoctorForm } from '../components/DEOComponents/DoctorForm';

// FormInput = ({ label, value, onChange, type = "text", id, name, ...props})

function EntityForm() {
    const { entity } = useParams();

    return (
        <div style={{paddingBottom : "20px"}}>

            {entity==="doctor" && <DoctorForm/>}
            {entity==="nurse" && <NurseForm/>}
            
        </div>
    )
}





export default EntityForm;
