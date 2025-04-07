import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./DEOFormsDesign.module.css";

import { FormInput, FormSubmit, FormTextArea } from './FormInput';

import { useAsyncMutation, useCreateMutation } from '../../hooks/hooks';
import { useCreateDrugMutation, useUpdateDrugMutation } from '../../redux/api/api';

function DrugForm ({ type, item }) {
    const [formData, setFormData] = useState({
        name: (type === "edit") ? item.item?.name : "",
        composition: (type === "edit") ? item.item?.composition : "",
    })
    const [create] = useCreateMutation(useCreateDrugMutation);
    const [update] = useAsyncMutation(useUpdateDrugMutation);
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
        if(type === "new") create("Creating Drug...", formData, navigate);
        else update("Updating Drug...", formData, navigate);
        console.log(formData);
    }

    return(
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type === "new" ? "ADD DRUG" : "EDIT DRUG"}</h1>
            </div>
            <form>        
                <div className={classes.formAbout}>
                    <h3>DRUG DETAILS</h3>
                    <FormInput
                        type = "text"
                        id = "name"
                        name = "name"
                        label = "Name"
                        value = {formData.name}
                        onChange={handleFormChange}
                    />
                    <FormTextArea
                        id = "composition"
                        name = "composition"
                        label = "Composition"
                        value = {formData.composition}
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

export { DrugForm };