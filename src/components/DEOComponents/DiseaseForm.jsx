import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormInput, FormSubmit, FormTextArea } from './FormInput';

import classes from "./DEOFormsDesign.module.css";
import { useCreateMutation } from '../../hooks/hooks';
import { useCreateDiseaseMutation } from '../../redux/api/api';

function DiseaseForm ({ type = "add" }) {
    const [formData, setFormData] = useState({
        name: "",
        symp: "",
        desc: ""
    })
    const [create] = useCreateMutation(useCreateDiseaseMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    console.log(formData);

    const handleSubmit = async(e) => {
        e.preventDefault();
        create("Creating disease...", formData, navigate);
        console.log(formData);
    }

    return(
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type==="add" ? "ADD DISEASE" : "EDIT DISEASE"}</h1>
            </div>
            <form>        
                <div className={classes.formAbout}>
                    <h3>DISEASE DETAILS</h3>
                    <FormInput
                        type = "text"
                        id = "name"
                        name = "name"
                        label = "Name"
                        value = {formData.name}
                        onChange={handleFormChange}
                    />
                    <FormTextArea
                        id = "symp"
                        name = "symp"
                        label = "Symptoms"
                        value = {formData.symp}
                        onChange = {handleFormChange}
                    />
                    <FormTextArea
                        id = "desc"
                        name = "desc"
                        label = "Description"
                        value = {formData.desc}
                        onChange = {handleFormChange}
                    />
                </div>
                <div className={classes.formSubmit}>
                    <FormSubmit 
                        handleSubmit = {handleSubmit}
                    > Submit </FormSubmit>
                </div>
            </form>
        </div>
    );
}

export { DiseaseForm };