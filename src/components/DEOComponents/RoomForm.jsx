import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./DEOFormsDesign.module.css";

import { FormInput, FormSubmit, FormSelect } from './FormInput';
import { ACList, roomTypeList } from '../Lists/lists';

import { useAsyncMutation, useCreateMutation } from '../../hooks/hooks';
import { useCreateRoomMutation, useUpdateRoomMutation } from '../../redux/api/api';

function RoomForm ({ type, item }) {
    const [formData, setFormData] = useState({
        name: (type === "edit") ? item.item?.name.split(' ')[0] : "",
        type : (type === "edit") ? item.item?.type : "",
        capacity : (type === "edit") ? item.item?.capacity : 0,
        isAC : (type === "edit") ? item.item?.gender : true,
    })

    const [create] = useCreateMutation(useCreateRoomMutation);
    const [update] = useAsyncMutation(useUpdateRoomMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    console.log(formData);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev, 
            id: (type === "new") ? "" : item.item?._id
        }))
        if(type === "new") create("Creating room...", formData, navigate);
        else update("Updating room...", formData, navigate);
        console.log(formData);
    }

    return(
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type==="new" ? "ADD ROOM" : "EDIT ROOM"}</h1>
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
                            options = {roomTypeList}
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
                            options = {ACList}
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