import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import dayjs from "dayjs";
import { t } from "i18next";
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Td, Tr, useDisclosure } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteManagerThunk, getManagersThunk, handleManagerstate } from "@/store/slices/manager";

import VerticalDots from "@/components/custom-icons/dotes";
import { takeCount } from "@/helpers/text-limit";
import { TableComponent } from "@/components"

import { ColorEnum, CommonEnum, DateFormat, ManagerPagesEnum, TableColumnTitleEnum } from "@/constants/enum";
import { ICommonState, IGenerateManagerData, IManagerData, IPageChangeHandler } from "@/models/table";

import pageStyle from "../page.module.css";
import tableStyle from "@components/admin-table/table.module.css";
import { DeleteModal } from "@/components/modal/delete-modal";

export const Manager: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [itemId, setItemId] = useState<number | null>();
    const { data, deleteManagerError } = useAppSelector((state: ICommonState) => state.manager);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get(CommonEnum.PAGE)

    const tableColumnTitle: string[] = [
        TableColumnTitleEnum.NUMBER,
        TableColumnTitleEnum.FIRST_NAME,
        TableColumnTitleEnum.LAST_NAME,
        TableColumnTitleEnum.EMAIL,
        TableColumnTitleEnum.PHONE,
        TableColumnTitleEnum.LAST_VISIT,
        TableColumnTitleEnum.ACTION
    ]

    useEffect(() => {
        dispatch(getManagersThunk({ take: takeCount, page: page ?? 1 }))
    }, [])

    useEffect(() => {
        dispatch(handleManagerstate.setManagerDeleteError())
    }, [deleteManagerError])

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
        dispatch(deleteManagerThunk(data))
        onClose()
    }

    const onPageChange = ({ selected }: IPageChangeHandler): void => {
        setSearchParams({ page: `${selected + 1}` })
        dispatch(getManagersThunk({ take: takeCount, page: selected + 1 }))
    }

    const generateBody = (data: IGenerateManagerData): JSX.Element[] => {
        return data?.data?.map(((item: IManagerData, index: number) =>
            <Tr key={item?.id} className={tableStyle.row}>
                <Td>{(page && +page > 1) ? (+page - 1) * 10 + index + 1 : index + 1}</Td>
                <Td className={pageStyle.manager_name_container}>
                    <span className={pageStyle.manager_avatar}>{item?.name[0]?.toUpperCase()}</span>{item?.name}</Td>
                <Td>{item?.lastName}</Td>
                <Td>{item?.email}</Td>
                <Td>{item?.phone}</Td>
                <Td>{item?.lastVisit ? dayjs(item?.lastVisit).format(DateFormat.COMMONDATE) : null}</Td>
                <Td className={tableStyle.table_item_action}>
                    <Menu onOpen={() => setItemId(item.id)} onClose={() => setItemId(null)}>
                        <MenuButton className={tableStyle.dot_btn}
                            as={IconButton}
                            aria-label='Options'
                            icon={<VerticalDots color={itemId == item?.id ? ColorEnum.BLACK : ColorEnum.GREY} />}
                            variant='outline'
                            border={'none'}
                            _hover={{ bg: '#f7f7f700' }} />
                        <MenuList>
                            <MenuItem className={tableStyle.row} onClick={() => { navigate(`/managers/${item?.id}?${ManagerPagesEnum.INFO_TAB}`) }}>
                                {t("COMMON.EDIT")}
                            </MenuItem>
                            <MenuItem className={tableStyle.row} onClick={() => { handleDelete(item?.id) }}>
                                {t("COMMON.DELETE")}
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Td>
            </Tr>
        ))
    }
    return (
        <div className={pageStyle.manager_block}>
            <DeleteModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} handleDeleteItem={handleDeleteItem} deleteId={deleteId} />
            <TableComponent onPageChange={onPageChange} tableColumnTitle={tableColumnTitle} generateBody={generateBody}
                data={data} pageCount={data?.meta?.pageCount} />
        </div>
    )
}