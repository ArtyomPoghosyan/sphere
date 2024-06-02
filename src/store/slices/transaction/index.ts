import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { isAxiosError } from "axios";

import {  ITransactionState, ITransferInfo } from "@/models/table";
import { getTransactions } from "@/services";

const initialState: ITransactionState = {
    isLoading: false,
    isSuccess: false,
    data: {
        meta:{
            pageCount:null
        }
    },
    error: [],
}

export const getTransactionThunk = createAsyncThunk(
    "getTransaction",
    async (data: ITransferInfo, { rejectWithValue }) => {
        try {
            const resposne = await getTransactions(data)
            return Promise.resolve(resposne?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

const transactionSlice = createSlice({
    name: "getTransactions",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTransactionThunk.pending, (state: ITransactionState) => {
            state.isLoading = true
        })
        builder.addCase(getTransactionThunk.fulfilled,(state:ITransactionState,action:AnyAction) => {
            state.isLoading= false;
            state.isSuccess=true;
            state.data=action?.payload?.data
        });
        builder.addCase(getTransactionThunk.rejected,(state:ITransactionState,action:AnyAction) => {
            state.isSuccess= false;
            state.error=action?.payload
        })
    },
})

export default transactionSlice.reducer