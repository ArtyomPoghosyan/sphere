import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import dayjs from "dayjs";
import debounce from "lodash/debounce";
import { Td, Tr } from "@chakra-ui/react";

import { getTransactionThunk } from "@/store";
import { TableComponent } from "@/components";
import { ICommonState, IGenerateTransferData, ISelected, ITableData, ITransactionState, ITransferInfo } from "@/models/table";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { takeCount } from "@/helpers/text-limit";
import { CommonEnum, DateFormat, TableColumnTitleEnum } from "@/constants/enum";

import tableStyle from "@components/admin-table/table.module.css";

export const TransferHistory = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchFilter, setSearchFilter] = useState<string>("");
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const getSearchParams = searchParams.getAll(CommonEnum.STATUS);
    const page = searchParams.get(CommonEnum.PAGE);
    const { data } = useAppSelector((state: ICommonState) => state.transaction) as ITransactionState;
    const decodedValues = decodeURIComponent(searchParams.get(CommonEnum.FILTER) as string);

    const tableColumnTitle: string[] = [
        TableColumnTitleEnum.NUMBER,
        TableColumnTitleEnum.NAME,
        TableColumnTitleEnum.AMOUNT,
        TableColumnTitleEnum.DESCRIPTION,
        TableColumnTitleEnum.STATUS,
        TableColumnTitleEnum.DATE
    ]

    useEffect(() => {
        if (location.search.includes(CommonEnum.FILTER_QUESTION)) {
            dispatch(getTransactionThunk({ searchValue: decodedValues, take: takeCount, page: page ?? 1 } as ITransferInfo))
        }
        else if (location.search.includes(CommonEnum.STATUS)) {
            dispatch(getTransactionThunk({ take: takeCount, page: page, checkedItems: getSearchParams } as ITransferInfo))
        }
        else {
            dispatch(getTransactionThunk({ take: takeCount, page: page ?? 1 }  as ITransferInfo))
        }
    }, [])

    const debouncedHandleSupportFilter = useRef(debounce((searchValue: string): void => {
        setSearchFilter(searchValue)
        setSearchParams({ filter: `${encodeURIComponent(searchValue)}`, page: `${1}` })
        dispatch(getTransactionThunk({ searchValue, take: takeCount, page: 1 }  as ITransferInfo));
    }, 500)).current;

    useEffect(() => {
        return () => {
            debouncedHandleSupportFilter.cancel()
        }
    }, [debouncedHandleSupportFilter]);

    useEffect(() => {
        if (checkedItems.length) {
            setSearchParams({ page: "1", status: checkedItems })
            dispatch(getTransactionThunk({ take: takeCount, page: 1, checkedItems }))
        }
        else {
            searchParams.delete(CommonEnum.STATUS);
            setSearchParams && setSearchParams(searchParams);
            dispatch(getTransactionThunk({ searchValue: decodedValues !== CommonEnum.NULL ? decodedValues : '', take: takeCount, page: page ?? 1 }  as ITransferInfo))
        }
    }, [checkedItems]);

    useEffect(() => {
        if (getSearchParams?.length && !checkedItems.length) {
            setCheckedItems(getSearchParams);
        }
        setSearchFilter(decodedValues ==  CommonEnum.NULL ? "" : decodedValues)
    }, [])

    const onPageChange = ({ selected }: ISelected): void => {
        const newPage = (selected + 1).toString();
        setSearchParams({ filter: decodedValues, status: getSearchParams, page: newPage})
        dispatch(getTransactionThunk({ take: takeCount, checkedItems: getSearchParams, page: selected + 1 }))
    }

    const generateBody = (data:IGenerateTransferData): JSX.Element[] => {
        return data?.data?.map((item: ITableData, index: number) =>
            <Tr key={item?.id} className={tableStyle.row} >
                 <Td>{(page  && +page>1) ? (+page-1) * 10 + index+1  : index + 1}</Td>
                <Td>{item?.fullName}</Td>
                <Td>{item?.amount}</Td>
                <Td>{item?.description}</Td>
                <Td>{item?.status}</Td>
                <Td>{dayjs(item?.dateOfBirth).format(DateFormat.COMMONDATE)}</Td>
            </Tr>
        )
    }

    return (
        <div>
            <TableComponent onPageChange={onPageChange} tableColumnTitle={tableColumnTitle}
                pageCount={data?.meta?.pageCount} generateBody={generateBody} data={data} setSearchFilter={setSearchFilter}
                searchFilter={searchFilter} debouncedHandleSupportFilter={debouncedHandleSupportFilter}
                checkedItems={checkedItems} setCheckedItems={setCheckedItems} 
            />
        </div>
    )
}