import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../../assets/config.js';

const generateCrudEndpoints = (builder, entity) => ({
    [`getAll${entity}s`]: builder.query({
        query: () => ({ url: `${entity.toLowerCase()}/all` }),
        providesTags: [entity],
    }),

    [`getThis${entity}`]: builder.query({
        query: (id) => ({ url: `${entity.toLowerCase()}/this/${id}` }),
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
    tagTypes: ['Doctor', 'Nurse', 'HS', 'Appointment', 'Patient', 'HP', 'Bed'],
    endpoints: (builder) => ({
        ...generateCrudEndpoints(builder, 'Doctor'),
        ...generateCrudEndpoints(builder, 'Nurse'),
        ...generateCrudEndpoints(builder, 'HP'),
        ...generateCrudEndpoints(builder, 'HS'),
        ...generateCrudEndpoints(builder, 'Patient'),
        ...generateCrudEndpoints(builder, 'Room'),
        ...generateCrudEndpoints(builder, 'Test'),
        ...generateCrudEndpoints(builder, 'Disease'),
        ...generateCrudEndpoints(builder, 'Appointment'),
        ...generateCrudEndpoints(builder, 'Drug'),

        createAppointment: builder.mutation({
            query: (data) => ({
                url: `appointment/new`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Appointment', 'Doctor', 'Patient'], 
        }),

        updateAppointment: builder.mutation({
            query: (data) => ({
                url: `appointment/update`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Appointment', 'Doctor', 'Patient'], 
        }),

        getAllVacantBeds: builder.query({
            query: () => ({
                url: `/room/bed/allVacantBeds`,
            }),
            providesTags: ['Room', 'Bed'],
        }),

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
        }),

        getAllCurrentDoctors: builder.query({
            query: () => ({
                url: `hs/currentDoctors`,
            }),
            providesTags: ['HS', 'Doctor'],
        }),

        getAllCurrentNurses: builder.query({
            query: () => ({
                url: `hs/currentNurses`,
            }),
            providesTags: ['HS', 'Nurse'],
        }),

        getAllCurrentAppointments: builder.query({
            query: () => ({
                url: `hs/currentAppointments`,
            }),
            providesTags: ['HS', 'Appointment'],
        }),

        getPatientByNumber: builder.query({
            query: (phoneNo) => ({
                url: `patient/${phoneNo}`,
            }),
            providesTags: ['Patient', 'Appointment', 'Doctor'],
        }),

        dischargeAppointment: builder.mutation({
            query: (body) => ({
                url:  `appointment/discharge`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Appointment', 'Patient'],
        }),
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
    useGetAllCurrentDoctorsQuery,
    useGetAllCurrentNursesQuery,
    useGetAllCurrentAppointmentsQuery,

    useGetAllPatientsQuery,
    useGetThisPatientQuery,
    useLazyGetThisPatientQuery,
    useLazyGetPatientByNumberQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,

    useGetAllRoomsQuery,
    useGetThisRoomQuery,
    useGetAllVacantRoomsQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetAllVacantBedsQuery,

    useGetAllTestsQuery,
    useGetThisTestQuery,
    useCreateTestMutation,
    useUpdateTestMutation,
    useDeleteTestMutation,

    useGetAllDiseasesQuery,
    useGetThisDiseaseQuery,
    useCreateDiseaseMutation,
    useUpdateDiseaseMutation,
    useDeleteDiseaseMutation,

    useGetAllAppointmentsQuery,
    useGetThisAppointmentQuery,
    useLazyGetThisAppointmentQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
    useGetCurrentAppointmentsQuery,
    useDischargeAppointmentMutation,

    useGetAllDrugsQuery,
    useGetThisDrugQuery,
    useCreateDrugMutation,
    useUpdateDrugMutation,
    useDeleteDrugMutation,
} = api;

