import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip, faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FormInput, FormSelect } from "../DEOComponents/FormInput";
import { ModalComponent } from "../ModalComponent";
import { SmallBoxBarComponent } from "../DoctorNurseComponents/SmallBoxBarComponent";
import { StrechBarComponent } from "../DoctorNurseComponents/StrechBarComponent";

import classes from "./AppointForm.module.css";
import admitClasses from "./AdmitForm.module.css";
import { useGetAllNursesQuery, useGetAllVacantRoomsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks";

 
function AdmitForm({ type = "new", formData, setFormData, handleSubmit }) {
    const [modalState, setModalState] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [nurses, setNurses] = useState({ mNurse: null, aNurse: null, eNurse: null, nNurse: null });

    useEffect(() => {
        if (formData?.nurses?.length > 0) {
            const newNurses = {
                mNurse: formData.nurses.find(n => n.shift === "Morning") || null,
                aNurse: formData.nurses.find(n => n.shift === "Afternoon") || null,
                eNurse: formData.nurses.find(n => n.shift === "Evening") || null,
                nNurse: formData.nurses.find(n => n.shift === "Night") || null,
            };
            setNurses(newNurses);
        }
    }, [formData.nurses])

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleCloseModal = () => {
        setSearchName("");
        setFormData(prev => ({
            ...prev,
            nurses: [nurses.mNurse, nurses.aNurse, nurses.eNurse, nurses.nNurse].filter(Boolean)
        }));
        setModalState(0);
    }

    const nursesData = useGetAllNursesQuery();
    const roomsData = useGetAllVacantRoomsQuery("General Ward");
    const errors = [
        { isError: nursesData.isError, error: nursesData.error },
        { isError: roomsData.isError, error: roomsData.error },
    ];
    useErrors(errors);
    const fetchNurses = nursesData?.data?.data?.filter(item =>
        item?.name?.toLowerCase().includes(searchName.toLowerCase())
    )
    const rooms = roomsData?.data?.data || [];
    const roomsList = rooms?.map((room, index) => ({ value: room._id, label: room.name }));

    return (
        <div className={classes.wrapper}>
            <div className={classes.divFlex}>
                <FormSelect
                    id="Aroom"
                    name="room"
                    label="Room No."
                    value={formData.room}
                    defaultValue={formData.room}
                    onChange={handleFormChange}
                    options={roomsList}
                />
                <FormInput
                    type="text"
                    id="Abed"
                    name="bed"
                    label="Bed No."
                    value={formData.bed}
                    defaultValue={formData.bed}
                    onChange={handleFormChange}
                />
            </div>

            <h5>ASSIGN NURSES : </h5>
            {formData?.nurses.length === 0 ?
                <button
                    className={classes.chooseInput}
                    onClick={() => setModalState(1)}
                >
                    <FontAwesomeIcon icon={faPlusCircle} />
                </button>
                :
                <>
                    {formData?.nurses.map((val, _) => (
                        <div className={classes.divFlex} key={val?._id || _}>
                            <StrechBarComponent appointment={val} type={4} />
                            <button
                                className={`${classes.chooseInput} ${classes.edit}`}
                                onClick={() => setModalState(1)}
                            >
                                <FontAwesomeIcon icon={faPenClip} />
                            </button>
                            <button
                                className={`${classes.chooseInput} ${classes.edit} ${admitClasses.cross}`}
                                onClick={() => {
                                    const shiftKeyMap = {
                                        "Morning": "mNurse",
                                        "Afternoon": "aNurse",
                                        "Evening": "eNurse",
                                        "Night": "nNurse"
                                    };
                                    const shiftKey = shiftKeyMap[val.shift];

                                    setFormData(prev => ({
                                        ...prev,
                                        nurses: prev.nurses.filter(nurse => nurse._id !== val._id)
                                    }));

                                    setNurses(prev => ({
                                        ...prev,
                                        [shiftKey]: null
                                    }))
                                }}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    ))}
                </>
            }

            <button className={classes.submitBtn} onClick={handleSubmit}>
                Submit
            </button>


            <ModalComponent
                modalState={modalState}
                onHandleClose={handleCloseModal}
            >
                <ChooseNurse
                    type={type === "new" ? "ADD" : "EDIT"}
                    searchName={searchName}
                    setSearchName={setSearchName}
                    nurses={nurses}
                    setNurses={setNurses}
                    fetchNurses={fetchNurses}
                />
            </ModalComponent>

        </div>
    );
}

export { AdmitForm }

function ChooseNurse ({
    type = "ADD",
    searchName,
    setSearchName,
    nurses,
    setNurses,
    fetchNurses
}) {
    return (
        <div className={classes.chooseWrapper}>
            <h2>{type} NURSES</h2>
            <div className={classes.searchInputDiv}>
                <input
                    type="text"
                    name="Namme"
                    value={searchName}
                    className={classes.searchInput}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Tab") {
                            event.preventDefault();
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Filter by Name..."
                />
            </div>
            <h5> SHIFT - MORNING </h5>
            <div className={admitClasses.slidingList}>
                {fetchNurses?.filter(n => n.shift === "Morning")
                    .map((val, _) => (
                        <SmallBoxBarComponent user={val}
                            handleClick={() => setNurses((prev) => ({ ...prev, "mNurse": val }))}
                            isActive={val?._id === nurses?.mNurse?._id}
                        />
                    ))}
            </div>
            <h5> SHIFT - AFTERNOON </h5>
            <div className={admitClasses.slidingList}>
                {fetchNurses?.filter(n => n.shift === "Afternoon")
                    .map((val, _) => (
                        <SmallBoxBarComponent user={val}
                            handleClick={() => setNurses((prev) => ({ ...prev, "aNurse": val }))}
                            isActive={val?._id === nurses?.aNurse?._id}
                        />
                    ))}
            </div>
            <h5> SHIFT - EVENING </h5>
            <div className={admitClasses.slidingList}>
                {fetchNurses?.filter(n => n.shift === "Evening")
                    .map((val, _) => (
                        <SmallBoxBarComponent user={val}
                            handleClick={() => setNurses((prev) => ({ ...prev, "eNurse": val }))}
                            isActive={val?._id === nurses?.eNurse?._id}
                        />
                    ))}
            </div>
            <h5> SHIFT - NIGHT </h5>
            <div className={admitClasses.slidingList}>
                {fetchNurses?.filter(n => n.shift === "Night")
                    .map((val, _) => (
                        <SmallBoxBarComponent user={val}
                            handleClick={() => setNurses((prev) => ({ ...prev, "nNurse": val }))}
                            isActive={val?._id === nurses?.nNurse?._id}
                        />
                    ))}
            </div>
        </div>
    )
}