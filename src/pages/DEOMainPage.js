import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faGreaterThan, faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./DEOMainPage.module.css";

import {
    useGetAllHSsQuery,
    useGetAllHPsQuery,
    useGetAllDrugsQuery,
    useGetAllRoomsQuery,
    useGetAllTestsQuery,
    useGetAllNursesQuery,
    useGetAllDoctorsQuery,
    useGetAllDiseasesQuery,
    useGetAllPatientsQuery,
    useDeleteDoctorMutation,
    useDeleteNurseMutation,
    useDeleteHPMutation,
    useDeleteHSMutation,
    useDeletePatientMutation,
    useDeleteRoomMutation,
    useDeleteDrugMutation,
    useDeleteTestMutation,
    useDeleteDiseaseMutation,
} from '../redux/api/api';
import { useErrors } from '../hooks/hooks';


function DEOMainPage() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [searchText, setSearchText] = useState("");
    const navBarRef = useRef(null);
    const navigate = useNavigate();

    const queryMap = {
        DOCTOR: useGetAllDoctorsQuery(undefined, { skip: selectedComponent !== "DOCTOR" }),
        NURSE: useGetAllNursesQuery(undefined, { skip: selectedComponent !== "NURSE" }),
        "HOSPITAL PROFESSIONALS": useGetAllHPsQuery(undefined, { skip: selectedComponent !== "HOSPITAL PROFESSIONALS" }),
        "HOSPITAL STAFF": useGetAllHSsQuery(undefined, { skip: selectedComponent !== "HOSPITAL STAFF" }),
        PATIENTS: useGetAllPatientsQuery(undefined, { skip: selectedComponent !== "PATIENTS" }),
        ROOM: useGetAllRoomsQuery(undefined, { skip: selectedComponent !== "ROOM" }),
        DRUGS: useGetAllDrugsQuery(undefined, { skip: selectedComponent !== "DRUGS" }),
        TESTS: useGetAllTestsQuery(undefined, { skip: selectedComponent !== "TESTS" }),
        DISEASES: useGetAllDiseasesQuery(undefined, { skip: selectedComponent !== "DISEASES" }),
    };

    const selectedData = queryMap[selectedComponent] || {};

    const errors = Object.values(queryMap).map(q => ({
        isError: q.isError,
        error: q.error,
    }));
    useErrors(errors);

    const allData = selectedData?.data?.data || [];
    const data = allData.filter(item =>
        item.name?.toLowerCase().includes(searchText.toLowerCase())
    );

    const [deleteDoctor] = useDeleteDoctorMutation();
    const [deleteNurse] = useDeleteNurseMutation();
    const [deleteHP] = useDeleteHPMutation();
    const [deleteHS] = useDeleteHSMutation();
    const [deletePatient] = useDeletePatientMutation();
    const [deleteRoom] = useDeleteRoomMutation();
    const [deleteDrug] = useDeleteDrugMutation();
    const [deleteTest] = useDeleteTestMutation();
    const [deleteDisease] = useDeleteDiseaseMutation();

    const deleteMap = {
        DOCTOR: deleteDoctor,
        NURSE: deleteNurse,
        "HOSPITAL PROFESSIONALS": deleteHP,
        "HOSPITAL STAFF": deleteHS,
        PATIENTS: deletePatient,
        ROOM: deleteRoom,
        DRUGS: deleteDrug,
        TESTS: deleteTest,
        DISEASES: deleteDisease,
    };


    const scrollLeft = () => {
        navBarRef.current.scrollLeft -= 150;
    }
    const scrollRight = () => {
        navBarRef.current.scrollLeft += 150;
    }

    return (
        <div className={classes.mainWrapper}>
            <div className={classes.navBarContainer}>
                <button onClick={scrollLeft} className={classes.scrollBtn}><FontAwesomeIcon icon={faLessThan} /></button>
                <div ref={navBarRef} className={classes.navBar}>
                    {[
                        "DOCTOR",
                        "NURSE",
                        "HOSPITAL PROFESSIONALS",
                        "HOSPITAL STAFF",
                        "PATIENTS",
                        "ROOM",
                        "DRUGS",
                        "TESTS",
                        "DISEASES"
                    ].map((item, index) => (
                        <span key={index} className={`${classes.navItem} ${item===selectedComponent ? classes.active : ""}`} onClick={() => {
                            setSelectedComponent(item)
                        }}>
                            {item}
                        </span>
                    ))}
                </div>
                <button onClick={scrollRight} className={classes.scrollBtn}><FontAwesomeIcon icon={faGreaterThan} /></button>
            </div>
            {selectedComponent === null && <div className={classes.dataList}></div>}
            {selectedComponent != null && <div className={classes.dataList}>
                <div className={classes.dataSubHeader}>
                    <div className={classes.searchInputDiv}>
                        <input
                            type="text"
                            name="text"
                            value={searchText}
                            className={classes.searchInput}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Tab") {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <button
                        className={classes.addNewData}
                        onClick={() => navigate(`form/new/${selectedComponent?.toLowerCase().split(" ").join("")}`)}
                    >
                        ADD
                    </button>
                </div>

                <div className={classes.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th className={classes.actionButtons}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td className={classes.actionButtons}>
                                        <div className={classes.actionBtn} onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`form/edit/${selectedComponent?.toLowerCase().split(" ").join("")}`, {
                                                state: { item }
                                            })
                                        }}>📝</div>
                                        <div className={classes.actionBtn} onClick={(e) => {
                                            e.preventDefault();
                                            const deleteItem = deleteMap[selectedComponent];
                                            if(deleteItem) deleteItem({ id: item._id });
                                        }}
                                        >❌</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>}
        </div>
    )
}

export default DEOMainPage