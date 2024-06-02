import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import dayjs from "dayjs";
import { t } from "i18next";

import { TableComponent } from "@/components";
import { takeCount } from "@/helpers/text-limit";
import { lightBlueGreen } from "@/helpers/colors";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ICommonState, IGenerateUserData, ISelected, IUSerState, IUserData } from "@/models/table";
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Td, Tr, useDisclosure } from "@chakra-ui/react";
import { activateUserThunk, deactivateUserThunk, deleteUserThunk, getUsersThunk, handleUserState } from "@/store/slices/user";

import VerticalDots from "@/components/custom-icons/dotes";
import { ColorEnum, CommonEnum, DateFormat, TableColumnTitleEnum, UserStatus } from "@/constants/enum";

import pageStyle from "../page.module.css";
import tableStyle from "@components/admin-table/table.module.css";
import { DeleteModal } from "@/components/modal/delete-modal";

export const User: React.FC = () => {
    const dispatch = useAppDispatch();
    const [itemId, setItemId] = useState<number | null>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const page = searchParams.get(CommonEnum.PAGE);
    const { deactivateSuccess, deleteSuccess, deleteError
        // isLoading: userLoading
    } = useAppSelector((state: ICommonState) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data } = useAppSelector((state: ICommonState) => state.user) as IUSerState

    const tableColumnTitle: string[] = [
        TableColumnTitleEnum.NUMBER,
        TableColumnTitleEnum.FIRST_NAME,
        TableColumnTitleEnum.LAST_NAME,
        TableColumnTitleEnum.EMAIL,
        TableColumnTitleEnum.CHOOSE_COUNTRY,
        TableColumnTitleEnum.DATE_0F_BIRTH,
        TableColumnTitleEnum.STATUS,
        TableColumnTitleEnum.ACTION
    ]

    useEffect(() => {
        dispatch(getUsersThunk({ take: takeCount, page: page ?? 1 }))
    }, [])

    useEffect(() => {
        dispatch(handleUserState.setDeleteUserError());
        // dispatch(handleUserState.resetDeleteUser());
    }, [deactivateSuccess, deleteSuccess, deleteError])

    const handleDelete = (id: number): void => {
        setDeleteId(id)
        onOpen()
    }

    const handleDeleteItem = (id: number): void => {
        const data = {
            id,
            take: takeCount,
            page
        }
        dispatch(deleteUserThunk(data))
        onClose()
    }

    const handleUserStatus = (id: number, status: string): void => {
        if (status === UserStatus.ACTIVE) {
            dispatch(deactivateUserThunk(id))
        }
        else {
            dispatch(activateUserThunk(id))
        }
    }

    const onPageChange = ({ selected }: ISelected): void => {
        const newPage = (selected + 1).toString();
        dispatch(getUsersThunk({ take: takeCount, page: newPage }))
        setSearchParams({ page: `${selected + 1}` })
    }

    const generateBody = (data: IGenerateUserData): JSX.Element[] => {
        return data?.data?.map((item: IUserData, index: number) =>
            <Tr key={item?.id} className={tableStyle.row} >
                  <Td>{(page  && +page>1) ? (+page-1) * 10 + index+1  : index + 1}</Td>
                <Td className={pageStyle.manager_name_container}>
                    <span className={pageStyle.manager_avatar}>{item?.name[0].toUpperCase()}</span>{item?.name}</Td>
                <Td>{item?.lastName}</Td>
                <Td>{item?.email}</Td>
                <Td>{item?.country}</Td>
                <Td>{dayjs(item?.dateOfBirth).format(DateFormat.COMMONDATE)}</Td>
                <Td>{item?.status}</Td>
                <Td className={tableStyle.table_item_action}>
                    <Menu onOpen={() => setItemId(item.id)} onClose={() => setItemId(null)}>
                        <MenuButton className={tableStyle.dot_btn}
                            as={IconButton}
                            aria-label='Options'
                            icon={<VerticalDots color={itemId == item?.id ? ColorEnum.BLACK : ColorEnum.GREY} />}
                            variant='outline'
                            border={'none'}
                            _hover={{ bg: lightBlueGreen }} />
                        <MenuList>
                            <MenuItem className={tableStyle.row} onClick={() => { handleDelete(item?.id) }}>
                                {t("COMMON.DELETE")}
                            </MenuItem>
                            <MenuItem className={tableStyle.row} onClick={() => { handleUserStatus(item?.id, item?.status) }}>
                                {item?.status == "active" ? `${t("COMMON.DEACTIVATE")}` : `${t("COMMON.ACTIVE")}`}
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Td>
            </Tr>
        )
    }
    return (
        <div>
            <DeleteModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} handleDeleteItem={handleDeleteItem} deleteId={deleteId} />
            <TableComponent onPageChange={onPageChange} tableColumnTitle={tableColumnTitle}
                generateBody={generateBody} data={data} pageCount={data?.meta?.pageCount}
            />
        </div>
    )
}