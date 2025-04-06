import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormInput, FormSelect, FormSubmit, FormTextArea } from './FormInput';

import classes from "./DEOFormsDesign.module.css";
import { useAsyncMutation, useCreateMutation, useErrors } from '../../hooks/hooks';
import { useCreateTreatmentMutation, useGetAllDiseasesQuery, useUpdateDiseaseMutation } from '../../redux/api/api';

function TreatmentForm ({ type, item }) {
    const [formData, setFormData] = useState({
        name: (type === "edit") ? item.item?.name: "",
        disease: (type === "edit") ? item.item?.disease: "",
        desc: (type === "edit") ? item.item?.desc: ""
    })

    const [create] = useCreateMutation(useCreateTreatmentMutation);
    const [update] = useAsyncMutation(useUpdateDiseaseMutation);

    const diseaseData = useGetAllDiseasesQuery();
    const errors = [{ isError: diseaseData.isError, error: diseaseData.error }];
    useErrors(errors);

    const diseases = diseaseData?.data?.data || [];
    const diseaseList = diseases?.map(( disease, index ) => ({ value: disease._id, label: disease.name }));
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    console.log(formData);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            id: (type === "edit") ? item.item?._id : ""
        }))
        if(type === "new") create("Creating treatment...", formData, navigate);
        else update("Updating treatment...", formData, navigate);
        console.log(formData);
    }

    return(
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type === "new" ? "ADD TREATMENT" : "EDIT TREATMENT"}</h1>
            </div>
            <form>        
                <div className={classes.formAbout}>
                    <h3>TREATMENT DETAILS</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type = "text"
                            id = "name"
                            name = "name"
                            label = "Name"
                            value = {formData.name}
                            onChange={handleFormChange}
                        />
                        <FormSelect
                            id = "disease"
                            name = "disease"
                            defaultValue = "Select a Disease"
                            label = "Disease"
                            value = {formData.disease}
                            onChange = {handleFormChange}
                            options = {diseaseList}
                        />
                    </div>
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

export { TreatmentForm };