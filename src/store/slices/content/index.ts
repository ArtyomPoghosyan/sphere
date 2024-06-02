import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { isAxiosError } from "axios";

import { addNews, deleteNews, getAllNews, getCurrentNews, getNews, language, updateNews } from "@/services";
import { IContentState, ICurrentNews, IPageData } from "@/models/table";

const initialState: IContentState = {
    isLoading: false,
    isSuccess: false,
    data: {
        meta: {
            pageCount: null
        }
    },
    error: [],
    deleteContentLoading: false,
    deleteContentSuccess: false,
    deleteContentError: "",
    addContentLoading: false,
    addContentSuccess: false,
    addContentError: "",
    currentContentLoading: false,
    currentContentSuccess: false,
    currentContentData: {
        content: "",
        data: []
    },
    currentContentError: [],
    allLanguageLoading: false,
    allLanguageSuccess: false,
    allLanguageData: [],
    allLanguageError: "",
    updateContentLoading: false,
    updateContentSuccess: false,
    updateContentError: "",
    languageIsLoading: false,
    language: []
}

export const getNewsThunk = createAsyncThunk(
    "getNews",
    async (data: IPageData, { rejectWithValue }) => {
        try {
            const response = await getNews(data);
            return Promise.resolve(response?.data?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const deleteNewsThunk = createAsyncThunk(
    "deleteNews",
    async (data: IPageData, { fulfillWithValue, rejectWithValue, dispatch }) => {
        const { id, take, page } = data
        try {
            const response = await deleteNews(id);
            dispatch(getNewsThunk({ take, page }));
            return fulfillWithValue(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const addNewsThunk = createAsyncThunk(
    "addNews",
    async (data: FormData, { fulfillWithValue, rejectWithValue, dispatch }) => {
        try {
            const response = await addNews(data)
            dispatch(getNewsThunk({ take: 10, page: 1 }))
            return fulfillWithValue(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const getCurrentNewsThunk = createAsyncThunk(
    "getcurrentNews",
    async ({ id, lang }: ICurrentNews, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await getCurrentNews({ id, lang } as ICurrentNews);
            return fulfillWithValue(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const getAllNewsThunk = createAsyncThunk(
    "getAllNews",
    async (id: number | string | undefined, { rejectWithValue }) => {
        try {
            const repsonse = await getAllNews(id)
            return Promise.resolve(repsonse?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const updateNewsThunk = createAsyncThunk(
    "updateNews",
    async ({ id, formData }: any, {  rejectWithValue }) => {
        console.log(id,formData)
        try {
            const response = await updateNews(id, formData);
            // dispatch(getCurrentNewsThunk({ id,lang:"en" }))
            Promise.resolve(response?.data)
            // return fulfillWithValue(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

export const getLanguageThunk = createAsyncThunk(
    "getLanguage",
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await language();
            return fulfillWithValue(response?.data)
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data)
            }
        }
    }
)

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        resetCurrentData: ((state: IContentState) => {
            state.currentContentData.data = []
        }),
        setAddSuccess: ((state: IContentState) => {
            state.addContentSuccess = false
        }),
        setAddError: ((state: IContentState) => {
            state.addContentError = ""
        }),
        setDeleteSuccess: ((state: IContentState) => {
            state.deleteContentSuccess = false
        }),
        setUpdateLoading: ((state: IContentState) => {
            state.updateContentLoading = false
        }),
        setUpdateSuccess: ((state: IContentState) => {
            state.updateContentSuccess = false
        }),
        setAddLoading: ((state: IContentState) => {
            state.addContentLoading = false
        }),
        setCurrentError: ((state: IContentState) => {
            state.currentContentError = []
        }),
        setUpdateError: ((state: IContentState) => {
            state.updateContentError = ""
        }),
        setDeleteContentError: ((state: IContentState) => {
            state.deleteContentError = ""
        }),
        resetAllLanguageNewsData: ((state: IContentState) => {
            state.allLanguageData = []
        })
    },
    extraReducers(builder) {
        builder.addCase(getNewsThunk.pending, (state: IContentState) => {
            state.isLoading = true;
        });
        builder.addCase(getNewsThunk.fulfilled, (state: IContentState, action: AnyAction) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action?.payload;
        });
        builder.addCase(getNewsThunk.rejected, (state: IContentState, action: AnyAction) => {
            state.isSuccess = false;
            state.error = action?.payload;
        });
        /* delete news */
        builder.addCase(deleteNewsThunk.pending, (state: IContentState) => {
            state.deleteContentLoading = true;
        })
        builder.addCase(deleteNewsThunk.fulfilled, (state: IContentState) => {
            state.deleteContentLoading = false;
            state.deleteContentSuccess = true;
        });
        builder.addCase(deleteNewsThunk.rejected, (state: IContentState, action: AnyAction) => {
            state.deleteContentSuccess = false;
            state.deleteContentError = action?.payload
        })
        /* add news */
        builder.addCase(addNewsThunk.pending, (state: IContentState) => {
            state.addContentLoading = true
        })
        builder.addCase(addNewsThunk.fulfilled, (state: IContentState) => {
            state.addContentLoading = false;
            state.addContentSuccess = true;
        })
        builder.addCase(addNewsThunk.rejected, (state: IContentState, action: AnyAction) => {
            state.addContentSuccess = false;
            state.addContentLoading = false;
            state.addContentError = action?.payload
        })
        /* get current news */
        builder.addCase(getCurrentNewsThunk.pending, (state: IContentState) => {
            state.currentContentLoading = true;
        })
        builder.addCase(getCurrentNewsThunk.fulfilled, (state: IContentState, action: AnyAction) => {
            state.currentContentLoading = false;
            state.currentContentSuccess = true;
            state.currentContentData = action?.payload
        })
        builder.addCase(getCurrentNewsThunk.rejected, (state: IContentState, action: AnyAction) => {
            state.currentContentSuccess = false;
            state.currentContentError = action?.payload.message
        });

        /* get all news data*/
        builder.addCase(getAllNewsThunk.pending, (state: IContentState) => {
            state.allLanguageLoading = true;
        })
        builder.addCase(getAllNewsThunk.fulfilled, (state: IContentState, action: AnyAction) => {
            state.allLanguageLoading = false;
            state.allLanguageSuccess = true;
            state.allLanguageData = action?.payload
        })
        builder.addCase(getAllNewsThunk.rejected, (state: IContentState, action: AnyAction) => {
            state.allLanguageSuccess = false;
            state.allLanguageError = action?.payload?.message
        })
        /* update news */
        builder.addCase(updateNewsThunk.pending, (state: IContentState) => {
            state.updateContentLoading = true;
        });
        builder.addCase(updateNewsThunk.fulfilled, (state: IContentState) => {
            state.updateContentLoading = false;
            state.updateContentSuccess = true;
            state.updateContentError = ""
        })
        builder.addCase(updateNewsThunk.rejected, (state: IContentState, action: AnyAction) => {
            state.updateContentSuccess = false;
            state.updateContentLoading = false;
            state.updateContentError = action?.payload;
        })
        /* get lanhguage */
        builder.addCase(getLanguageThunk.pending, (state: IContentState) => {
            state.languageIsLoading = true;
        })
        builder.addCase(getLanguageThunk.fulfilled, (state: IContentState, action: AnyAction) => {
            state.languageIsLoading = false;
            state.language = action?.payload?.data
        })
    },
})

export default contentSlice.reducer;
export const handleNewsState = contentSlice.actions