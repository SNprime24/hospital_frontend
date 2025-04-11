import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faPenClip, faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FormInput } from "../DEOComponents/FormInput";
import { ModalComponent } from "../ModalComponent";
import { SmallBoxBarComponent } from "../DoctorNurseComponents/SmallBoxBarComponent";
import { StrechBarComponent } from "../DoctorNurseComponents/StrechBarComponent";

import classes from "./AppointForm.module.css";
import admitClasses from "./AdmitForm.module.css";


const fetchNurses = [
    {
        _id: "nurse001",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        addr: "123 Park Lane, Delhi",
        phoneNumber: "9876543210",
        shift: "Morning",
        password: "securePass1",
        gender: "Female",
        qualification: "B.Sc Nursing",
        role: "Nurse"
    },
    {
        _id: "nurse002",
        name: "Manish Mehra",
        email: "manish.mehra@example.com",
        addr: "404 Sunrise Blvd, Jaipur",
        phoneNumber: "9876501122",
        shift: "Morning",
        password: "securePass2",
        gender: "Male",
        qualification: "GNM",
        role: "Nurse"
    },
    {
        _id: "nurse003",
        name: "Sneha Reddy",
        email: "sneha.reddy@example.com",
        addr: "789 Lake View, Hyderabad",
        phoneNumber: "9988776655",
        shift: "Afternoon",
        password: "securePass3",
        gender: "Female",
        qualification: "B.Sc Nursing",
        role: "Nurse"
    },
    {
        _id: "nurse004",
        name: "Rohit Kapoor",
        email: "rohit.kapoor@example.com",
        addr: "55 Lotus Enclave, Chandigarh",
        phoneNumber: "9812345678",
        shift: "Afternoon",
        password: "securePass4",
        gender: "Male",
        qualification: "ANM",
        role: "Nurse"
    },
    {
        _id: "nurse005",
        name: "Priya Menon",
        email: "priya.menon@example.com",
        addr: "81 Sea Breeze, Kochi",
        phoneNumber: "9876543201",
        shift: "Evening",
        password: "securePass5",
        gender: "Female",
        qualification: "GNM",
        role: "Nurse"
    },
    {
        _id: "nurse006",
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
        addr: "23 Hilltop Road, Dehradun",
        phoneNumber: "9001122334",
        shift: "Evening",
        password: "securePass6",
        gender: "Male",
        qualification: "B.Sc Nursing",
        role: "Nurse"
    },
    {
        _id: "nurse007",
        name: "Neha Desai",
        email: "neha.desai@example.com",
        addr: "101 Garden Plaza, Ahmedabad",
        phoneNumber: "9445566778",
        shift: "Night",
        password: "securePass7",
        gender: "Female",
        qualification: "ANM",
        role: "Nurse"
    },
    {
        _id: "nurse008",
        name: "Karan Batra",
        email: "karan.batra@example.com",
        addr: "19 Galaxy Residency, Noida",
        phoneNumber: "9554433221",
        shift: "Night",
        password: "securePass8",
        gender: "Male",
        qualification: "GNM",
        role: "Nurse"
    }
]


//   
function AdmitForm({ type = "new", formData, setFormData, handleSubmit }) {
    const [searchName, setSearchName] = useState(""); /* You will know search time from here */ 

    // const [formData, setFormData] = useState({room : "", bed : "", nurses : []});
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
    }, [])

    const [modalState, setModalState] = useState(0);

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleCloseModal = () => {
        setSearchName("");
        setFormData(prev => ({
            ...prev,
            nurses: [nurses.mNurse, nurses.aNurse, nurses.eNurse, nurses.nNurse].filter(Boolean)
        }));
        setModalState(0);
    }

    console.log(formData);
    console.log(searchName);

    return (
        <div className={classes.wrapper}>
            <div className={classes.divFlex}>
                <FormInput
                    type="text"
                    id="Aroom"
                    name="room"
                    label="Room No."
                    value={formData.room}
                    onChange={handleFormChange}
                />
                <FormInput
                    type="text"
                    id="Abed"
                    name="bed"
                    label="Bed No."
                    value={formData.bed}
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
                />
            </ModalComponent>

        </div>
    );
}

export { AdmitForm }

function ChooseNurse({
    type = "ADD",
    searchName,
    setSearchName,
    nurses,
    setNurses,
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