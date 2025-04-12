import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { StrechBarComponent } from "../components/DoctorNurseComponents/StrechBarComponent";
import { AppointForm } from "../components/PatientForms/AppointForm";
import { AdmitForm } from "../components/PatientForms/AdmitForm";
import { ExaminationForm } from "../components/PatientForms/ExaminationForm";
import { PrescriptionForm } from "../components/PatientForms/PrescriptionForm";
import { TestForm } from "../components/PatientForms/TestForm";

import classes from "./PatientMedicalDetails.module.css";
import { FormTextArea } from "../components/DEOComponents/FormInput";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateAppointmentMutation, useUpdateAppointmentMutation } from "../redux/api/api";
import { useAsyncMutation, useCreateMutation } from "../hooks/hooks";


function PatientMedicalDetails({ appointment, type = "edit", setNewAppoint, handleDischarge }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const params = useParams();
  const patientID = params.patientID;

  const [createAppointment] = useCreateMutation(useCreateAppointmentMutation);
  const [updateAppointment] = useAsyncMutation(useUpdateAppointmentMutation);

  // appoint logic
  const [appointEdit, setAppointEdit] = useState(0);
  const [newAppointData, setNewAppointData] = useState({ date: "", time: "", doctor: appointment.doctor || null });
  const handleAppointSubmit = async () => {
    setAppointEdit(0)
    const dateTime = new Date(`${newAppointData.date}T${newAppointData.time}`);
    const time = dateTime.toISOString();
    const formData = { time, patient: patientID, doctor: newAppointData.doctor._id }
    createAppointment("Creating new appointment...", formData);
    setNewAppoint(false);
    navigate('/');
  }

  //admission logic
  const [admitEdit, setAdmitEdit] = useState(0);
  const [newAdmitData, setNewAdmitData] = useState({ 
    room: appointment.room.name || "", 
    bed: appointment.room.bed.name || "", 
    nurses: appointment.nurse || [] 
  });
  const handleAdmitSubmit = () => {
    setAdmitEdit(0);
    const admitData = {
      room: newAdmitData.room, bed: newAdmitData.bed, nurse: newAdmitData.nurses
    };
    admitData.nurse = admitData.nurse.map(n => n._id);
    const formData = { id: appointment._id, ...admitData };
    updateAppointment("Updating current appointment...", formData);
  }

  //examination logic
  const [examEdit, setExamEdit] = useState(0);
  const [newExamData, setNewExamData] = useState({ disease: [], hps: [] });
  const handleExamSubmit = () => {
    setExamEdit(0);
    const formData = { id: appointment._id, ...newExamData };
    updateAppointment("Updating current appointment...", formData);
  }
  console.log(newAdmitData);

  //prescription logic
  const [presEdit, setPresEdit] = useState(0);
  const [newPresData, setNewPresData] = useState([
    { drug: null, dosage: "" }
  ]);
  const handlePresSubmit = () => {
    setPresEdit(0);
    alert("Prescription Form Submitted");
  }

  //Test logic
  const [testEdit, setTestEdit] = useState(0);
  const [newTestData, setNewTestData] = useState([
    { test: null, remark: "" }
  ]);
  const handleTestSubmit = () => {
    setTestEdit(0);
    alert("Test Form Submitted");
  }

  // const appointment = {}

  if (type === "new") {
    return (
      <div className={classes.wrapper}>
        <h2>NEW APPOINTMENT</h2>
        <AppointForm
          formData={newAppointData}
          setFormData={setNewAppointData}
          handleSubmit={handleAppointSubmit}
        />
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>APPOINT</h3>
          <button
            className={classes.smallButton}
            title="Edit Appointment"
            onClick={() => setAppointEdit((prev) => prev ^ 1)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <hr />

        {appointEdit === 0 &&
          <>
            {console.log(appointment?.time)}
            <div>APPOINTMENT TIME : {new Date(appointment?.time).toLocaleString()}</div><br />
            <div>
              <h5>DOCTOR : </h5>
              {appointment.doctor !== undefined && <StrechBarComponent appointment={appointment?.doctor} type={3} />}
            </div>
            {user.role === "FDO" && <button onClick={handleDischarge}> DISCHARGE </button>}
          </>
        }

        {appointEdit === 1 &&
          <AppointForm
            formData={newAppointData}
            setFormData={setNewAppointData}
            handleSubmit={handleAppointSubmit}
            type="edit"
          />
        }
      </div>

      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>ADMISSION</h3>
          <button
            className={classes.smallButton}
            title="Edit Admission Form"
            onClick={() => setAdmitEdit((prev) => prev ^ 1)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <hr />

        {admitEdit === 0 &&
          <>
            <div className={classes.divFlex}>
              <div>
                <h5>ROOM No. </h5> {appointment?.room?.name}
              </div>
              <div>
                <h5>Bed No. </h5> {appointment?.room?.bed?.name}
              </div>
            </div>
            <div>
              <h5>NURSES : </h5>
              {appointment?.nurse?.map((val, _) => (
                <StrechBarComponent appointment={val} type={4} />
              ))}
            </div>
            {user.role === "FDO" && <button> DISCHARGE </button>}
          </>
        }

        {admitEdit === 1 &&
          <AdmitForm
            formData={newAdmitData}
            setFormData={setNewAdmitData}
            handleSubmit={handleAdmitSubmit}
            type="edit"
          />
        }
      </div>

      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>EXAMINATION</h3>
          <button
            className={classes.smallButton}
            title="Edit Admission Form"
            onClick={() => setExamEdit((prev) => prev ^ 1)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <hr />

        {examEdit === 0 && <>
          <div>
            <h2>DISEASE : </h2>
            {appointment?.disease?.map((val, _) => val.name).join(", ")}
          </div>
          <div>
            <h5>HOSPITAL PROFESSIONALS : </h5>
            {appointment?.hps?.map((val, _) => (
              <StrechBarComponent appointment={val} type={5} />
            ))}
          </div>
        </>
        }

        {examEdit === 1 &&
          <ExaminationForm
            formData={newExamData}
            setFormData={setNewExamData}
            handleSubmit={handleExamSubmit}
            type="edit"
          />
        }
      </div>



      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>TESTS</h3>
          <button
            className={classes.smallButton}
            title="Edit Tests Form"
            onClick={() => setTestEdit((prev) => prev ^ 1)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <hr />

        {testEdit === 0 && <>
          <div>
            {appointment?.tests?.map((test, _) => {
              return (
                <>
                  <h2>{test.test.name}</h2>
                  <div className={classes.testInfo}>
                    <span>{test.test.doctor.name}</span>
                    <span>{test.test.room.name}</span>
                  </div>
                  <p>
                    {test.remark}
                  </p>
                </>
              );
            })}
          </div>
        </>
        }

        {testEdit === 1 &&
          <TestForm
            formData={newTestData}
            setFormData={setNewTestData}
            handleSubmit={handleTestSubmit}
            type="edit"
          />
        }
      </div>



      <div className={classes.wrapperForm}>
        <div className={classes.divFlex}>
          <h3>PRESCRIPTION</h3>
          <button
            className={classes.smallButton}
            title="Edit Prescription Form"
            onClick={() => setPresEdit((prev) => prev ^ 1)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <hr />

        {presEdit === 0 && <>
          <div>
            {appointment?.drugs?.map((drug, _) => {
              return (
                <>
                  <h4>{drug.drug.name}</h4>
                  <p>
                    {drug.dosage}
                  </p>
                </>
              );
            })}
          </div>
        </>
        }

        {presEdit === 1 &&
          <PrescriptionForm
            formData={newPresData}
            setFormData={setNewPresData}
            handleSubmit={handlePresSubmit}
            type="edit"
          />
        }
      </div>

      <div className={classes.wrapperForm}>
        <h3>REMARKS</h3>
        <hr />
        {(user.role === "Doctor" && {/*(user._id===appointment.doctor._id)*/ }) &&
          <>
            <h5>TODAY's REMARK ({new Date().toLocaleDateString()})</h5>
            <FormTextArea />
            <button>SUBMIT</button>
          </>
        }
        {appointment?.remarks?.map((val, _) => (
          <>
            <h5>{val.remarkTime}</h5>
            <span>{val.remarkUser}({val.remarkUserRole})</span>
            <p>{val.remarkMsg}</p>
          </>
        ))}
      </div>

    </div>
  );
}

export default PatientMedicalDetails;