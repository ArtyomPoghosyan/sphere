import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { isAxiosError } from "axios";
import Cookies from "universal-cookie";

import { getUserRole, login, setPassword } from "@/services";
import { ILogin, ILoginState } from "@/models/login";
import { CommonEnum } from "@/constants";

const cookies = new Cookies();
const initialState:ILoginState={
    isLoading: false,
    isSuccess: false,
    data:[],
    validationError: null,
    error: null,
    token:cookies.get(CommonEnum.ACCESSTOKEN),
    isTemporary:cookies.get(CommonEnum.ISTEMPORARY),
    setPasswordIsLoading: false,
    setPasswordIsSuccess:false,
    setPasswordError:null,
    setPasswordData:[],
    roleIsLoading:false,
    roleIsSuccess:false,
    roleData:"",
    roleError:null,

}
export const LoginThunk = createAsyncThunk(
    "login/loginThunk", 
    async (data: ILogin, { rejectWithValue }) => {
        try {
            const response = await login(data);
            return Promise.resolve( response)
        } catch (err: unknown ) {   
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }       
        }
    }
);

export const setPasswordThunk = createAsyncThunk(
    "set-password/set-passwordThunk",
    async (data:string,{rejectWithValue})=>{
        try {
            const response = await setPassword(data);
            return Promise.resolve(response?.data)
        } catch (err: unknown ) {   
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }       
        }
    } 
)

export const getUserRoleThunk = createAsyncThunk(
    "user-role/getUserRoleThunk",
    async (_,{rejectWithValue})=>{
        try {
            const repsonse = await getUserRole();
            return Promise.resolve(repsonse?.data)
        } catch (err: unknown ) {   
            if (isAxiosError(err)) {
                return rejectWithValue(err.response?.data.message)
            }       
        }
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        setLogoutState:((state:ILoginState)=>{
            cookies.remove(CommonEnum.ACCESSTOKEN)
            cookies.remove(CommonEnum.USER)
            cookies.remove(CommonEnum.ISTEMPORARY)
            state.token=""
            state.isTemporary = false
        }),
        clearError:((state:ILoginState)=>{
            state.validationError=null
        }),
        setPasswordLoading:((state:ILoginState)=>{
            state.setPasswordIsLoading=false
        }),
        setPasswordSuccess:((state:ILoginState)=>{
            state.setPasswordIsSuccess=false
        }),
        resetIsTemprorary:((state:ILoginState)=>{
            state.isTemporary=false
        }),
        resetErrorSetPassword:((state:ILoginState) => {
            state.setPasswordError=null
        })
        
     },
    extraReducers(builder) {
        builder
        .addCase(LoginThunk.pending, (state:ILoginState)=> {
            state.isLoading = true
        })
        .addCase(LoginThunk.fulfilled, (state:ILoginState, action:AnyAction) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.token = action?.payload?.data?.data?.accessToken;
            state.isTemporary = action?.payload?.data?.data?.isTemporary
            state.isTemporary !== undefined ?
            cookies.set(CommonEnum.ISTEMPORARY, action?.payload?.data?.data?.isTemporary):null;
            cookies.set(CommonEnum.ACCESSTOKEN, action?.payload?.data?.data?.accessToken); 
            action?.meta?.arg?.email ?  
            cookies.set(CommonEnum.USER,action?.meta?.arg?.email):null;
        })
        .addCase(LoginThunk.rejected, (state:ILoginState, action:AnyAction) => {
            state.isLoading=false;
            state.validationError=action.payload
        }) 
        .addCase(setPasswordThunk.pending,(state:ILoginState) =>{
            state.setPasswordIsLoading=true;
        })
        .addCase(setPasswordThunk.fulfilled,(state:ILoginState,action:AnyAction) => {
            cookies.remove(CommonEnum.ACCESSTOKEN)
            cookies.remove(CommonEnum.ISTEMPORARY)
            cookies.set(CommonEnum.ACCESSTOKEN, action?.payload?.data?.accessToken);
            state.token = action?.payload?.data?.accessToken;
            state.setPasswordIsLoading=false;
            state.setPasswordIsSuccess=true;
            state.setPasswordData=action?.payload?.data
        })
        .addCase(setPasswordThunk.rejected,(state:ILoginState,action:AnyAction) => {
            state.setPasswordIsSuccess=false;
            state.setPasswordError=action?.payload
        })
        .addCase(getUserRoleThunk.pending,(state:ILoginState)=>{
            state.roleIsLoading=true
        })
        .addCase(getUserRoleThunk.fulfilled,(state:ILoginState,action:AnyAction) => {
            state.roleIsLoading=false;
            state.roleIsSuccess=true;
            state.roleData= action?.payload?.data?.role
        })
        .addCase(getUserRoleThunk.rejected,(state:ILoginState,action:AnyAction)=>{
            state.roleIsSuccess=false;
            state.roleError=action?.payload
        })
    }
})
export default loginSlice.reducer;
export const logOutState =  loginSlice.actions;