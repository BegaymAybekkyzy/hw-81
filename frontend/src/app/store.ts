import {configureStore} from "@reduxjs/toolkit";
import {linksReducers} from "../store/linksSlice.ts";


export const store = configureStore({
    reducer:{
        links: linksReducers,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;