import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { isAxiosError } from "axios";

import { IPageData, ISupportAnswerData, ISupportState } from "@/models/table";
import { activeMessage, archiveMessage, currentSupport, getArchivedMessages, getSupport, sendMessage, supportFilter } from "@/services"

const initialState: ISupportState = {
    isLoading: false,
    isSuccess: false,
    data: [],
    error: [],
    currentLoading: false,
    currentSuccess: false,
    currentData: {
        data: {
            createdAt: "",
            message: "",
            email: "",
            name: ""
        }
    },
    currentError: [],
    archiveLoading: false,
    archiveSuccess: false,
    archiveData: [],
    archiveError: [],
    getArchiveLoading: false,
    getArchiveSuccess: false,
    getArchiveData: [],
    getArchiveError: [],
    answerLoading: false,
    answerSuccess: false,
    answerError: [],
    filterLoading: false,
    filterSuccess: false,
    filterData: {
        data: []
    },
    filterError: [],
    activeSuccess: false,
    activeData: [],
    activeError: [],
    totalPages: 0
}

export const getSupportThunk = createAsyncThunk(
    "getSupport",
    async (data: IPageData, { rejectWithValue }) => {
        try {
            const response = await getSupport(data);
            return response?.data
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }
        }
    }
)

export const getCurrentSupportThunk = createAsyncThunk(
    "getCurrentSupport",
    async (id: undefined | number, { rejectWithValue }) => {
        try {
            const response = await currentSupport(id);
            return Promise.resolve(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const sendMessageThunk = createAsyncThunk(
    "sendMessage",
    async ({ id, answer }: ISupportAnswerData, { rejectWithValue }) => {
        try {
            const response = await sendMessage({ id, answer })
            return Promise.resolve(response?.data)
        }
        catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const archiveMessageThunk = createAsyncThunk(
    "archiveMesssage",
    async (data: IPageData, { fulfillWithValue, rejectWithValue, dispatch }) => {
        const { id, take, page } = data
        try {
            const response = await archiveMessage(id);
            dispatch(getSupportThunk({ take, page }));
            fulfillWithValue(response?.data);
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }
        }
    }
)

export const getArchivedMessagesThunk = createAsyncThunk(
    "getArchivedMessages",
    async (data: IPageData, { rejectWithValue }) => {
        try {
            const response = await getArchivedMessages(data);
            return Promise.resolve(response?.data)
        }
        catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }
        }
    }
)

export const getSupportFilterThunk = createAsyncThunk(
    "getSupportFilter",
    async ({ searchValue, take, page }: IPageData, { rejectWithValue }) => {
        try {
            const response = await supportFilter({ searchValue, take, page })
            return Promise.resolve(response?.data)
        }
        catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const activeMessageThunk = createAsyncThunk(
    "activateMessage",
    async (data: IPageData, { fulfillWithValue, rejectWithValue, dispatch }) => {
        const { id, take, page } = data
        try {
            const response = await activeMessage(id);
            dispatch(getSupportThunk({ take, page }));
            fulfillWithValue(response?.data);
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    })

const supportSlice = createSlice({
    name: "supportSlice",
    initialState,
    reducers: {
        resetArchiveData: ((state: ISupportState) => {
            state.getArchiveData = []
        }),
        resetFilterData: ((state: ISupportState) => {
            state.filterData.data = []
        }),
        resetArchivedSuccess: ((state: ISupportState) => {
            state.archiveSuccess = false
        }),
        resetAnswerLoading: ((state: ISupportState) => {
            state.answerLoading = false
        }),
        resetAnswerSuccess: ((state: ISupportState) => {
            state.answerSuccess = false
        }),
        resetTotalPages: ((state: ISupportState) => {
            state.totalPages = 0
        }),
        resetCurrentError: ((state: ISupportState) => {
            state.currentError = []
        }),
        resetAnswerError: ((state: ISupportState) => {
            state.answerError = []
        })
    },
    extraReducers(builder) {
        /* get support list */
        builder.addCase(getSupportThunk.pending, (state: ISupportState) => {
            state.isLoading = true;
        });
        builder.addCase(getSupportThunk.fulfilled, (state: ISupportState, action: AnyAction) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action?.payload;
            state.totalPages = action?.payload?.data?.meta?.pageCount
        });
        builder.addCase(getSupportThunk.rejected, (state: ISupportState, action: AnyAction) => {
            state.isSuccess = false;
            state.error = action?.payload;
        });
        /* get current support*/
        builder.addCase(getCurrentSupportThunk.pending, (state: ISupportState) => {
            state.currentLoading = true;
        });
        builder.addCase(getCurrentSupportThunk.fulfilled, (state: ISupportState, action: AnyAction) => {
            state.currentLoading = false;
            state.currentSuccess = true;
            state.currentData = action?.payload;
        });
        builder.addCase(getCurrentSupportThunk.rejected, (state: ISupportState, action: AnyAction) => {
            state.currentSuccess = false;
            state.currentError = action?.payload?.message;
        });
        /* send to archive  */
        builder.addCase(archiveMessageThunk.pending, (state: ISupportState) => {
            state.archiveLoading = true;
        })
        builder.addCase(archiveMessageThunk.fulfilled, (state: ISupportState, action: AnyAction) => {
            state.archiveLoading = false;
            state.archiveSuccess = true;
            state.archiveData = action?.payload;
        });
        builder.addCase(archiveMessageThunk.rejected, (state: ISupportState, action: AnyAction) => {
            state.archiveSuccess = false;
            state.archiveError = action.payload;
        })
        /* get archive list*/
        builder.addCase(getArchivedMessagesThunk.pending, (state: ISupportState) => {
            state.getArchiveLoading = true;
        });
        builder.addCase(getArchivedMessagesThunk.fulfilled, (state: ISupportState, action: AnyAction) => {
            state.getArchiveLoading = false;
            state.getArchiveSuccess = true;
            state.data = action?.payload;
            state.totalPages = action?.payload?.data?.meta?.pageCount
        });
        builder.addCase(getArchivedMessagesThunk.rejected, (state: ISupportState, action: AnyAction) => {
            state.getArchiveSuccess = false;
            state.getArchiveError = action?.payload;
        });
        /* post message */
        builder.addCase(sendMessageThunk.pending, (state: ISupportState) => {
            state.answerLoading = true;
        });
        builder.addCase(sendMessageThunk.fulfilled, (state: ISupportState) => {
            state.answerLoading = false;
            state.answerSuccess = true;
        });
        builder.addCase(sendMessageThunk.rejected, (state: ISupportState, action: AnyAction) => {
            state.answerSuccess = false;
            state.answerError = action?.payload?.message
        })
        /* filter support list */
        builder.addCase(getSupportFilterThunk.pending, (state: ISupportState) => {
            state.filterLoading = true
        });
        builder.addCase(getSupportFilterThunk.fulfilled, (state: ISupportState, action: AnyAction) => {
            state.filterLoading = false;
            state.filterSuccess = true;
            state.data = action?.payload;
            state.totalPages = action?.payload?.data?.meta?.pageCount
        });
        builder.addCase(getSupportFilterThunk.rejected, (state: ISupportState, action: AnyAction) => {
            state.filterSuccess = false;
            state.filterError = action?.payload;
        });
        /* activate support */
        builder.addCase(activeMessageThunk.pending, (state: ISupportState) => {
            state.isLoading = true;
        })
        builder.addCase(activeMessageThunk.fulfilled, (state: ISupportState, action: AnyAction) => {
            state.isLoading = false;
            state.activeSuccess = true;
            state.activeData = action?.payload;
        });
        builder.addCase(activeMessageThunk.rejected, (state: ISupportState, action: AnyAction) => {
            state.activeSuccess = false;
            state.activeError = action?.payload
        })
    },
})

export default supportSlice.reducer;
export const handleSupportState = supportSlice.actions