import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { isAxiosError } from "axios";

import { IPageData, IUSerState } from "@/models/table";
import { activateUser, deactivateUser, deleteUser, getUsers } from "@/services";

const initialState: IUSerState = {
    isLoading: false,
    isSuccess: false,
    data: {
        meta:{
            pageCount:null
        }
    },
    error: [],
    deleteLoading: false,
    deleteSuccess: false,
    deleteError: "",
    deactivateLoading: false,
    deactivateSuccess: false,
    deactivateError: [],
    activateLoading: false,
    activateSuccess: false,
    activateError: [],
}

export const getUsersThunk = createAsyncThunk(
    "users/usersThunk",
    async (data: IPageData, { rejectWithValue }) => {
        try {
            const response = await getUsers(data);
            return Promise.resolve(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }
        }
    }
)

export const deleteUserThunk = createAsyncThunk(
    "delete-user",
    async (data: IPageData, { fulfillWithValue, rejectWithValue, dispatch }) => {
        const { id, take, page } = data
        try {
            const response = await deleteUser(id);
            dispatch(getUsersThunk({ take, page }))
            return fulfillWithValue(response?.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error?.response?.data?.message)
        }
    }
)

export const deactivateUserThunk = createAsyncThunk(
    "deactivate-user",
    async (id: number, { fulfillWithValue, rejectWithValue, dispatch }) => {
        try {
            const response= await deactivateUser(id);
            dispatch(getUsersThunk({ take: 10, page: 1 }))
            return fulfillWithValue(response)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error?.response?.data?.message)
        }
    }
)

export const activateUserThunk = createAsyncThunk(
    "active-user",
    async (id: number, { fulfillWithValue, rejectWithValue, dispatch }) => {
        try {
            const response = await activateUser(id);
            dispatch(getUsersThunk({ take: 10, page: 1  }))
            return fulfillWithValue(response?.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error))
                return rejectWithValue(error?.response?.data?.message)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleDeactiveSuccess: ((state: IUSerState) => {
            state.deactivateSuccess = false
        }),
        resetDeleteUser: ((state: IUSerState) => {
            state.deleteSuccess = false
        }),
        setDeleteUserError: ((state: IUSerState) => {
            state.deleteError = ""
        })

    },
    extraReducers(builder) {
        /* get users */
        builder.addCase(getUsersThunk.pending, (state: IUSerState) => {
            state.isLoading = true
        });
        builder.addCase(getUsersThunk.fulfilled, (state: IUSerState, action: AnyAction) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action?.payload?.data
        })
        builder.addCase(getUsersThunk.rejected, (state: IUSerState, action: AnyAction) => {
            state.isSuccess = false;
            state.error = action.payload
        });
        /* delete user*/
        builder.addCase(deleteUserThunk.pending, (state: IUSerState) => {
            state.deleteLoading = true
        })
        builder.addCase(deleteUserThunk.fulfilled, (state: IUSerState) => {
            state.deleteLoading = false;
            state.deleteSuccess = true;
        })
        builder.addCase(deleteUserThunk.rejected, (state: IUSerState, action: AnyAction) => {
            state.deleteSuccess = false;
            state.deleteError = action?.payload
        })
        /* deactivate user */
        builder.addCase(deactivateUserThunk.pending, (state: IUSerState) => {
            state.deactivateLoading = true
        })
        builder.addCase(deactivateUserThunk.fulfilled, (state: IUSerState) => {
            state.deactivateLoading = false;
            state.deactivateSuccess = true;
        })
        builder.addCase(deactivateUserThunk.rejected, (state: IUSerState, action: AnyAction) => {
            state.deactivateSuccess = false;
            state.deactivateError = action?.payload
        })
        /* activate user */
        builder.addCase(activateUserThunk.pending, (state: IUSerState) => {
            state.activateLoading = true
        });
        builder.addCase(activateUserThunk.fulfilled, (state: IUSerState) => {
            state.activateLoading = false;
            state.activateSuccess = true;
        });
        builder.addCase(activateUserThunk.rejected, (state: IUSerState, action: AnyAction) => {
            state.activateSuccess = false;
            state.activateError = action?.payload
        })
    }
})

export default userSlice.reducer;
export const handleUserState = userSlice.actions