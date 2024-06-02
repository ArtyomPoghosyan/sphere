import { useNavigate } from "react-router-dom";

import { t } from "i18next";
import { useAppDispatch } from "@/hooks";
import { handleManagerstate, handleNewsState, handleSupportState } from "@/store/slices";

import compony_logo from "@assets/icons/sphere_pons_light_logo.svg";
import not_found from "@assets/pictures/404.svg";
import back from "@assets/icons/backArrow.svg";
import notFoundStyle from "./not-found.module.css"

export const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleBackPage = (): void => {
        dispatch(handleManagerstate.setEditManagerError())
        dispatch(handleManagerstate.setChangePassError())
        dispatch(handleSupportState.resetCurrentError())
        dispatch(handleSupportState.resetAnswerError())
        dispatch(handleNewsState.setCurrentError())
        navigate(-1)
    }

    return (
        <div className={notFoundStyle.main_container}>
            <img className={notFoundStyle.logo} src={compony_logo}></img>
            <div className={notFoundStyle.not_found_pic_container}>
                <img className={notFoundStyle.not_found_pic} src={not_found}></img>
            </div>
            <h1 className={notFoundStyle.not_found_text}>{t("NOT_FOUND.PAGE_NOT_FOUND")}</h1>
            <p className={notFoundStyle.text}>{t("NOT_FOUND.NOT_FOUND_TEXT")}</p>
            <div className={notFoundStyle.goBack_container}>
                <button className={notFoundStyle.btn} onClick={handleBackPage}> <img src={back} className={notFoundStyle.arrow}></img>{t("NOT_FOUND.GO_BACK_HOME")}</button>
            </div>
        </div>
    )
}