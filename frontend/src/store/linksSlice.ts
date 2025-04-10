import {ILink} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {shortLinkCreation} from "./linksThunks.ts";
import {RootState} from "../app/store.ts";

interface LinksState {
    link: ILink | null;
    loading: boolean;
}

const initialState: LinksState = {
    link: null,
    loading: false,
}

export const selectLink = (state: RootState) => state.links.link;
export const loading = (state: RootState) => state.links.loading;

const linksSlice = createSlice({
    name: "links",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(shortLinkCreation.pending, (state) => {
                state.loading = true;
            })
            .addCase(shortLinkCreation.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.link = payload;
            })
            .addCase(shortLinkCreation.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const linksReducers = linksSlice.reducer;