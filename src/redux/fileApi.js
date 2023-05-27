import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const fileApi = createApi({
    reducerPath: "fileApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://back-hack.bigtows.org/",
    mode: "no-cors"
    }),
    endpoints: (build) => ({
        getImport: build.mutation({
            query: (body) => ({
                url: `orders/import/xlsx`,
                method: 'POST',
                body,
                headers: {
                    "X-External-System-ID": "YM",
                },
                formData: true
            })
        }),
    })
});

export const {
    useGetImportMutation,
} = fileApi;
