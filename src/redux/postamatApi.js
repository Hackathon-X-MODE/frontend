import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const postamatApi = createApi({
    reducerPath: "postamatApi",
    tagTypes: ["Vendors", "Postamats"],
    baseQuery: fetchBaseQuery({ baseUrl: "https://back-hack.bigtows.org/" }),
    endpoints: (build) => ({
        getVendors: build.query({
            query: () => `vendors`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Vendors", id })),
                          { type: "Vendors", id: "LIST" }
                      ]
                    : [{ type: "Vendors", id: "LIST" }]
        }),
        getVendorById: build.query({
            query: (id) => `vendors/${id}`,
            transformResponse: (res) => {
                return [res];
            },
            providesTags: (result) =>
                // console.log('res',result),
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Vendors", id })),
                          { type: "Vendors", id: "LIST" }
                      ]
                    : [{ type: "Vendors", id: "LIST" }]
        }),
        addVendor: build.mutation({
            query: (body) => ({
                url: "vendors",
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: "Vendors", id: "LIST" }]
        }),
        updateVendor: build.mutation({
            query: (body) => ({
                url: `vendors/${body.id}`,
                method: "PATCH",
                body: body
            }),
            invalidatesTags: [{ type: "Vendors", id: "LIST" }]
        }),
        getPostamates: build.query({
            query: (id) => `vendors/${id}/postamates`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Postamats",
                              id
                          })),
                          { type: "Postamats", id: "LIST" }
                      ]
                    : [{ type: "Postamats", id: "LIST" }]
        }),
        addPostamates: build.mutation({
            query: ({ body, id }) => (
                console.log(body, id),
                {
                    url: `vendors/${id}/postamates`,
                    method: "POST",
                    body
                }
            ),
            invalidatesTags: [{ type: "Postamats", id: "LIST" }]
        }),
        updatePostamates: build.mutation({
            query: ({ body, vendorId, postamatId }) => (
                console.log(vendorId),
                {
                    url: `vendors/${vendorId}/postamates/${postamatId}`,
                    method: "PATCH",
                    body
                }
            )
        })
    })
});

export const {
    useAddVendorMutation,
    useGetVendorsQuery,
    useGetVendorByIdQuery,
    useUpdateVendorMutation,
    useGetPostamatesQuery,
    useAddPostamatesMutation,
    useUpdatePostamatesMutation
} = postamatApi;
