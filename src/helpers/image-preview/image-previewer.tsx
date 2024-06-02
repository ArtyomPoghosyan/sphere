import { IImagePreviewer } from "@/models/table";
import pageStyle from "../../pages/admin/page.module.css";

export const ImagePreviewer = (props: IImagePreviewer) => {
    const { imagePreview, showModal, setImage } = props;
    return (
        <>
            {imagePreview &&
                <img onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
                    const { src } = event?.target as HTMLImageElement
                    showModal?.()
                    setImage?.(src)
                }} className={pageStyle.edit_pic} src={imagePreview} alt="Image Preview"
                />
            }
        </>
    )
};

export const imagePath = import.meta.env.VITE_API_PIC
export const allowedFileTypes: string[] = ['jpg', 'jpeg', 'png', 'pdf', 'jfif', 'svg'];