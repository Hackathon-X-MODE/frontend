import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const postamatApi = createApi({
    reducerPath: "postamatApi",
    tagTypes: ["Vendors", "Postamates", "Tickets", "Comments", "Orders"],
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
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Vendors", id })),
                          { type: "Vendors", id: "LIST" }
                      ]
                    : [{ type: "Vendors", id: "LIST" }]
        }),
        getVendorsByIds: build.query({
            query: (...id) => `vendors/${id}`,
            transformResponse: (res) => {
                return [res];
            },
            providesTags: (result) =>
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
        getVendorsByList: build.query({
            query: (body) => ({
                url: `vendors/list`,
                method: "POST",
                body
            })
        }),
        getAllPostamates: build.query({
            query: () => `vendors/postamates`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Postamates",
                              id
                          })),
                          { type: "Postamates", id: "LIST" }
                      ]
                    : [{ type: "Postamates", id: "LIST" }]
        }),
        getPostamates: build.query({
            query: (id) => `vendors/${id}/postamates`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Postamates",
                              id
                          })),
                          { type: "Postamates", id: "LIST" }
                      ]
                    : [{ type: "Postamates", id: "LIST" }]
        }),
        addPostamates: build.mutation({
            query: ({ body, id }) => ({
                url: `vendors/${id}/postamates`,
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: "Postamates", id: "LIST" }]
        }),
        updatePostamates: build.mutation({
            query: ({ body, vendorId, postamatId }) => ({
                url: `vendors/${vendorId}/postamates/${postamatId}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: [{ type: "Postamates", id: "LIST" }]
        }),
        getVendorsByPostamatId: build.query({
            query: (id) => `vendors/postamates/${id}`,
            transformResponse: (res) => {
                return [res];
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Postamates",
                              id
                          })),
                          { type: "Postamates", id: "LIST" }
                      ]
                    : [{ type: "Postamates", id: "LIST" }]
        }),
        getTickets: build.query({
            query: () => `tickets/`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Tickets", id })),
                          { type: "Tickets", id: "LIST" }
                      ]
                    : [{ type: "Tickets", id: "LIST" }]
        }),
        getTicketsById: build.query({
            query: (id) => (
                {
                    url: `tickets/${id}`
                }
            ),
            transformResponse: (res) => {
                return [res];
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Tickets", id })),
                          { type: "Tickets", id: "LIST" }
                      ]
                    : [{ type: "Tickets", id: "LIST" }]
        }),
        updateTicketById: build.mutation({
            query: ({ body, id }) => ({
                url: `tickets/${id}/confirm`,
                method: "PUT",
                body
            }),
            invalidatesTags: [{ type: "Tickets", id: "LIST" }]
        }),
        confirmTicketById: build.mutation({
            query: ({ body, id }) => ({
                url: `tickets/${id}/confirm`,
                method: "PUT",
                body
            }),
            invalidatesTags: [{ type: "Tickets", id: "LIST" }]
        }),
        updateComments: build.mutation({
            query: ({ body, id }) => ({
                url: `comments/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: [{ type: "Comments", id: "LIST" }]
        }),
        //REFETCH TICKETS || COMMENTS
        getCommentsByOrderId: build.query({
            query: (id) => `comments/?orderId=${id}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Comments", id })),
                          { type: "Comments", id: "LIST" }
                      ]
                    : [{ type: "Comments", id: "LIST" }]
        }),
        getOrderById: build.query({
            query: (id) => `orders/${id}`,
            transformResponse: (res) => {
                return [res];
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Orders", id })),
                          { type: "Orders", id: "LIST" }
                      ]
                    : [{ type: "Orders", id: "LIST" }]
        })
    })
});

export const {
    useLazyGetTicketsByIdQuery,
    useAddVendorMutation,
    useLazyGetVendorsQuery,
    useLazyGetVendorByIdQuery,
    useGetVendorsQuery,
    useGetVendorByIdQuery,
    useUpdateVendorMutation,
    useGetAllPostamatesQuery,
    useLazyGetAllPostamatesQuery,
    useGetPostamatesQuery,
    useAddPostamatesMutation,
    useUpdatePostamatesMutation,
    useGetTicketsQuery,
    useGetTicketsByIdQuery,
    useUpdateTicketByIdMutation,
    useGetCommentsByOrderIdQuery,
    useLazyGetCommentsByOrderIdQuery,
    useUpdateCommentsMutation,
    useGetVendorsByPostamatIdQuery,
    useLazyGetVendorsByPostamatIdQuery,
    useLazyGetOrderByIdQuery,
    useGetVendorsByListQuery,
    useLazyGetVendorsByListQuery,
    useConfirmTicketByIdMutation
} = postamatApi;
