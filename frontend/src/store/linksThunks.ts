import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../axiosAPI.ts";
import {ILink, ILinkForm} from "../types";

export const shortLinkCreation = createAsyncThunk<ILink, ILinkForm>(
    "links/shortLinkCreation",
    async (link) => {
        const response = await axiosAPI.post("links", link);
        console.log(response.data);
        return response.data;
    }
);