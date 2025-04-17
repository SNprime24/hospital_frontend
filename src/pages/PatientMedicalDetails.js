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
import { useParams } from "react-router-dom";
import { useCreateAppointmentMutation, useUpdateAppointmentMutation } from "../redux/api/api";
import { useAsyncMutation, useCreateMutation } from "../hooks/hooks";


function PatientMedicalDetails({ appointment, type = "edit", setNewAppoint, handleDischarge }) {
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const patientID = params.patientID;
  console.log(appointment);

  const [createAppointment] = useCreateMutation(useCreateAppointmentMutation);
  const [updateAppointment] = useAsyncMutation(useUpdateAppointmentMutation);

  // appoint logic
  const [appointEdit, setAppointEdit] = useState(0);
  const [newAppointData, setNewAppointData] = useState({ date: "", time: "", doctor: appointment?.doctor || null });
  const handleAppointSubmit = async () => {
    setAppointEdit(0)
    const dateTime = (type === "new") ? new Date(`${newAppointData.date}T${newAppointData.time}`) : "";
    const time = (dateTime) ? dateTime.toLocaleString() : "";
    let formData;
    if(type === "new") formData = { time, patient: patientID, doctor: newAppointData?.doctor?._id, user: user?._id }
    else formData = { id: appointment?._id, doctor: newAppointData.doctor._id };
    if(type === "new" )createAppointment("Creating new appointment...", formData);
    else updateAppointment("Updating current appointment...", formData);
    if(type === "new") setNewAppoint(false);
  }

  //admission logic
  const [admitEdit, setAdmitEdit] = useState(0);
  const [newAdmitData, setNewAdmitData] = useState({
    room: appointment?.room?._id || "",
    bed: appointment?.bed?._id || "",
    nurses: appointment?.nurse || []
  });
  const handleAdmitSubmit = () => {
    setAdmitEdit(0);
    const admitData = {
      room: newAdmitData.room, bed: newAdmitData.bed, nurse: newAdmitData.nurses
    };
    admitData.nurse = admitData.nurse.map(n => n._id);
    const formData = { id: appointment?._id, ...admitData };
    updateAppointment("Updating current appointment...", formData);
  }

  //examination logic
  const [examEdit, setExamEdit] = useState(0);
  const [newExamData, setNewExamData] = useState({
    disease: appointment?.disease || [],
    hps: appointment?.hps || []
  });
  const handleExamSubmit = () => {
    setExamEdit(0);
    const formData = { id: appointment?._id, ...newExamData };
    updateAppointment("Updating current appointment...", formData);
  }
  console.log(newAdmitData);

  //Test logic
  const [testEdit, setTestEdit] = useState(0);
  const [newTestData, setNewTestData] = useState(appointment?.tests || [{ test: null, remark: "" }]);
  const handleTestSubmit = () => {
    setTestEdit(0);
    const formData = { id: appointment._id, tests: newTestData };
    updateAppointment("Updating current appointment...", formData);
  }

  //prescription logic
  const [presEdit, setPresEdit] = useState(0);
  const [newPresData, setNewPresData] = useState(appointment?.drugs || [{ drug: null, dosage: "" }]);
  const handlePresSubmit = () => {
    setPresEdit(0);
    const formData = { id: appointment?._id, drugs: newPresData };
    updateAppointment("Updating current appointment...", formData);
  }

  const [remark, setRemark] = useState("");
  const handleRemarkSubmit = () => {
    const remarkTime = new Date(Date.now());
    const formData = {
      id: appointment._id,
      remarks: [...appointment?.remarks, {
        remarkUserId: user._id,
        remarkTime,
        remarkUser: user?.name,
        remarkUserRole: user?.role,
        remarkMsg: remark
      }]
    }
    updateAppointment("Updating current appointment...", formData);
    setRemark("");
  }

  const appRemarks = appointment?.remarks?.slice()
    .sort((a,b)=>new Date(b.remarkTime) - new Date(a.remarkTime));
  
  console.log("tuu", appRemarks);

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
          {user.role === "FDO" &&
            <button
              className={classes.smallButton}
              title="Edit Appointment"
              onClick={() => setAppointEdit((prev) => prev ^ 1)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          }
        </div>
        <hr />

        {appointEdit === 0 &&
          <div className={classes.appointPart}>
            {console.log(appointment?.time)}
            <div className={classes.subHeading}><span>APPOINTMENT <pre> </pre> TIME <pre> </pre>:<pre> </pre></span> {new Date(appointment?.time).toLocaleString()}</div><br />
            <div>
              <h5>DOCTOR : </h5>
              {appointment.doctor !== undefined && <StrechBarComponent appointment={appointment?.doctor} type={3} />}
            </div>
            {user.role === "FDO" && <button onClick={handleDischarge} className={`${classes.appBtn} ${classes.discharge}`}> DISCHARGE </button>}
          </div>
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
          {user.role === "FDO" &&
            <button
              className={classes.smallButton}
              title="Edit Admission Form"
              onClick={() => setAdmitEdit((prev) => prev ^ 1)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          }
        </div>
        <hr />

        {admitEdit === 0 &&
          <>
            <div className={classes.divFlex}>
              <div>
                <h5>ROOM No. </h5> {appointment?.bed?.name?.split('-')[0]}
              </div>
              <div>
                <h5>Bed No. </h5> {appointment?.bed?.name?.split('-')[2]}
              </div>
            </div>
            <div>
              <h5>NURSES : </h5>
              {appointment?.nurse?.map((val, _) => (
                <StrechBarComponent appointment={val} type={4} />
              ))}
            </div>
            {user.role === "FDO" && <button className={`${classes.appBtn} ${classes.discharge}`}> DISCHARGE </button>}
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
          {user.role === "Doctor" && user._id === appointment?.doctor?._id &&
            <button
              className={classes.smallButton}
              title="Edit Admission Form"
              onClick={() => setExamEdit((prev) => prev ^ 1)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          }
        </div>
        <hr />

        {examEdit === 0 && 
          <div className={classes.appExam}>
            <div className={classes.firstPart}>
              <h2>DISEASE : </h2>
              <span>{appointment?.disease?.map((val, _) => val.name).join(", ")}</span>
            </div>
            <div className={classes.secondPart}>
              <h5>HOSPITAL PROFESSIONALS : </h5>
              {appointment?.hps?.map((val, _) => (
                <StrechBarComponent appointment={val} type={5} />
              ))}
            </div>
          </div>
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
          {user.role === "Doctor" &&
            (user._id === appointment?.doctor?._id ||
              appointment?.tests.find((test) => test.doctor._id === user._id)) &&
            <button
              className={classes.smallButton}
              title="Edit Tests Form"
              onClick={() => setTestEdit((prev) => prev ^ 1)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          }
        </div>
        <hr />

        {testEdit === 0 && <>
          <div>
            {appointment?.tests?.map((test, _) => {
              return (
                <div className={classes.appTest}>
                  <div>
                    <p>{test?.test?.name}</p>
                    <div>
                      <span>{test?.test?.doctor?.name}</span>
                      <span>•</span>
                      <span>{test?.test?.room?.name}</span>
                    </div>
                  </div>
                  <p>
                    {test?.remark}
                  </p>
                  <hr/>
                </div>
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
          {user.role === "Doctor" && user._id === appointment?.doctor?._id &&
            <button
              className={classes.smallButton}
              title="Edit Prescription Form"
              onClick={() => setPresEdit((prev) => prev ^ 1)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          }
        </div>
        <hr />

        {presEdit === 0 && <>
          <div>
            {appointment?.drugs?.map((drug, _) => {
              return (
                <div className={classes.medicine}>
                  <div>{drug?.drug?.name}</div>
                  <p>-{drug.dosage}</p>
                </div>
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
        {((user.role === "Doctor" || user.role === "Nurse") &&
          (
            user._id === appointment?.doctor._id ||
            appointment?.nurse?.find(val => val._id === user._id)
          )) &&
          <>
            <h5>TODAY's REMARK ({new Date().toLocaleDateString()})</h5>
            <FormTextArea
              type="text"
              id="Dremark"
              name="Remark"
              label="Today's Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
            <button onClick={handleRemarkSubmit} className={classes.appBtn}>SUBMIT</button>
          </>
        }
        {appRemarks?.map((val, _) => (
          <div className={classes.remarkEntry}>
            <div>
              <div>
                <div>{val.remarkUser}</div><pre> </pre><p>({val.remarkUserRole})</p>
              </div>
              <h5>{new Date(val.remarkTime).toLocaleDateString()}</h5>
            </div>
            <p>{val.remarkMsg}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PatientMedicalDetails;