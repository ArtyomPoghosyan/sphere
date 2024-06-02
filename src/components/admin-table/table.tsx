import { ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks';
import {
    Table, Thead, Tbody, Tr, Th, TableContainer, Button, Menu, MenuButton, IconButton,
    MenuList, RadioGroup, Checkbox, VStack
} from '@chakra-ui/react';
import { t } from 'i18next';

import { Search } from '../search/search-filter';
import { Paginations } from '../pagination/pagination';
import { greenColor, whiteColor } from '@/helpers/colors';
import SkeletonLoading from '../skeleton/skeleton-loading';
import { transferStatusItems } from '@/helpers/transaction';
import { ICommonState, ISupportData, ITableProps } from '@/models/table';
import { AlertMessageEnum, CommonEnum, ContentEnum, ManagerEnum, TransferEnum } from '@/constants/enum';

import arrow from "@assets/icons/arrow.svg";
import search from "@assets/icons/search.svg";
import archive from "@assets/icons/archive.svg";
import FilterIcon from '../custom-icons/filter';
import tableStyle from "./table.module.css";
import { AlertMessage } from '@/helpers';

export const TableComponent = (props: ITableProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tableColumnTitle, generateBody, onPageChange, data, pageCount, handleGetArchivedData, handleGetSupportList,
        debouncedHandleSupportFilter, searchFilter, setSearchFilter, checkedItems, setCheckedItems, value, setValue } = props;
    const currentData: ISupportData[] = data;
    const pathLocation = location?.pathname?.slice(1);
    const pageQuery: string = location.search;
    const { isLoading: userLoading, deleteError } = useAppSelector((state: ICommonState) => state.user);
    const { isLoading, updateManagerLoading, deleteManagerError } = useAppSelector((state: ICommonState) => state.manager);
    const { getArchiveLoading, totalPages, isLoading: supportLoading } = useAppSelector((state: ICommonState) => state.support);
    const { isLoading: transactionLoading } = useAppSelector((state: ICommonState) => state.transaction)
    const { deleteContentLoading, isLoading: contentLoading, deleteContentError } = useAppSelector((state: ICommonState) => state.content);

    const handleInputText = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()
        debouncedHandleSupportFilter(event.target.value);
        setSearchFilter(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    const handleCheckboxChange = (value: string): void => {
        if (checkedItems.includes(value)) {
            setCheckedItems(checkedItems.filter((item: string) => item !== value));
        } else {
            setCheckedItems([...checkedItems, value]);
        }
    };

    return (
        <div className={location?.pathname.includes(CommonEnum.SUPPORT) ? tableStyle.table_main_container : ""}>
            <div className={tableStyle.suppor_main_container}>
                <div className={tableStyle.form_container}>
                    <form className={tableStyle.support_btn_block}>
                        {pathLocation === ManagerEnum.SUPPORT ? (
                            <>
                                <div className={tableStyle.input_container}>
                                    <Search searchFilter={searchFilter} setSearchFilter={setSearchFilter}
                                        handleInputText={handleInputText} handleKeyDown={handleKeyDown} />
                                    <img className={tableStyle.search_icon} src={search} />
                                    <Button
                                        className={`${tableStyle.support_archive_btn} ${pageQuery.includes(CommonEnum.ARCHIVE) ? tableStyle.archive_has_border : ''}`}
                                        onClick={handleGetArchivedData}
                                        colorScheme={whiteColor}
                                        variant='solid'>
                                        <div className={tableStyle.support_btn_inside_container}>
                                            <img
                                                className={tableStyle.support_archive_img}
                                                src={archive}
                                                alt="Archive Icon" />
                                        </div>
                                    </Button>
                                </div>
                                {pageQuery.includes(CommonEnum.ARCHIVE) && <Button
                                    className={tableStyle.support_back_btn}
                                    onClick={handleGetSupportList}
                                    colorScheme={whiteColor}
                                    variant='solid'>
                                    <div className={tableStyle.support_back_btn_inside_container}>
                                        <img
                                            className={tableStyle.support_arrow_img}
                                            src={arrow}
                                            alt="Archive Icon" />
                                        <span>{t("COMMON.BACK")}</span>
                                    </div>
                                </Button>}
                            </>
                        ) : pathLocation == TransferEnum.TRANSFER &&
                        <div className={tableStyle.transaction_container}>
                            <Search place={TransferEnum.TRANSFER_TEXT} searchFilter={searchFilter} setSearchFilter={setSearchFilter}
                                handleInputText={handleInputText} handleKeyDown={handleKeyDown} />
                            <img className={tableStyle.transfer_search_icon} src={search} />
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    variant='outline'
                                    icon={<FilterIcon />}
                                    className={tableStyle.filter_btn}
                                />
                                <MenuList className={tableStyle.radio_btn_container}>
                                    <RadioGroup onChange={setValue} value={value} className={tableStyle.radio_container}>
                                        <VStack spacing={4}>
                                            <div className={tableStyle.radio_group_container}>
                                                {transferStatusItems.map((item) => (
                                                    <div className={tableStyle.checkbox_items}>
                                                        <Checkbox
                                                            key={item.id}
                                                            colorScheme={greenColor}
                                                            value={item.id}
                                                            isChecked={checkedItems.includes(item.id)}
                                                            onChange={() => handleCheckboxChange(item.id)}>
                                                            <p>
                                                                {item.label}
                                                            </p>
                                                        </Checkbox>
                                                    </div>
                                                ))}
                                            </div>
                                        </VStack>
                                    </RadioGroup>
                                </MenuList>
                            </Menu>
                        </div>
                        }
                    </form>
                </div>
            </div>
            {getArchiveLoading ? <SkeletonLoading /> :
                <TableContainer className={tableStyle.table_container}>
                    {deleteError || deleteManagerError || deleteContentError ? <AlertMessage status={AlertMessageEnum.ERROR_STATUS} text={t("BACKVALIDATION.Internal server error")} /> : null}
                    {/* {deactivateSuccess || deleteSuccess || deleteManagerSuccess || archiveSuccess || deleteContentSuccess && <AlertMessage />} */}
                    {isLoading || supportLoading || userLoading || deleteContentLoading || transactionLoading || contentLoading || updateManagerLoading
                        ? <SkeletonLoading /> :
                        <>
                            <div className={tableStyle.main_container}>
                                <h1 className={tableStyle.page_title}>{pathLocation.replace(/-/g, ' ').toUpperCase()}</h1>
                                {pathLocation == ManagerEnum.MANAGER ?
                                    <Button className={tableStyle.add_manager_btn} onClick={() => { navigate('/managers/add') }}
                                        colorScheme={greenColor} variant='solid'>
                                        <span className={tableStyle.plusIcon}>+</span> <span className={tableStyle.add_manager_text}>{t("MANAGER.ADD_MANAGER")}</span>
                                    </Button> : pathLocation == ContentEnum.CONTENT ?
                                        <Button className={tableStyle.add_manager_btn} onClick={() => { navigate('/content-management/add-news') }}
                                            colorScheme={greenColor} variant='solid'>
                                            <span className={tableStyle.plusIcon}>+</span> <span className={tableStyle.add_manager_text}>{t("CONTENT.ADD_NEWS")}</span>
                                        </Button> :
                                        null}
                            </div>
                            <Table variant='simple' className={tableStyle.table_info_block}>
                                <Thead>
                                    <Tr className={tableStyle.table_titles}>
                                        {tableColumnTitle.map((item: string, index: number) => (
                                            <Th className={location.pathname.includes(CommonEnum.TRANSFER_HISTORY) ?
                                                tableStyle.transfer_history_table : tableStyle.table_header_container} key={index}>{item}</Th>
                                        ))}
                                    </Tr>
                                </Thead>
                                <Tbody >
                                    {generateBody(currentData)}
                                </Tbody>
                            </Table>
                        </>
                    }
                    <Paginations
                        onPageChange={onPageChange}
                        pageCount={totalPages !== 0 ? totalPages : pageCount} />
                </TableContainer >
            }
        </div>
    )
}