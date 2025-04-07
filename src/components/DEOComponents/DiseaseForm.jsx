import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./DEOFormsDesign.module.css";

import { FormInput, FormSubmit, FormTextArea } from './FormInput';

import { useAsyncMutation, useCreateMutation } from '../../hooks/hooks';
import { useCreateDiseaseMutation, useUpdateDiseaseMutation } from '../../redux/api/api';

function DiseaseForm ({ type, item }) {
    const [formData, setFormData] = useState({
        name: (type === "edit") ? item.item?.name : "",
        symp: (type === "edit") ? item.item?.symp : "",
        desc: (type === "edit") ? item.item?.desc : ""
    })
    const [create] = useCreateMutation(useCreateDiseaseMutation);
    const [update] = useAsyncMutation(useUpdateDiseaseMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    console.log(formData);

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(type);
        setFormData(prev => ({
            ...prev,
            id: (type === "edit") ? item.item?._id : ""
        }))
        if(type === "new") create("Creating disease...", formData, navigate);
        else update("Updating disease...", formData, navigate);
        console.log(formData);
    }

    return(
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type === "new" ? "ADD DISEASE" : "EDIT DISEASE"}</h1>
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