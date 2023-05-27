import { configureStore } from "@reduxjs/toolkit";
import { postamatApi } from "./postamatApi";
import {fileApi} from "./fileApi";

export const store = configureStore({
    reducer: {
        [postamatApi.reducerPath]: postamatApi.reducer,
        [fileApi.reducerPath]: fileApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postamatApi.middleware, fileApi.middleware)
});
