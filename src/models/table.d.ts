import { language } from './../services/index';
import { FieldValues, UseFormReturn } from 'react-hook-form';
export interface ITableData {
    createdAt: string,
    description: string,
    id: number,
    name: string,
    fullName:string,
    originAmount: number,
    originCard: string,
    originCurrency: string,
    status: string,
    targetAmount: number,
    amount:number,
    targetCard: string,
    targetCurrency: string,
    transactionUUID: string,
    updatedAt: string,
    dateOfBirth?: string
}

export interface ITableProps {
    tableColumnTitle?: any
    generateBody: Function,
    data?: any,
    dataPerPeage?: number,
    setCurrentPage?: any,
    onPageChange: (ev: { selected: number; }) => void,
    pageCount: number,
    handleGetArchivedData?: MouseEventHandler<HTMLButtonElement> | undefined,
    setSearchFilter?:any,
    searchFilter?: any,
    handleGetSupportList?: MouseEventHandler<HTMLButtonElement> | undefined,
    debouncedHandleSupportFilter?:any,
    checkedItems?:any ,
    setCheckedItems?: any,
    value?: any,
    setValue?: any,
    searchParams?: URLSearchParams,
    setSearchParams?: SetURLSearchParams
}

export interface IDotes {
    color: "black" | "grey"
}

export interface SidebarProps extends BoxProps {
    onClose: () => void;
    display?: {
        base: string,
        md: string
    }
}

export interface MobileProps extends FlexProps {
    onOpen: () => void
}
export interface IManagerFormData {
    name: string,
    lastName: string,
    email: string,
    phone: string,
    password?: string
}

export interface IManagerData {
    createdAt: string,
    email: string,
    id: number,
    isTemporary?: boolean,
    lastName: string,
    lastVisit: string | null,
    name: string,
    phone: string,
    updatedAt: string,
    country?: string
    dateOfBirth?: string
}

export interface IPathLocation {
    pathname: string,
    hash: string,
    key: string, pathname: strign,
    search: string,
    state: null
}

export interface IManagerState {
    isLoading?: boolean,
    isSuccess?: boolean,
    data?: {
        meta: iPageCount
    },
    error?: Object[],
    addManagerLoading?: boolean,
    addManagerSuccess?: boolean,
    addManagerError?: any,
    deleteManagerLoading?: boolean,
    deleteManagerSuccess?: boolean,
    deleteManagerError?: any,
    editManagerLoading?: boolean,
    editManagerSuccess?: boolean,
    editManagerData?: any,
    editManagerError?: Array<string>,
    updateManagerLoading?: boolean,
    updateManagerSuccess?: boolean,
    updateManagerError?: any,
    changePasswordLoading: boolean,
    changePasswordSuccess: boolean,
    changePasswordError: any
}

export interface IPageCount {
    pageCount: number | string | undefined
}

export interface IUSerState {
    isLoading?: boolean,
    isSuccess?: boolean,
    data?: {
        meta: iPageCount
    },
    error?: Object[],
    deleteLoading?: boolean,
    deleteSuccess?: boolean,
    deleteError?: any,
    deactivateLoading?: boolean,
    deactivateSuccess?: boolean,
    deactivateError?: Object[],
    activateLoading: boolean,
    activateSuccess: boolean,
    activateError: [],
}

export interface ILanguageData {
    id:number  
    formData:{
        title:string,
        content:string,
        languageId:number
    }
}

export interface ISupportCurrentData {
    createdAt: string,
    message: string,
    email: string,
    name: string
}

export interface ISupportState {
    isLoading?: boolean,
    isSuccess?: boolean,
    data?: any
    error?: Object[],
    currentLoading: boolean,
    currentSuccess: boolean,
    currentData: {
        data: ISupportCurrentData
    },
    currentError: [],
    archiveLoading: boolean,
    archiveSuccess: boolean,
    archiveData: [],
    archiveError: [],
    getArchiveLoading: boolean,
    getArchiveSuccess: boolean,
    getArchiveData: [],
    getArchiveError: [],
    answerLoading: boolean,
    answerSuccess: boolean,
    answerError: [] | string,
    filterLoading: boolean,
    filterSuccess: boolean,
    filterData: {
        data: []
    },
    filterError: [],
    totalPages: number,
    activeSuccess: boolean,
    activeData: [],
    activeError: [],
}

