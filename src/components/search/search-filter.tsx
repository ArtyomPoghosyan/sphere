import { Input } from "@chakra-ui/react";
import { SearchProps } from "@/models/table";

import { t } from "i18next";

import tableStyle from "../admin-table/table.module.css";

export const Search = (props: SearchProps) => {
    const { searchFilter, handleInputText, handleKeyDown, place } = props;
    return (
        <div className={place ? tableStyle.transfer_search_block : ""}>
            <Input style={{ paddingLeft: "30px" }}
                type="text"
                value={searchFilter}
                onChange={handleInputText}
                onKeyDown={handleKeyDown}
                placeholder={t("SUPPORT.SEARCH_TYPE_PLACE")}
                focusBorderColor='#04B358'
                borderWidth='0.5px'
                className={place ? tableStyle.transfer_search_container : tableStyle.filter_input} />
        </div>
    )
}