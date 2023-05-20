import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const postamatApi = createApi({
    reducerPath: 'postamatApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://back-hack.bigtows.org/'}),
    endpoints: (build => ({
        getPostamatData: build.query({
            query: () => `orders/api-docs`
        }),
        addVendor: build.mutation({
            query: (body) => ({
                url: 'vendors',
                method: 'POST',
                body
            })
        })
    }))
})

export const {useGetPostamatDataQuery, useAddVendorMutation} = postamatApi