export interface INewsData {
    contents: [
        {
            0: {
                title: string;
                content: string;
                publishedDate: string;
                image: Blob | string | undefined;
            }
        }
    ];
    createdAt: string;
    updatedAt: string;
    title: string;
    id: number;
    image?: {
        path?: string;
    };
}

export interface IContentDataInfo {
    content: string,
    data: any
}

export interface IContentState {
    isLoading?: boolean,
    isSuccess?: boolean,
    data?: {
        data?:any[],
        meta: iPageCount
    },
    error?: Object[],
    deleteContentLoading: boolean,
    deleteContentSuccess: boolean,
    deleteContentError: any,
    addContentLoading: boolean,
    addContentSuccess: boolean,
    addContentError: any,
    currentContentLoading: boolean,
    currentContentSuccess: boolean,
    currentContentData: IContentDataInfo,
    currentContentError: [],
    updateContentLoading: boolean,
    updateContentSuccess: boolean,
    updateContentError: any,
    languageIsLoading: boolean,
    language: ILanguage[],
    allLanguageLoading:boolean,
    allLanguageSuccess:boolean,
    allLanguageData:[],
    allLanguageError:any,

}

export interface ITransactionState {
    isLoading?: boolean,
    isSuccess?: boolean,
    data?: {
        meta: iPageCount
    },
    error?: Object[],
}

export interface IUserData {
    country: string,
    createdAt: string,
    customerId: string,
    dateOfBirth: string,
    email: string,
    id: number,
    isVerified: boolean,
    lastName: string,
    name: string,
    phone: string,
    status:string,
    updatedAt: string,
    meta: {
        pageCount: number
    }
}

export interface IGenerateTransferData {
    data: ITableData[],
    meta: IPageCount
}
export interface IGenerateSupportData {
    data: ISupportData[],
    meta: IPageCount
}
export interface IGenerateUserData {
    data: IUserData[],
    meta: IPageCount
}
export interface IGenerateManagerData {
    data: IManagerData[],
    meta: IPageCount
}
export interface IGenerateContentData {
    data: IContentData[],
    meta: IPageCount
}

export interface IAllLanguageData {
    data:UI| [] | undefined
}

export interface Language {
    name: string; 
    id:number | string
  }

export interface ICommonState {
    login: ILoginState,
    user: IUSerState,
    manager: IManagerState,
    support: ISupportState,
    content: IContentState,
    transaction: ITransactionState,
    allLanguageData?:IAllLanguageData
}

export interface IUpdateRequest {
    id: string | number | undefined,
    changedVals?: IManagerData
}

export interface ISupportData {
    createdAt: string,
    email: string,
    id: number,
    message: string,
    messageId: number| string,
    name: string,
    phone: string,
    updatedAt: string,
    status: string,
    title: string,
    getArchiveData?: [];
}

export interface SearchProps {
    searchFilter: string;
    setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
    handleInputText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (event: KeyboardEventHandler<HTMLInputElement>) =>void;
    place?: string
}

export interface IBeforeUnLoad {
    pageLocation: CommonEnum | string;
    page: number
}

export interface IImagePreviewer {
    imagePreview: string | null;
    showModal?: () => void,
    setImage?: (imageUrl: string) => void;
}

export interface ILocation {
    hash: string,
    key: string
    pathname: string,
    search: string,
    state: null | string
}

export interface IPassword {
    password: string,
    confirm: string
}

export interface IUseFormData extends FieldValues {
    rusTitle?:string;
    enTitle?:string;
    armTitle?:string;
    title?: string;
    armContent?:string;
    rusContent?:string;
    enContent?:string;
    content?: string;
    publishedDate?: string;
    file?: FileList;
    language?:string
}

