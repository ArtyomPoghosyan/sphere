import { CommonEnum } from "@/constants";

export const genereateFormData = (data: any) => {
    // const fileExtension = data?.file[0]?.name?.toLowerCase().split('.').pop();
    const formData = new FormData();
    // if (allowedFileTypes.includes(fileExtension)) {
    if (data.file && data.file[0]) {
        const files: File[] = [...data.file]
        data.file = files[0]
    }
    if(data?.publishedDate) {
        formData.append(CommonEnum.PUBLISHDATA,data?.publishedDate)
    }
    if (data) {
        for (let key in data) {
            if (key == CommonEnum.DATA) {
                data?.data[0]?.map((item: any,index:number) => {
                    delete item?.language
                    Object.keys(item).forEach((property: any) => {
                        formData.append(`${CommonEnum.DATA}[${index}][${property}]`,item[property] )
                    });
                })
            } 
            if (data[key] instanceof File) {
                formData.append(key, data[key] as File)
            }
        }
        Object.keys(data).forEach((property:any) => {
            if (property === CommonEnum.TITLE || property === CommonEnum.CONTENT) {
                formData.append(`${CommonEnum.DATA}[${property}]`,data[property])
            }
        })
    }
    return formData
    // }
    // else {
    //     throw new Error("Invalid file type");
    // }
}