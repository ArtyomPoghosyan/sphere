import { CommonEnum, TransferStatusEnum } from '@/constants/enum';
import { ILogin } from '@/models/login';
import { IChangePassword, ICurrentNews, IManagerData, IManagerFormData, IPageData, ISupportAnswerData, ITransferInfo, IUpdateNewsReq } from '@/models/table';
import axios, { AxiosResponse } from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const accessToken = cookies.get(CommonEnum.ACCESSTOKEN)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

/* Login call api */
export const login = (data: ILogin): Promise<AxiosResponse<ILogin>>  => {
  return api.post<ILogin>("auth/login", data)
}

/* set Password for managers call api */
export const setPassword = (data:string)=>{
  console.log(data)
  return api.patch("auth/set-password",data)
}

export const getUserRole = () =>{
  return api.get("user/me")
}

/* user call api */
export const getUsers = (data: IPageData):Promise<AxiosResponse<IPageData>> => {
  const { take, page } = data
  return api.get<IPageData>(`/user`, {
    params: {
      take,
      page,
    }
  })
}
/* user delete */
export const deleteUser = (id: number |string | undefined):Promise<AxiosResponse<number>> => {
  return api.delete<number>(`/user/${id}`)
}
/* user deactivate */
export const deactivateUser = (id: number): Promise<AxiosResponse<number>> => {
  return api.patch<number>(`/user/${id}`)
}
/* user active */
export const activateUser = (id: number):Promise<AxiosResponse<number>> => {
  return api.patch<number>(`/user/active/${id}`)
}

/**
 * This function for getting all meneger data and return poxos petros martiros
 * @param id
 * @returns array of menegers
 */
export const getManagers = (data: IPageData):Promise<AxiosResponse<IPageData>> => {
  const { take, page } = data;
  return api.get<IPageData>("/manager", {
    params: {
      take,
      page
    }
  })
}
/* add manager */
export const addManager = (data: IManagerFormData):Promise<AxiosResponse<IManagerFormData>> => {
  return api.post<IManagerFormData>("/manager", data)
}
/* delete manager */
export const deleteManager = (id: number | undefined):Promise<AxiosResponse<number>> => {
  return api.delete<number>(`/manager/${id}`)
}
/* current manager */
export const getCurrentManager = (id: undefined | number | string):Promise<AxiosResponse<number>> => {
  return api.get<number>(`/manager/${id}`)
}
/* update manager */
export const updateManager = (id: string | number | undefined, changedVals: IManagerData | undefined):Promise<AxiosResponse<IManagerData>> => {
  return api.patch<IManagerData >(`/manager/${id}`, changedVals)
}

/* change password */
export const changePassword = ({ password, id }: IChangePassword):Promise<AxiosResponse<IChangePassword>> => {
  return api.patch<IChangePassword>(`/manager/set-password/${id}`, { password })
}

/*support call api*/
export const getSupport = (data: IPageData):Promise<AxiosResponse<IPageData>> => {
  const { take, page } = data
  return api.get<IPageData>('/support', {
    params: {
      status: 0,
      take,
      page
    }
  })
}
/* support filter */
export const supportFilter = ({ searchValue, take, page }: IPageData):Promise<AxiosResponse<IPageData>> => {
  return api.get<IPageData>(`support`, {
    params: {
      search: searchValue,
      take,
      page
    }
  })
}
/* current support*/
export const currentSupport = (id: undefined | number):Promise<AxiosResponse<number>> => {
  return api.get<number>(`support/${id}`)
}
/* send message */
export const sendMessage = ({ id, answer }: ISupportAnswerData):Promise<AxiosResponse<ISupportAnswerData>> => {
  return api.post<ISupportAnswerData>(`support/${id}`, { answer })
}
/* convert to  archive a message */
export const archiveMessage = (id: number | string | undefined):Promise<AxiosResponse<number>> => {
  return api.patch<number>(`support/archive/${id}`)
}
/* convert to active a message */
export const activeMessage = (id: number | string | undefined):Promise<AxiosResponse<number>> => {
  return api.patch<number>(`support/rearchive/${id}`)
}
/* get archived data */
export const getArchivedMessages = (data: IPageData):Promise<AxiosResponse<IPageData>> => {
  const { take, page } = data
  return api.get<IPageData>("support", {
    params: {
      status: 1,
      take,
      page,
    }
  })
}
/* get news */
export const getNews = (data: IPageData) => {
  const { take, page } = data
  return api.get("news", {
    headers:{
      'Accept-Language': `en`,
    },
    params: {
      take,
      page
    }
  })
}
/* delete news */
export const deleteNews = (id: number | string | undefined):Promise<AxiosResponse<number>> => {
  return api.delete<number>(`news/${id}`)
}
/* add news */
export const addNews = (data: FormData):Promise<AxiosResponse<FormData>> => {
  return api.post<FormData>("news", data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
/* update news */
export const updateNews = (id: number , formData: FormData):Promise<AxiosResponse<IUpdateNewsReq>> => {
  return api.patch<IUpdateNewsReq>(`news/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept-Language': `$en`,
    }
  })
} 
/* get current news */
export const getCurrentNews = ({ id, lang }: ICurrentNews):Promise<AxiosResponse<ICurrentNews>> => {
  console.log(lang,"lang")
  return api.get<ICurrentNews>(`news/${id}`, {
    headers: {
      'Accept-Language': `${lang}`,
    },
  })
}

/*get all news data*/
export const getAllNews = (id:number|string | undefined)=> {
  return api.get(`news/${id}`,{
    headers: {
      'Accept-Language': ``,
    },
  })
}

/* get transactions */
export const getTransactions = (data: ITransferInfo):Promise<AxiosResponse<ITransferInfo>> => {
  const { take, page, checkedItems, searchValue } = data;
  console.log(searchValue)
  let statuses = '';
  if (checkedItems && checkedItems?.length > 0) {
    for (let i = 0; i < checkedItems.length; i++) {
      statuses += `statuses[${checkedItems[i]}]=${TransferStatusEnum[checkedItems[i]]}&`
    }
    statuses = statuses.slice(0, -1);
    return (api.get<ITransferInfo>(`transaction?${statuses}`, {
      params: {
        search: searchValue,
        take,
        page,

      },
    }
    ))
  }
  else {
    return api.get<ITransferInfo>("transaction", {
      params: {
        search: searchValue,
        take,
        page,
      },
    });
  }
}

export const language = () => {
  return api.get("language")
}



