export enum ManagerEnum {
    MANAGER = "managers",
    SUPPORT = "support",
    
}

export enum NavLinkEnum {
    USER = "users",
    MANAGER = "managers",
    SUPPORT = "support",
    CONTENT_MANAGER = "content-management",
    TRANSFER_HISTORY = "transfer-history",

}

export enum ContentEnum {
    CONTENT = "content-management"
}

export enum ContentStatus {
    PUBLISHED="published",
    
}
export enum TransferEnum {
    TRANSFER = "transfer-history",
    TRANSFER_TEXT = "transfer"
}

export enum ManagerPagesEnum {
    MANAGER = "managers",
    INFO_TAB = "tab=info",
    CHANGE_TAB = "tab=change-password",
    CHANGE_PASSWORD="Change-password",
    INFO="Info"
    
}

export enum ValidationEnum {
    REQUIRED = "required",
    MINLENGTH = "minLength",
    PATTERN = "pattern",
    CONFIRM = "confirm",
    TEXTAREA = "textarea ",
    LANGUAGE= "language"
}

export enum EditManagerEnum {
    EDIT = "edit"
}

export enum TableColumnTitleEnum {
    NUMBER = "N",
    FIRST_NAME = "FIRST NAME",
    LAST_NAME = "LAST NAME",
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    LAST_VISIT = "LAST VISIT",
    ACTION = "ACTION",
    CHOOSE_COUNTRY = "CHOOSE COUNTRY",
    DATE_0F_BIRTH = "DATE 0F BIRTH",
    MESSAGE = "MESSAGE",
    STATUS = "STATUS",
    PHOTO = "PHOTO",
    TITLE = "TITLE",
    CONTENT = "CONTENT",
    NAME = "NAME",
    AMOUNT = "AMOUNT",
    DATE = "DATE",
    DESCRIPTION = "DESCRIPTION"
}

export enum ColorEnum {
    BLACK = "black",
    GREY = "grey"
}

export enum AnswerEnum {
    ANSWER = "answer"
}
export enum DateFormat {
    SUPPORTDATE = "DD/MM/YYYY, HH:mm",
    COMMONDATE = "DD/MM/YYYY",
    NEWSDATE = "YYYY/MM/DD, HH:mm",
    CURRENTDATE="YYYY-MM-DDTHH:mm"
    // CURRENTDATE="YYYY-MM-DDTHH:mm:ss.SSS[Z]"
}

export enum UserStatus {
    ACTIVE = "active",
    DEACTIVATE = "deactivate"
}

export enum TransferStatusEnum {
    "pending" = 1,
    "success" = 2,
    "failed" = 3,
    "refund" = 4
}

export enum CommonEnum {
    ARCHIVE = "archive",
    SUPPORT_FILTER = "/support?filter",
    TRANSFER_FILTER = "/transfer-history?filter",
    SUPPORT = "support",
    TRANSFER_HISTORY = "transfer-history",
    PUBLISH_DATE_NOW = "1",
    PUBLISH_DATE_SHEDULE = "2",
    FILTER_QUESTION = "?filter",
    FILTER = "filter",
    NULL = "null",
    ACTIVE = "active",
    PAGE_NUMBER_0 = 0,
    PAGE = "page",
    STATUS = "status",
    DATA = "data",
    TITLE = "title",
    CONTENT = "content",
    PUBLISHDATA = "publishedDate",
    ACCESSTOKEN = "accessToken",
    ISTEMPORARY="isTemporary",
    USER = "user",
    NUMBER = "number",
    ROLE="role"
}

export enum AlertMessageEnum {
    SUCCESS_STATUS = "success",
    ERROR_STATUS = "error",
    SUCCESS_TEXT = "Success",
}

export enum PdfEnum {
    PDF = "pdf"
}

export enum LanguageEnum {
    LANGUAGE = "lang",
    English = "en",
    Russian = "ru",
    Armenian = "hy"
}

export enum languagesEnum {
    ENGLISH = "English",
    RUSSIAN = "Russian",
    ARMENIAN = "Armenian"
}

export enum NumberCount {
    NUMBERONE=1,
    NUMBERTWO=2,
    NUMBERTREE=3
}

export enum FormInputName {
    ENGLISH_TITLE="enTitle",
    ENGLISH_CONTENT="enContent" ,  
    RUSSIAN_TITLE="rusTitle",
    RUSSIAN_CONTENT="rusContent" ,  
    ARMENIAN_TITLE="armTitle",
    ARMENIAN_CONTENT="armContent" ,  
}

export enum InputTitleEnum {
    ARMENIAN="arm",
    RUSSIAN="rus"
}

export enum RoleEnum {
    MANAGER="manager",
    ADMIN="admin"
}








