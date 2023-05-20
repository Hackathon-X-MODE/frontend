import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const postamatApi = createApi({
    reducerPath: 'postamatApi',
    tagTypes: ['Vendors'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://back-hack.bigtows.org/'}),
    endpoints: (build => ({
        getVendors: build.query({
            query: () => `vendors`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Vendors', id })),
                        { type: 'Vendors', id: 'LIST' },
                    ]
                    : [{ type: 'Vendors', id: 'LIST' }],
        }),
        getVendorById: build.query({
           query : (id) => `vendors/${id}`
        }),
        addVendor: build.mutation({
            query: (body) => ({
                url: 'vendors',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Vendors', id: 'LIST'}]
        }),
        updateVendor: build.mutation({
            query: (body) => ({
                url: `vendors/${body.id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: [{type: 'Vendors', id: 'LIST'}]
        })
    }))
})

export const {
    useAddVendorMutation,
    useGetVendorsQuery,
    useGetVendorByIdQuery,
    useUpdateVendorMutation
} = postamatApi