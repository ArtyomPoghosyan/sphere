import { IImageModal } from "@/models";
import modalStyle from "./modal.module.css";

export const ImageModal = ({ src, onClose }: IImageModal) => {
    return (
        <div className={modalStyle.image_modal}>
            <span className={modalStyle.close} onClick={onClose}>
                &times;
            </span>
            <img className={modalStyle.modal_content} src={src} />
        </div>
    )
}