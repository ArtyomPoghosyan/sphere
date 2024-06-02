import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { isAxiosError } from "axios";

import { IChangePassword, IManagerFormData, IManagerState, IPageData, IUpdateRequest } from "@/models/table"
import { addManager, changePassword, deleteManager, getCurrentManager, getManagers, updateManager } from "@/services"

const initialState: IManagerState = {
    isLoading: false,
    isSuccess: false,
    data: {
        meta:{
            pageCount:null
        }
    },
    error: [],
    addManagerLoading: false,
    addManagerSuccess: false,
    addManagerError: "",
    deleteManagerLoading: false,
    deleteManagerSuccess: false,
    deleteManagerError: "",
    editManagerLoading: false,
    editManagerSuccess: false,
    editManagerData: [],
    editManagerError: [],
    updateManagerLoading: false,
    updateManagerSuccess: false,
    updateManagerError: "",
    changePasswordLoading: false,
    changePasswordSuccess: false,
    changePasswordError: "",
}

export const getManagersThunk = createAsyncThunk(
    "getManagers",
    async (data: IPageData, { rejectWithValue }) => {
        try {
            const response = await getManagers(data)
            return Promise.resolve(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }
        }
    }
)

export const addManagerThunk = createAsyncThunk(
    "addManager",
    async (data: IManagerFormData, { fulfillWithValue, rejectWithValue, dispatch }) => {
        try {
            const response = await addManager(data);

            dispatch(getManagersThunk({ take: 10, page: 1}))
            return fulfillWithValue(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const deleteManagerThunk = createAsyncThunk(
    "deleteMAnager",
    async (data: IPageData, { fulfillWithValue, rejectWithValue, dispatch }) => {
        const { id, take, page } = data
        try {
            if(id){
                const response = await deleteManager(+id);
                dispatch(getManagersThunk({ take, page }));
                fulfillWithValue(response?.data)
            }
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }
        }
    }
)

export const currentManagerThunk = createAsyncThunk(
    "getCurrentMAnager",
    async (id: undefined | string | number, { rejectWithValue }) => {
        try {
            const resposne = await getCurrentManager(id);
            return Promise.resolve(resposne?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }
        }
    }
)

export const updateManagerThunk = createAsyncThunk(
    "updateManager",
    async ({ id, changedVals }: IUpdateRequest , { fulfillWithValue, rejectWithValue, dispatch }) => {
        try {
            const response = await updateManager(id, changedVals);
            dispatch(currentManagerThunk(id))
            fulfillWithValue(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                dispatch(currentManagerThunk(id))
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const changePasswordThunk = createAsyncThunk(
    "changePassword",
    async ({ id, password }: IChangePassword, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await changePassword({ id, password });
            fulfillWithValue(response?.data)
        }
        catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }
        }
    }
)

const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        setEditLoading: ((state: IManagerState) => {
            state.editManagerLoading = false
        }),
        setUpdateError: ((state: IManagerState) => {
            state.updateManagerError = ""
        }),
        setAddError: ((state: IManagerState) => {
            state.addManagerError = ""
        }),
        setUpdateSuccess: ((state: IManagerState) => {
            state.updateManagerSuccess = false
        }),
        setChangeSuccess: ((state: IManagerState) => {
            state.changePasswordSuccess = false
        }),
        setAddSuccess: ((state: IManagerState) => {
            state.addManagerSuccess = false
        }),
        setDeleteManager: ((state: IManagerState) => {
            state.deleteManagerSuccess = false
        }),
        setChangePassLoading: ((state: IManagerState) => {
            state.changePasswordLoading = false
        }),
        setEditManagerError: ((state: IManagerState) => {
            state.editManagerError = []
        }),
        setChangePassError: ((state: IManagerState) => {
            state.changePasswordError = ""
        }),
        setManagerDeleteError: ((state: IManagerState) => {
            state.deleteManagerError = ""
        }),
        setLoadingError:((state:IManagerState)=>{
            state.addManagerLoading=false
        })

    },
    extraReducers(builder) {
        builder.addCase(getManagersThunk.pending, (state: IManagerState) => {
            state.isLoading = true
        });
        builder.addCase(getManagersThunk.fulfilled, (state: IManagerState, action: AnyAction) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action?.payload?.data
        });
        builder.addCase(getManagersThunk.rejected, (state: IManagerState, action: AnyAction) => {
            state.isSuccess = false;
            state.error = action?.payload
        });
        /* add manager */
        builder.addCase(addManagerThunk.pending, (state: IManagerState) => {
            state.addManagerLoading = true;
            state.addManagerSuccess = false;
        })
        builder.addCase(addManagerThunk.fulfilled, (state: IManagerState) => {
            state.addManagerLoading = false;
            state.addManagerSuccess = true;
        })
        builder.addCase(addManagerThunk.rejected, (state: IManagerState, action: AnyAction) => {
            state.addManagerSuccess = false;
            state.addManagerError = action?.payload;
            state.addManagerLoading = false;
        });
        /* delete manager */
        builder.addCase(deleteManagerThunk.pending, (state: IManagerState) => {
            state.deleteManagerLoading = true
        });
        builder.addCase(deleteManagerThunk.fulfilled, (state: IManagerState) => {
            state.deleteManagerLoading = false;
            state.deleteManagerSuccess = true;
        });
        builder.addCase(deleteManagerThunk.rejected, (state: IManagerState, action: AnyAction) => {
            state.deleteManagerSuccess = false;
            state.deleteManagerError = action.payload
        });
        /* current manager */
        builder.addCase(currentManagerThunk.pending, (state: IManagerState) => {
            state.editManagerLoading = true
        });
        builder.addCase(currentManagerThunk.fulfilled, (state: IManagerState, action: AnyAction) => {
            state.editManagerLoading = false;
            state.editManagerSuccess = true;
            state.editManagerData = action?.payload?.data
        });
        builder.addCase(currentManagerThunk.rejected, (state: IManagerState, action: AnyAction) => {
            state.editManagerSuccess = false;
            state.editManagerError = action?.payload
        });
        /* update manager */
        builder.addCase(updateManagerThunk.pending, (state: IManagerState) => {
            state.updateManagerLoading = true;
            state.updateManagerSuccess = false;
        });
        builder.addCase(updateManagerThunk.fulfilled, (state: IManagerState) => {
            state.updateManagerLoading = false;
            state.updateManagerSuccess = true;
        })
        builder.addCase(updateManagerThunk.rejected, (state: IManagerState, action: AnyAction) => {
            state.updateManagerSuccess = false;
            state.updateManagerError = action?.payload;
            state.updateManagerLoading = false;
        });
        /* change password */
        builder.addCase(changePasswordThunk.pending, (state: IManagerState) => {
            state.changePasswordLoading = true;
            state.changePasswordSuccess = false;
        });
        builder.addCase(changePasswordThunk.fulfilled, (state: IManagerState) => {
            state.changePasswordLoading = false;
            state.changePasswordSuccess = true;
        });
        builder.addCase(changePasswordThunk.rejected, (state: IManagerState, action: AnyAction) => {
            state.changePasswordSuccess = false;
            state.changePasswordError = action?.payload
        })
    },
})

export default managerSlice.reducer;
export const handleManagerstate = managerSlice.actions