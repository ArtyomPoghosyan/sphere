export interface ILogin {
    email:string,
    password:string
}

export interface ILoginState {
    isLoading: boolean,
    isSuccess: boolean,
    data:string[],
    validationError: null,
    error: null,
    token:string,
    isTemporary:boolean | undefined,
    setPasswordIsLoading: boolean,
    setPasswordIsSuccess:boolean,
    setPasswordError:null
    setPasswordData:any,
    roleIsLoading:boolean,
    roleIsSuccess:boolean,
    roleData:strign,
    roleError:null,
}
