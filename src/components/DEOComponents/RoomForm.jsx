import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormInput, FormSubmit, FormSelect } from './FormInput';

import classes from "./DEOFormsDesign.module.css";
import { useCreateMutation } from '../../hooks/hooks';
import { useCreateRoomMutation } from '../../redux/api/api';

const optionsList = [
    { value: true, label: 'AC' },
    { value: false, label: 'Non AC' },
];

const typeList = [
    { value: "Consultation", label: "Consultation" },
    { value: "ICU", label: "ICU" },
    { value: "General Ward", label: "General Ward" },
    { value: "Test Room", label: "Test Room" },
]

function RoomForm ({ type = "add" }) {
    const [formData, setFormData] = useState({
        name: "",
        type : "",
        capacity : 0,
        isAC : true,
    })
    const [create] = useCreateMutation(useCreateRoomMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    console.log(formData);

    const handleSubmit = async(e) => {
        e.preventDefault();
        create("Creating room...", formData, navigate);
        console.log(formData);
    }

    return(
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type==="add" ? "ADD ROOM" : "EDIT ROOM"}</h1>
            </div>
            <form>        
                <div className={classes.formAbout}>
                    <h3>ROOM DETAILS</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type = "text"
                            id = "name"
                            name = "name"
                            label = "name"
                            value = {formData.name}
                            onChange={handleFormChange}
                        />
                        <FormSelect
                            id = "Rtype"
                            name = "type"
                            label = "type"
                            defaultValue = "Select a room type"
                            value = {formData.type}
                            onChange = {handleFormChange}
                            options = {typeList}
                        />
                    </div>
                </div>

                <div className={classes.formAbout}>
                    <h3>ROOM DESCRIPTION</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type = "number"
                            id = "capacity"
                            name = "capacity"
                            label = "capacity"
                            value = {formData.capacity}
                            onChange={handleFormChange}
                        />
                        <FormSelect
                            id = "RisAC"
                            name = "isAC"
                            label = "isAC"
                            defaultValue = "--select a room type--"
                            value = {formData.isAC}
                            onChange={handleFormChange}
                            options = {optionsList}
                        />
                    </div>
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

export { RoomForm };