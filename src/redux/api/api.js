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

    [`delete${entity}`]: builder.mutation({
        query: (data) => ({
            url: `${entity.toLowerCase()}/delete`,
            method: 'DELETE',
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

        getAllVacantRooms: builder.query({
            query: (type) => ({
                url: `room/allVacantRooms?type=${type}`,
            }),
            providesTags: ['Room'],
        }),

        getAppointments: builder.query({
            query: ({ _id }) => ({
                url: `doctor/appointments/?_id=${_id}`,
            }),
            providesTags: ['Doctor'],
        }),

        getCurrentAppointments: builder.query({
            query: ({ entity, _id }) => ({
                url: `appointment/currentAppointments/?entity=${entity}&_id=${_id}`,
            }),
            providesTags: ['Appointment', 'Doctor', 'Nurse'],
        })
    }),
});

export default api;
export const {
    useGetAllDoctorsQuery,
    useGetThisDoctorQuery,
    useCreateDoctorMutation,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
    useGetAppointmentsQuery,

    useGetAllNursesQuery,
    useGetThisNurseQuery,
    useCreateNurseMutation,
    useUpdateNurseMutation,
    useDeleteNurseMutation,

    useGetAllHPsQuery,
    useGetThisHPQuery,
    useCreateHPMutation,
    useUpdateHPMutation,
    useDeleteHPMutation,

    useGetAllHSsQuery,
    useGetThisHSQuery,
    useCreateHSMutation,
    useUpdateHSMutation,
    useDeleteHSMutation,

    useGetAllPatientsQuery,
    useGetThisPatientQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,

    useGetAllRoomsQuery,
    useGetThisRoomQuery,
    useGetAllVacantRoomsQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,

    useGetAllTestsQuery,
    useGetThisTestQuery,
    useCreateTestMutation,
    useUpdateTestMutation,
    useDeleteTestMutation,

    useGetAllTreatmentsQuery,
    useGetThisTreatmentQuery,
    useCreateTreatmentMutation,
    useUpdateTreatmentMutation,
    useDeleteTreatmentMutation,

    useGetAllDiseasesQuery,
    useGetThisDiseaseQuery,
    useCreateDiseaseMutation,
    useUpdateDiseaseMutation,
    useDeleteDiseaseMutation,

    useGetAllAppointmentsQuery,
    useGetThisAppointmentQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
    useGetCurrentAppointmentsQuery,

    useGetAllDrugsQuery,
    useGetThisDrugQuery,
    useCreateDrugMutation,
    useUpdateDrugMutation,
    useDeleteDrugMutation,
} = api;