export type IPageChangeHandler = { selected: number };

export interface IEditContentForm {
    title: string,
    content: string,
    publishedDate?: string
    file?: {
        FileList?: string
    }
}

export interface ISupportMessageForm {
    answer: string
}

export interface IContentData {
    contents: {
        0: {
            content: string,
            createdAt: string,
            updatedAt: string,
            title: string,
            id: number,
        }
    },
    image: {
        path: string,
        name?: stirng
    },
    id: number,
    publishedDate: string,
    status: string,
}

export interface IAlert {
    status: "success" | "error" | "info" | "warning" | "loading" | undefined
    text?: string
}

export interface IpopUp {
    onOpen: () => void,
    isOpen: boolean,
    onClose: () => void,
    handleDeleteItem: Function,
    deleteId: number | null
}

export interface IImageModal {
    src: string,
    onClose: () => void
}

export interface IChangePassForm {
    currentPassword:string
    password: string,
    confirm: string,
    newPassword:string
}

export interface FormDataItem {
    title: string;
    content: string;
    languageId: number;
    language?:string
}
export interface IFormValue {
    publishedDate?: string;
    file?: File | FileList | null | undefined;
    data: FormDataItem[];
}

export interface ISubmitedData {
    publishedDate?: string,
    title: string,
    content: string,
    file?: null | undefined | File | FileList
}

export interface ILanguage {
    createdAt: string;
    id: number;
    key: string;
    name: string;
    updatedAt: string;
}

export interface IEditFormSubmited {
    title: string;
    content: string;
    publishedDate?: string;
    file?: string | undefined | null | File | FileList | {};
}

export interface ISupportAnswer {
    answer: string
}

export interface ISelected {
    selected: number
}

export interface IPageData {
    take: number | null,
    page: number | string | null,
    searchValue?: string | null,
    id?: string | number | undefined
}

export interface IChangePassword {
    password: string,
    id: number | string | undefined
}

export interface IMessage {
    id: number,
    answer: string
}
export interface ISupportAnswerData {
    id?: number | string,
    answer: string
}


export interface ICurrentNews {
    id: number | stirng,
    lang: "ru" | "en" | "hy" | string
}
export interface ILanguageData {
    id: number | stirng,
    // language: "ru" | "en" | "hy" | string,
    formData: FormData

}

export interface ITransferInfo {
    take: number;
    page: number | string | undefined;
    checkedItems: Array<TransferStatusEnum>;
    searchValue?: string;
}

export interface IValidationPasswrod {
    confirm: string,
    password: string,
    newPassword?:string
}

export interface IGeneratePicture {
    content: string,
    languageId: number,
    title: string
}

export interface IUpdateNewsReq {
    id: number,
    formData: FormData,
    // language: string
}

export interface IContentLangInfo {
    id?:string | undefined
    languageId?: string | undefined,
    title: string,
    content: string | undefined,
    // description?: string
}

export interface ILanguageItems {
    // language:number | undefined
    languageId: languagesEnum,
    title: string,
    content: string
}

export interface INewFormData{
    title: string;
    content: string,
    publishedDate?: string,
    file?: File 
}
export interface IFormData {
    title: string;
    content: string;
}

export interface ILanguageId {
    id: number;
    createdAt:string;
    key:"en","ru","hy";
    name:string;
    updatedAt:string
}

export interface ILanguageItem {
    languageId: string;
    title: string;
    content: string;
}

export interface ICurrentLanguage {
    title: string;
    content: string | undefined;
}

export interface ILanguageMapping {
    [key: string]: number;
}

export interface ILanguageInfo {
    content:string,
    createdAt:string,
    id:number,
    language:ILanguageId,
    title:string,
    updatedAt:string
}

export interface IFormData {
    title: string;
    content: string;
    publishedDate?: any;
    file?: any
}

export type FormFields = 'armTitle' | 'armContent' | 'rusTitle' | 'rusContent' | 'enTitle' | 'enContent' | 'file' | "publishDate";