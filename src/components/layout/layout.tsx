import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

import {
    Box, CloseButton, Flex, useColorModeValue, Drawer,
    DrawerContent, useDisclosure
} from '@chakra-ui/react'
import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { MobileNavigation } from "../admin-table/mobileNavigation";
import { getUserRoleThunk, logOutState } from "../../store/slices/auth/index";

import { ICommonState, ISupportState, SidebarProps } from "@/models/table";
import { NotFound } from "../not-found";

import { NavLinkEnum, RoleEnum } from "@/constants/enum";
import { greyColor } from "@/helpers/colors";
import compony_logo from "@assets/icons/sphere_pons_light_logo.svg"
import user_icon from '@assets/icons/users.svg';
import manager_icon from '@assets/icons/manager.svg';
import supportIcon from '@assets/icons/support.svg';
import dashboard_icon from "@assets/icons/Dashboard.svg";
import content_icon from "@assets/icons/content.svg";
import transfer from "@assets/icons/transfer.svg";
import log_out from "@assets/icons/logOut.svg";
import layoutStyle from "./layout.module.css";
import { useEffect } from "react";

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const path = location.pathname.slice(1);
    const {roleData} = useAppSelector((state: any) => state.login)
    const handleLogOut = () => {
        dispatch(logOutState.setLogoutState())
    }

    useEffect(()=>{
        dispatch(getUserRoleThunk())
    },[])

    return (
        <Box className={layoutStyle.sideBar}
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRightColor={useColorModeValue('grey.100', 'gray.700')}
            pos="fixed"
            h="full"
            boxShadow="2xl"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between"
                className={layoutStyle.compony_logo_container}>
                <img className={layoutStyle.compony_logo_img} src={compony_logo} onClick={() => navigate("/")} />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {
                roleData==RoleEnum.MANAGER?
                    <div className={layoutStyle.navItem_container}>
                        <Link className={`${layoutStyle.nav_item} ${path == "/" ? `${layoutStyle.nav_item_active}` : null}`} to={`/`}>
                            <img className={layoutStyle.nav_item_icon} src={dashboard_icon} />
                            <p className={layoutStyle.nav_item_text}>{t("NAV_LINK_ITEMS.DASHBOARD")}</p>
                        </Link>
                        <Link className={`${layoutStyle.nav_item} ${path.includes(NavLinkEnum.SUPPORT) ? `${layoutStyle.nav_item_active}` : null}`} to={`${NavLinkEnum.SUPPORT}`}>
                            <img className={layoutStyle.nav_item_icon} src={supportIcon} />
                            <p className={layoutStyle.nav_item_text_support}>{t("NAV_LINK_ITEMS.SUPPORT")}</p>
                        </Link>
                        <Link className={`${layoutStyle.nav_item} ${path.includes(NavLinkEnum.CONTENT_MANAGER) ? `${layoutStyle.nav_item_active}` : null}`} to={`${NavLinkEnum.CONTENT_MANAGER}`}>
                            <img className={layoutStyle.nav_item_icon_content} src={content_icon} />
                            <p className={layoutStyle.nav_item_text_content}>{t("NAV_LINK_ITEMS.CONTENT_MANAGMENT")}</p>
                        </Link>
                        <div className={layoutStyle.log_out_block}>
                            <button onClick={() => { handleLogOut() }} className={layoutStyle.log_out_container}>
                                <img className={layoutStyle.log_out_img} src={log_out} />
                                <p className={layoutStyle.nav_item_text}>{t("NAV_LINK_ITEMS.LOG_OUT")}</p>
                            </button>
                        </div>
                    </div> :
                    <div className={layoutStyle.navItem_container}>
                        <Link className={`${layoutStyle.nav_item} ${path == "/" ? `${layoutStyle.nav_item_active}` : null}`} to={`/`}>
                            <img className={layoutStyle.nav_item_icon} src={dashboard_icon} />
                            <p className={layoutStyle.nav_item_text}>{t("NAV_LINK_ITEMS.DASHBOARD")}</p>
                        </Link>
                        <Link className={`${layoutStyle.nav_item} ${path.includes(NavLinkEnum.USER) ? `${layoutStyle.nav_item_active}` : null}`} to={`${NavLinkEnum.USER}`}>
                            <img className={layoutStyle.nav_item_icon} src={user_icon} />
                            <p className={layoutStyle.nav_item_text}>{t("NAV_LINK_ITEMS.USER")}</p>
                        </Link>
                        <Link className={`${layoutStyle.nav_item} ${path.includes(NavLinkEnum.MANAGER) ? `${layoutStyle.nav_item_active}` : null}`} to={`${NavLinkEnum.MANAGER}`}>
                            <img className={layoutStyle.nav_item_icon} src={manager_icon} />
                            <p className={layoutStyle.nav_item_text}>{t("NAV_LINK_ITEMS.MANAGER")}</p>
                        </Link>
                        <Link className={`${layoutStyle.nav_item} ${path.includes(NavLinkEnum.SUPPORT) ? `${layoutStyle.nav_item_active}` : null}`} to={`${NavLinkEnum.SUPPORT}`}>
                            <img className={layoutStyle.nav_item_icon} src={supportIcon} />
                            <p className={layoutStyle.nav_item_text_support}>{t("NAV_LINK_ITEMS.SUPPORT")}</p>
                        </Link>
                        <Link className={`${layoutStyle.nav_item} ${path.includes(NavLinkEnum.CONTENT_MANAGER) ? `${layoutStyle.nav_item_active}` : null}`} to={`${NavLinkEnum.CONTENT_MANAGER}`}>
                            <img className={layoutStyle.nav_item_icon_content} src={content_icon} />
                            <p className={layoutStyle.nav_item_text_content}>{t("NAV_LINK_ITEMS.CONTENT_MANAGMENT")}</p>
                        </Link>
                        <Link className={`${layoutStyle.nav_item} ${path.includes(NavLinkEnum.TRANSFER_HISTORY) ? `${layoutStyle.nav_item_active}` : null}`} to={`${NavLinkEnum.TRANSFER_HISTORY}`}>
                            <img className={layoutStyle.nav_item_icon_transfer} src={transfer} />
                            <p className={layoutStyle.nav_item_text_transfer}>{t("NAV_LINK_ITEMS.TRANSFER_HISTORY")}</p>
                        </Link>
                        <div className={layoutStyle.log_out_block}>
                            <button onClick={() => { handleLogOut() }} className={layoutStyle.log_out_container}>
                                <img className={layoutStyle.log_out_img} src={log_out} />
                                <p className={layoutStyle.nav_item_text}>{t("NAV_LINK_ITEMS.LOG_OUT")}</p>
                            </button>
                        </div>
                    </div>
            }

        </Box>
    )
}

export const Layout: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { editManagerError } = useAppSelector((state: ICommonState) => state.manager);
    const { currentError }: ISupportState = useAppSelector((state: ICommonState) => state.support);
    const { currentContentError } = useAppSelector((state: ICommonState) => state.content);
    return (
        <>
            {editManagerError?.length || currentError?.length || currentContentError?.length ? <NotFound /> :
                <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                    <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
                    <Drawer
                        isOpen={isOpen}
                        placement="left"
                        onClose={onClose}
                        returnFocusOnClose={false}
                        onOverlayClick={onClose}
                        size="full">
                        <DrawerContent>
                            <SidebarContent onClose={onClose} />
                        </DrawerContent>
                    </Drawer>
                    <MobileNavigation onOpen={onOpen} />
                    <Box ml={{ base: 0, md: 60 }} p="4" style={{ padding: "0px 27px 0px 56px", backgroundColor: greyColor }}>
                        <Outlet />
                    </Box>
                </Box>
            }
        </>
    )
}

