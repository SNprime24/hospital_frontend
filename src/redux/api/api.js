import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../../assets/config.js';

const generateCrudEndpoints = (builder, entity) => ({
    [`getAll${entity}s`]: builder.query({
        query: () => ({ url: `${entity.toLowerCase()}/all` }),
        providesTags: [entity],
    }),

    [`getThis${entity}`]: builder.query({
        query: (id) => ({ url: `${entity.toLowerCase()}/${id}` }),
        providesTags: [entity],
    }),

    [`create${entity}`]: builder.mutation({
        query: (data) => ({
            url: `${entity.toLowerCase()}/new`,
            method: 'POST',
            body: data,
        }),
        invalidatesTags: [entity],
    }),

    [`update${entity}`]: builder.mutation({
        query: (data) => ({
            url: `${entity.toLowerCase()}/update`,
            method: 'PUT',
            body: data,
        }),
        invalidatesTags: [entity],
    }),
});

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/`,
        credentials: 'include',
    }),
    tagTypes: ['Doctor', 'Nurse'],
    endpoints: (builder) => ({
        ...generateCrudEndpoints(builder, 'Doctor'),
        ...generateCrudEndpoints(builder, 'Nurse'),
        ...generateCrudEndpoints(builder, 'HP'),
        ...generateCrudEndpoints(builder, 'HS'),
        ...generateCrudEndpoints(builder, 'Patient'),
        ...generateCrudEndpoints(builder, 'Room'),
        ...generateCrudEndpoints(builder, 'Test'),
        ...generateCrudEndpoints(builder, 'Treatment'),
        ...generateCrudEndpoints(builder, 'Disease'),
        ...generateCrudEndpoints(builder, 'Appointment'),
        ...generateCrudEndpoints(builder, 'Drug'),

        getAllVacantDocRooms: builder.query({
            query: () => ({
                url: `room/allVacantDocRooms`,
            }),
            providesTags: ['Room'],
        })
    }),
});

export default api;
export const {
    useGetAllDoctorsQuery,
    useGetThisDoctorQuery,
    useCreateDoctorMutation,
    useUpdateDoctorMutation,

    useGetAllNursesQuery,
    useGetThisNurseQuery,
    useCreateNurseMutation,
    useUpdateNurseMutation,

    useGetAllHPsQuery,
    useGetThisHPQuery,
    useCreateHPMutation,
    useUpdateHPMutation,

    useGetAllHSsQuery,
    useGetThisHSQuery,
    useCreateHSMutation,
    useUpdateHSMutation,

    useGetAllPatientsQuery,
    useGetThisPatientQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,

    useGetAllRoomsQuery,
    useGetThisRoomQuery,
    useGetAllVacantDocRoomsQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,

    useGetAllTestsQuery,
    useGetThisTestQuery,
    useCreateTestMutation,
    useUpdateTestMutation,

    useGetAllTreatmentsQuery,
    useGetThisTreatmentQuery,
    useCreateTreatmentMutation,
    useUpdateTreatmentMutation,

    useGetAllDiseasesQuery,
    useGetThisDiseaseQuery,
    useCreateDiseaseMutation,
    useUpdateDiseaseMutation,

    useGetAllAppointmentsQuery,
    useGetThisAppointmentQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,

    useGetAllDrugsQuery,
    useGetThisDrugQuery,
    useCreateDrugMutation,
    useUpdateDrugMutation,
} = api;

