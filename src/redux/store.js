import { configureStore } from "@reduxjs/toolkit";
import { postamatApi } from "./postamatApi";

export const store = configureStore({
    reducer: {
        [postamatApi.reducerPath]: postamatApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postamatApi.middleware)
});
