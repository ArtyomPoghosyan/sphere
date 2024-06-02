import React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { t } from "i18next";
import debounce from "lodash/debounce";
import Cookies from "universal-cookie";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Td, Tr } from "@chakra-ui/react";
import {
    activeMessageThunk, archiveMessageThunk, getArchivedMessagesThunk,
    getSupportFilterThunk, getSupportThunk, handleSupportState
} from "@/store";

import { TableComponent } from "@/components";
import VerticalDots from "@/components/custom-icons/dotes";
import tableStyle from "@components/admin-table/table.module.css";
import { maxtextLimit, minTextLimit, takeCount } from "@/helpers/text-limit";
import { AnswerEnum, ColorEnum, CommonEnum, TableColumnTitleEnum } from "@/constants/enum";

import { ICommonState, IGenerateSupportData, IPageChangeHandler, ISupportData } from "@/models/table";

export const Support: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const cookies = new Cookies();
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemId, setItemId] = useState<number | null>();
    const [searchFilter, setSearchFilter] = useState<string>("");
    const page = searchParams.get(CommonEnum.PAGE);
    const decodedValues = decodeURIComponent(searchParams.get(CommonEnum.FILTER) as string);
    const { data } = useAppSelector((state: ICommonState) => state.support);

    const tableColumnTitle: string[] = [
        TableColumnTitleEnum.NUMBER,
        TableColumnTitleEnum.FIRST_NAME,
        TableColumnTitleEnum.EMAIL,
        TableColumnTitleEnum.MESSAGE,
        TableColumnTitleEnum.STATUS,
        TableColumnTitleEnum.ACTION
    ]

    useEffect(() => {
        if (location.search.includes(CommonEnum.ARCHIVE)) {
            dispatch(getArchivedMessagesThunk({ take: takeCount, page: page ?? 1 }));
        }
        else if (location.search.includes(CommonEnum.FILTER_QUESTION)) {
            dispatch(getSupportFilterThunk({ searchValue: decodedValues, take: takeCount, page: page ?? 1 }));
        }
        else {
            dispatch(getSupportThunk({ take: takeCount, page: page ?? 1 }));
        }
        return () => {
            dispatch(handleSupportState.resetArchiveData());
            dispatch(handleSupportState.resetFilterData());
            dispatch(handleSupportState.resetTotalPages());
        };
    }, [])

    const handleGetArchivedData = (): void => {
        cookies.set(CommonEnum.PAGE, CommonEnum.PAGE_NUMBER_0);
        setSearchParams({ title: "archive", page: `${1}` })
        setSearchFilter("");
        dispatch(handleSupportState.resetFilterData());
        dispatch(getArchivedMessagesThunk({ take: takeCount, page: 1 }));
    };

    const handleGetSupportList = (): void => {
        dispatch(handleSupportState.resetArchiveData());
        dispatch(handleSupportState.resetFilterData());
        dispatch(getSupportThunk({ take: takeCount, page: 1 }));
        setSearchParams({ title: "support", page: `1` })
        setSearchFilter("");
    }

    const handleArchive = (id: number, status: string): void => {
        const data = {
            id,
            take: takeCount,
            page
        }
        if (status == CommonEnum.ACTIVE) {
            dispatch(archiveMessageThunk(data))
        }
        else {
            dispatch(activeMessageThunk(data))
        }
    }

    const debouncedHandleSupportFilter = useRef(debounce((searchValue: string): void => {
        setSearchFilter(searchValue)
        setSearchParams({ filter: `${encodeURIComponent(searchValue)}`, page: `${1}` })
        dispatch(getSupportFilterThunk({ searchValue, take: takeCount, page: 1 }));

    }, 500)).current;

    useEffect(() => {
        return () => {
            debouncedHandleSupportFilter.cancel()
        }
    }, [debouncedHandleSupportFilter]);

    useEffect(() => {
        const result = decodedValues == CommonEnum.NULL ? "" : decodedValues;
        setSearchFilter(result)
    }, [])

    const handleAnswer = (id: number): void => {
        // navigate(`${AnswerEnum.ANSWER}/${id}`)
        // navigate(`${id}?tab=${AnswerEnum.ANSWER}`)
        navigate(`/support/${id}?tab=${AnswerEnum.ANSWER}`);
    }

    const onPageChange = ({ selected }: IPageChangeHandler): void => {
        // setCurrentPage(selected)
        if (location.search.includes(CommonEnum.ARCHIVE)) {
            dispatch(getArchivedMessagesThunk({ take: takeCount, page: selected ? +selected + 1 : 1 }));
            setSearchParams({ title: "archive", page: `${selected ? selected + 1 : 0}` })
        }
        else if (location.search.includes(CommonEnum.FILTER)) {
            dispatch(getSupportFilterThunk({ searchValue: decodedValues, take: takeCount, page: selected ? +selected + 1 : 1 }));
            setSearchParams({ filter: decodedValues, page: `${selected ? selected + 1 : 0}` })
        }
        else {
            setSearchParams({ page: `${selected + 1}` })
            dispatch(getSupportThunk({ take: takeCount, page: selected + 1 }))
        }
    }

    const generateBody = (data: IGenerateSupportData): JSX.Element[] => {
        return data?.data?.map((item: ISupportData, index: number) =>
            <Tr key={item?.id} className={tableStyle.row} >
                <Td>{(page  && +page>1) ? (+page-1) * 10 + index+1  : index + 1}</Td>
                <Td>{item?.name}</Td>
                <Td>{item?.email}</Td>
                <Td>{item?.message.slice(minTextLimit, maxtextLimit)}</Td>
                <Td>{item?.status}</Td>
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
                            <MenuItem className={tableStyle.row} onClick={() => { handleAnswer(item?.id) }}>
                                {t("SUPPORT.ANSWER_THE_QUESTION")}
                            </MenuItem>
                            <MenuItem className={tableStyle.row} onClick={() => { handleArchive(item?.id, item?.status) }}>
                                {item?.status == CommonEnum.ACTIVE ? `${t("COMMON.ARCHIVE")}` : `${t("COMMON.ACTIVE")}`}
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Td>
            </Tr>
        )
    }
    return (
        <div>
            <TableComponent onPageChange={onPageChange} tableColumnTitle={tableColumnTitle} generateBody={generateBody}
                data={data?.data} pageCount={data?.data?.meta?.pageCount} handleGetArchivedData={handleGetArchivedData} setSearchFilter={setSearchFilter}
                searchFilter={searchFilter} handleGetSupportList={handleGetSupportList} searchParams={searchParams} setSearchParams={setSearchParams}
                debouncedHandleSupportFilter={debouncedHandleSupportFilter} />
        </div>
    )
}