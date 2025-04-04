import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../../assets/config.js';

const api = createApi({
    reducerPath: 'api', 
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${server}/api/v1/`,
        credentials: 'include',
    }),
    tagTypes: ['Question', 'User', 'Lab', 'Batch', 'Submission'], 

    endpoints: (builder) => ({
        getMyBatch: builder.query({
            query: ({ userId}) => ({
                url: `user/my/${userId}`
            }),
            providesTags: ['User', 'Batch'],
        }),

        getProfile: builder.query({
            query: ({userName, role}) => ({
                url: `user/other?userName=${userName}&role=${role}`,
            }),
            providesTags: ['User'],
        }),

        createLab: builder.mutation({              // used in CreateLab.js
            query: (data) => ({
                url: 'lab/createLab',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User', 'Lab'],
        }),

        startLab: builder.mutation({               // used in DropDownSubmission.jsx
            query: (labId) => ({
                url: `lab/startLab/${labId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Lab'],
        }),

        
    })
})

export default api;
export const { 
    
} = api;