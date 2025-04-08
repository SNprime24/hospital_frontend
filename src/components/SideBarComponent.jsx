import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faFlaskVial, faSuitcaseMedical } from "@fortawesome/free-solid-svg-icons";

import classes from "./SideBarComponent.module.css";
import ImagePlaceHolder from "./../assets/ProfileImagePlaceHolder.png"


export default function SideBarComponent({ user }) {
    return (
        <div className={classes.sideBarWrapper}>
            <div className={classes.imageDiv}>
                <img src={ImagePlaceHolder} alt="Profile Images" />
            </div>

            <div className={classes.mainSection}>

                <div className={classes.aboutName}>
                    {(user?.role === "Doctor" ? "Dr. " : "")}{user?.name}
                </div>

                <div className={`${classes.roleButton} ${user?.role === "Doctor" ? classes.cDoctor :
                    user?.role === "Nurse" ? classes.cNurse :
                        user?.role === "DEO" ? classes.cDEO : classes.cFDO}`}>
                    {user?.role?.toUpperCase()}
                </div>

                <div className={classes.section}>
                    <span>Username : </span> {user?.userName}<br />
                    <span>Gender : </span> {user?.gender}
                </div>

                <div className={classes.section}>
                    <span>E-mail : </span> {user?.email} <br />
                    <span>Phone no. : </span> {user?.phoneNumber} <br />
                    <span>Address : </span> {user?.addr} <br />
                </div>

            </div>

            <div className={classes.movingSection}>
                {user?.role === "Doctor" ? <DoctorSideBarComponent user={user} /> :
                    user?.role === "Nurse" ? <NurseSideBarComponent user={user} /> :
                        <HospitalStaffSideBarComponent user={user} />}
            </div>

        </div>
    );
}

function DoctorSideBarComponent({ user }) {
    const [selectedPage, setSelectedPage] = useState(1);

    const handleSelectedPageOne = () => setSelectedPage(1);
    const handleSelectedPageTwo = () => setSelectedPage(2);
    const handleSelectedPageThree = () => setSelectedPage(3);

    return (
        <div className={classes.sideMainWrapper}>
            <div className={classes.sideNavBarContainer}>
                <button
                    className={(selectedPage === 1) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageOne}
                >
                    <FontAwesomeIcon icon={faAddressCard} />
                </button>

                <span className={classes.sideVerticalBar} />

                <button
                    className={(selectedPage === 2) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageTwo}
                >
                    <FontAwesomeIcon icon={faFlaskVial} />
                </button>

                <span className={classes.sideVerticalBar} />

                <button
                    className={(selectedPage === 3) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageThree}
                >
                    <FontAwesomeIcon icon={faSuitcaseMedical} />
                </button>
            </div>

            <div className={classes.sideMainContent}>
                <div className={`${classes.sideContentWrapper} ${selectedPage === 1 ? classes.one : selectedPage === 2 ? classes.two : classes.three}`}>
                    <div className={`${classes.sideContentPage} ${classes.firstPage}`}>

                        <div className={classes.section}>
                            <h3>INFO</h3>
                            <span>Specialisation : </span> {user?.spec} <br />
                            <span>Qualification : </span> {user?.qualification} <br />
                            <span>Room : </span> {user?.room.name} <br />
                        </div>

                        <div className={classes.section}>
                            <h3>TIMINGS</h3>
                            <span>IN TIME : </span> {user?.inTime} <br />
                            <span>OUT TIME : </span> {user?.outTime} <br />
                            <span>DOJ : </span> {new Date(user?.DOJ).toLocaleDateString('en-GB')} <br />
                        </div>

                    </div>

                    <div className={`${classes.sideContentPage} ${classes.secondPage}`}>
                        <h3>TESTS SUPERVISION</h3>
                        <hr />
                        <div className={classes.profileCardTest}>
                            {user?.test?.map((test, index) => (
                                <div>
                                    <span>{test?.tname}</span>
                                    <p>{test?.room}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${classes.sideContentPage} ${classes.thirdPage}`}>
                        <h3>PROFESSIONALS</h3>
                        <hr />
                        <div className={classes.profileCardHp}>
                            {user?.hp?.map((person, index) => (
                                <div>
                                    <span>{person?.name}</span>
                                    <p>{person?.degree}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NurseSideBarComponent({ user }) {
    const [selectedPage, setSelectedPage] = useState(1);

    const handleSelectedPageOne = () => setSelectedPage(1);
    const handleSelectedPageTwo = () => setSelectedPage(2);

    return (
        <div className={classes.sideMainWrapper}>
            <div className={classes.sideNavBarContainer}>
                <button
                    className={(selectedPage === 1) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageOne}
                >
                    <FontAwesomeIcon icon={faAddressCard} />
                </button>

                <span className={classes.sideVerticalBar} />

                <button
                    className={(selectedPage === 2) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageTwo}
                >
                    <FontAwesomeIcon icon={faFlaskVial} />
                </button>
            </div>

            <div className={classes.sideMainContent}>
                <div className={`${classes.sideContentWrapper} ${selectedPage === 1 ? classes.one : selectedPage === 2 ? classes.two : classes.three}`}>
                    <div className={`${classes.sideContentPage} ${classes.firstPage}`}>
                        <div className={classes.section}>
                            <span>SHIFT : </span> {user.shift} <br />
                        </div>
                    </div>
                    <div className={`${classes.sideContentPage} ${classes.secondPage}`}>
                        <h3>TESTS SUPERVISION</h3>
                        <hr />
                        <div className={classes.profileCardTest}>
                            {user.test?.map((test, index) => (
                                <div>
                                    <span>{test.tname}</span>
                                    <p>{test.room}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HospitalStaffSideBarComponent({ user }) {
    const [selectedPage, setSelectedPage] = useState(1);

    const handleSelectedPageOne = () => setSelectedPage(1);

    return (
        <div className={classes.sideMainWrapper}>
            <div className={classes.sideNavBarContainer}>
                <button
                    className={(selectedPage === 1) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageOne}
                >
                    <FontAwesomeIcon icon={faAddressCard} />
                </button>
            </div>

            <div className={classes.sideMainContent}>
                <div className={`${classes.sideContentWrapper} ${selectedPage === 1 ? classes.one : selectedPage === 2 ? classes.two : classes.three}`}>
                    <div className={`${classes.sideContentPage} ${classes.firstPage}`}>

                    </div>
                </div>
            </div>
        </div>
    );
}