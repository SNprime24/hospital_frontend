import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./DEOFormsDesign.module.css";

import { FormInput, FormSubmit, FormSelect, FormTextArea } from './FormInput';

import { useCreateTestMutation, useGetAllDoctorsQuery, useGetAllNursesQuery, useGetAllVacantRoomsQuery, useUpdateTestMutation } from '../../redux/api/api';
import { useCreateMutation, useErrors, useAsyncMutation } from '../../hooks/hooks';

function TestForm({ type, item }) {
    const [formData, setFormData] = useState({
        name: (type === "edit") ? item.item?.name : "",
        equip: (type === "edit") ? item.item?.equip : "",
        room: (type === "edit") ? item.item?.room?._id : "",
        doctor: (type === "edit") ? item.item?.doctor?._id : "",
        nurse: (type === "edit") ? item.item?.nurse?._id : "",
    })
    
    const navigate = useNavigate();
    const [create] = useCreateMutation(useCreateTestMutation);
    const [update] = useAsyncMutation(useUpdateTestMutation);
    const doctorsData = useGetAllDoctorsQuery();
    const nursesData = useGetAllNursesQuery();
    const roomData = useGetAllVacantRoomsQuery("Test Room");
    const errors = [
        { isError: doctorsData.isError, error: doctorsData.error },
        { isError: nursesData.isError, error: nursesData.error },
        { isError: roomData.isError, error: roomData.error },
    ];
    useErrors(errors);
    const doctors = doctorsData?.data?.data || [];
    const nurses = nursesData?.data?.data || [];
    const rooms = roomData?.data?.data || [];
    const doctorList = doctors?.map((doctor, index) => ({ value: doctor._id, label: doctor.name }));
    const nurseList = nurses?.map((nurse, index) => ({ value: nurse._id, label: nurse.name }));
    const roomList = rooms?.map((room, index) => ({ value: room._id, label: room.name }));

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFormData = {
            ...formData,
            id: (type === "new") ? "" : item.item?._id
        }
        if (type === "new") create("Creating Test...", newFormData, navigate);
        else update("Updating Test...", newFormData, navigate);
    }

    return (
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type === "new" ? "ADD TEST" : "EDIT TEST"}</h1>
            </div>
            <form>
                <div className={classes.formAbout}>
                    <h3>TEST DESCRIPTION</h3>
                    <FormInput
                        type="text"
                        id="Dname"
                        name="name"
                        label="Test Name"
                        value={formData.name}
                        onChange={handleFormChange}
                    />
                    <FormTextArea
                        type="text"
                        id="Dequip"
                        name="equip"
                        label="Test Equipments"
                        value={formData.equip}
                        onChange={handleFormChange}
                    />
                </div>

                <div className={classes.formFlex}>
                    <div className={classes.formAbout}>
                        <h3>DOCTOR</h3>
                        <FormSelect
                            id="Ddoctor"
                            name="doctor"
                            label="Doctor"
                            value={formData.value}
                            defaultValue={doctors?.find((doc)=>doc._id===formData?.doctor)?.name || "Choose a Doctor"}
                            defaultValueID={formData?.doctor}
                            onChange={handleFormChange}
                            options={doctorList}
                        />
                    </div>
                    <div className={classes.formAbout}>
                        <h3>NURSE</h3>
                        <FormSelect
                            id="Dnurse"
                            name="nurse"
                            label="nurse"
                            value={formData.value}
                            defaultValue={nurses?.find((nurse)=>nurse._id===formData?.nurse)?.name || "Choose a Nurse"}
                            defaultValueID={formData?.nurse}
                            onChange={handleFormChange}
                            options={nurseList}
                        />
                    </div>
                    <div className={classes.formAbout}>
                        <h3>Room</h3>
                        <FormSelect
                            id="DRoom"
                            name="room"
                            label="Room"
                            value={formData.value}
                            defaultValue={rooms?.find((room)=>room._id===formData?.room)?.name || "Choose a Room"}
                            defaultValueID={formData?.room}
                            onChange={handleFormChange}
                            options={roomList}
                        />
                    </div>
                </div>

                <div className={classes.formSubmit}>
                    <FormSubmit
                        handleSubmit={handleSubmit}
                    > Submit </FormSubmit>
                </div>
            </form>
        </div>
    );
}

export { TestForm };