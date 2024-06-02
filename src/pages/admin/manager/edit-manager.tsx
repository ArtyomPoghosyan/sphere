import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { t } from 'i18next';
import { useAppSelector } from '@/hooks';

import { PathLocation } from '@/helpers';
import { ManagerPagesEnum } from '@/constants/enum';
import { ICommonState, IManagerState } from '@/models/table';

import pageStyle from "../page.module.css"

export const EditManager: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { editManagerData }: IManagerState = useAppSelector((state: ICommonState) => state.manager)
    const pathLocation = PathLocation(location, editManagerData.name);
    const firstLetter: string = pathLocation.charAt(0).toUpperCase() + pathLocation.slice(1);
    const nestedLoacation: string = location.search;

    return (
        <>
            <h1 onClick={() => navigate(-1)} className={pageStyle.add_manager_path_title}>
                {`${firstLetter} > ${editManagerData.name} > ${nestedLoacation.includes(`${ManagerPagesEnum.INFO_TAB}`) ? `${ManagerPagesEnum.INFO}` : `${ManagerPagesEnum.CHANGE_PASSWORD}`}`}</h1>
            <div className={pageStyle.nav_container}>
                <Link className={`${pageStyle.update_link} 
                ${nestedLoacation.includes(`${ManagerPagesEnum.INFO_TAB}`) ? `${pageStyle.active_link}` :
                        null}`} to={`/${ManagerPagesEnum.MANAGER}/${id}?${ManagerPagesEnum.INFO_TAB}`}>{t("MANAGER.UPDATE_MANAGER")}</Link>
                <Link className={`${pageStyle.change_link}
                 ${nestedLoacation.includes(`${ManagerPagesEnum.CHANGE_TAB}`) ? `${pageStyle.active_link}` :
                        null}`} to={`/${ManagerPagesEnum.MANAGER}/${id}?${ManagerPagesEnum.CHANGE_TAB}`}>{t("MANAGER.CHANGE_PASSWORD")}</Link>
            </div>
            <div className={pageStyle.main_container}>
                <Outlet />
            </div>
        </>
    )
}