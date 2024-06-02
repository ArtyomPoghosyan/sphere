import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { t } from "i18next";
import { TableComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteNewsThunk, getLanguageThunk, getNewsThunk, handleNewsState } from "@/store";
import VerticalDots from "@/components/custom-icons/dotes";
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Td, Tr, useDisclosure } from "@chakra-ui/react";

import { ICommonState, IContentData, IGenerateContentData, IPageChangeHandler } from "@/models/table";
import { ColorEnum, CommonEnum, PdfEnum, TableColumnTitleEnum } from "@/constants/enum";
import { maxtextLimit, minTextLimit, takeCount } from "@/helpers/text-limit";
import { allowedFileTypes, imagePath } from "@/helpers";
import no_image from "@assets/pictures/no_image.jpg";
import pdf_image from "@assets/pictures/pdf.png";

import pageStyle from "../page.module.css";
import tableStyle from "@components/admin-table/table.module.css";
import { DeleteModal } from "@/components/modal/delete-modal";

export const ContentManagement: React.FC = () => {
    const { data,language, deleteContentError } = useAppSelector((state: ICommonState) => state.content);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [itemId, setItemId] = useState<number | null>();
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get(CommonEnum.PAGE)
    const { isOpen, onOpen, onClose } = useDisclosure();

    const tableColumnTitle: string[] = [
        TableColumnTitleEnum.NUMBER,
        TableColumnTitleEnum.PHOTO,
        TableColumnTitleEnum.TITLE,
        TableColumnTitleEnum.CONTENT,
        TableColumnTitleEnum.STATUS,
        TableColumnTitleEnum.ACTION
    ]

    useEffect(() => {
        dispatch(getNewsThunk({ take: takeCount, page: page ?? 1 }))
        dispatch(getLanguageThunk())
    }, [])

    useEffect(() => {
        dispatch(handleNewsState.setDeleteContentError());
    }, [deleteContentError])

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
        dispatch(deleteNewsThunk(data))
        onClose()
    }

    const onPageChange = ({ selected }: IPageChangeHandler): void => {
        setSearchParams({ page: `${selected + 1}` })
        dispatch(getNewsThunk({ take: takeCount, page: selected + 1 }))
    }

    useEffect(()=>{
        return ()=>{
            dispatch(handleNewsState.setCurrentError())
        }
    },[])

    
    const generateBody = (data: IGenerateContentData): JSX.Element[] => {
        return data?.data?.map((item: IContentData, index: number) =>
            <Tr key={item.id} className={tableStyle.row} >
                  <Td>{(page  && +page>1) ? (+page-1) * 10 + index+1  : index + 1}</Td>
                <Td className={pageStyle.pic_container}>
                    {
                        allowedFileTypes.includes(item?.image?.name?.toLowerCase().split(".").pop()) ?
                        <>
                                {
                                    (item?.image?.path?.toLowerCase().split(".").pop() == PdfEnum.PDF ?
                                        <img className={pageStyle.edit_pic} src={pdf_image} />
                                        : <img className={pageStyle.edit_pic} src={`${imagePath}${item?.image?.path}`} />)
                                }
                            </> : <img className={pageStyle.edit_pic} src={no_image} />
                    }
                </Td>
                <Td>{item?.contents?.[0].title?.slice(minTextLimit, maxtextLimit)}</Td>
                <Td>{item?.contents?.[0].content?.slice(minTextLimit, maxtextLimit)}</Td>
                <Td>{item?.status}</Td>
                <Td style={{ height: "97px", paddingTop: "27px" }} className={tableStyle.table_item_action}>
                    <Menu onOpen={() => setItemId(item.id)} onClose={() => setItemId(null)}>
                        <MenuButton className={tableStyle.dot_btn}
                            as={IconButton}
                            aria-label='Options'
                            icon={<VerticalDots color={itemId == item?.id ? ColorEnum.BLACK : ColorEnum.GREY} />}
                            variant='outline'
                            border={'none'}
                            _hover={{ bg: '#f7f7f700' }} />
                        <MenuList>
                            <MenuItem className={tableStyle.row} onClick={() => { handleDelete(item?.id) }}>
                                {t("COMMON.DELETE")}
                            </MenuItem>
                            <MenuItem className={tableStyle.row} onClick={() => { navigate(`${item?.id}?lang=${language[0]?.name}`) }}>
                                {t("COMMON.EDIT")}
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
                pageCount={data?.meta?.pageCount} generateBody={generateBody} data={data}
            />
        </div>
    )
}