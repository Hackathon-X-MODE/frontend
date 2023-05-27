import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const postamatApi = createApi({
    reducerPath: "postamatApi",
    tagTypes: ["Vendors", "Postamates", "Tickets","TicketSubscribe", "TicketsMutation", "Comments", "Orders"],
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
            query: (page=0, status='OPEN') => (
                console.log('API PAGe',page, status),
                {
                    url: `tickets/?statuses=${status}&page=${page}&size=20&sort=deadline,ASC`,
                    method: 'GET'
                }
            ),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
            transformResponse: (res) => [res],
            providesTags: (result, error, page) =>
                result
                    ? [
                        // Provides a tag for each post in the current page,
                        // as well as the 'PARTIAL-LIST' tag.
                        ...result.map(({ number }) => ({ type: 'Tickets', number })),
                        { type: 'Tickets', id: 'PARTIAL-LIST' },
                    ]
                    : [{ type: 'Tickets', id: 'PARTIAL-LIST' }],
        }),

        getFilteredTickets: build.mutation({
            query: ({page, status}) => (
                console.log('PAGE_', page, 'STATUS_', status),
                {
                url: `tickets/?statuses=${status}&page=${page}&size=20&sort=deadline,ASC`,
                method: 'GET'
                }
            ),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
            transformResponse: (res) => [res],
            invalidatesTags: [{type: 'TicketsMutation', id: 'PARTIAL_LIST'}],
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
                          ...result.map(({ id }) =>  (console.log(id),{ type: "TicketSubscribe", id })),
                          { type: "TicketSubscribe", id: "LIST" }
                      ]
                    : [{ type: "TicketSubscribe", id: "LIST" }]
        }),
        updateTicketById: build.mutation({
            query: ({ body, id }) => ({
                url: `tickets/${id}/confirm`,
                method: "PUT",
                body
            }),
            invalidatesTags: [{ type: "TicketSubscribe", id: "LIST" }]
        }),
        confirmTicketById: build.mutation({
            query: ({ body, id }) => ({
                url: `tickets/${id}/confirm`,
                method: "PUT",
                body
            }),
            invalidatesTags: [{ type: "TicketSubscribe", id: "LIST" }]
        }),
        updateComments: build.mutation({
            query: ({ body, id }) => ({
                url: `comments/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: [{ type: "TicketSubscribe", id: "LIST" }]
        }),
        createComment: build.mutation({
            query: (body) => ({
                url: `comments/`,
                method: 'POST',
                body
            })
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
        }),
        getOrdersList: build.query({
            query: (body) => (
                console.log(body),
                {
                url: 'orders/list',
                method: 'POST',
                body
            })
        }),

        /**
         * Files
         */
        getExports: build.query({
            query: () => `comments/exports`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Exports", id })),
                        { type: "Exports", id: "LIST" }
                    ]
                    : [{ type: "Exports", id: "LIST" }]
        }),
        requestExports: build.mutation({
            query: () => ({
                url: `comments/exports`,
                method: "POST"
            }),
            invalidatesTags: [{ type: "Exports", id: "LIST" }]
        }),

        /**
         * dashboard
         */
        getTicketsStatus: build.query({
            query: () => `tickets/stats/status`,
        }),
        getTicketsStatusPerDay: build.query({
            query: () => `tickets/stats/perDay?from=2020-12-12`
        }),
        getCommentsStatus: build.query({
            query: () => `comments/stats/status `
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
    useGetOrderByIdQuery,
    useGetVendorsByListQuery,
    useLazyGetVendorsByListQuery,
    useLazyGetOrdersListQuery,
    useConfirmTicketByIdMutation,

    useGetFilteredTicketsMutation,


    useCreateCommentMutation,

    useGetOrdersListQuery,
    useLazyGetTicketsQuery,

    useGetTicketsStatusQuery,
    useGetTicketsStatusPerDayQuery,
    useGetCommentsStatusQuery,

    useGetExportsQuery,
    useRequestExportsMutation
  
} = postamatApi;
