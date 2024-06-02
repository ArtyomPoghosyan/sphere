import React, { useState } from "react";
import Pagination from "react-paginate";
import { useSearchParams } from "react-router-dom";

import Cookies from "universal-cookie";

import pageStyle from "../admin-table/table.module.css";
import { CommonEnum } from "@/constants";

interface PaginationsProps {
  onPageChange: (ev: { selected: number }) => void;
  pageCount: number;
}

export const Paginations: React.FC<PaginationsProps> = ({ onPageChange, pageCount }) => {
  const cookies = new Cookies();
  const [searchParams, _] = useSearchParams();
  const pages = searchParams.get(CommonEnum.PAGE)
  const page = !isNaN(Number(pages)) ? Number(pages) : 1
  const [currentPage, setCurrentPage] = useState<number>(Number(pages));
  const changeCurrentPage = ({ selected: numPage }: { selected: number }) => {
    setCurrentPage(numPage);
    cookies.set(CommonEnum.PAGE, numPage);
  };
  const renderPagination = (prev: string, next: string) => {
    return (
      <div>
        {
          typeof page == CommonEnum.NUMBER &&
          <Pagination
            nextLabel={next}
            onPageChange={(ev) => {
              onPageChange(ev);
              changeCurrentPage(ev);
            }}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel={prev}
            pageClassName={pageStyle.page_item}
            pageLinkClassName={pageStyle.page_link}
            previousClassName={pageStyle.page_item}
            previousLinkClassName={pageStyle.page_link}
            nextClassName={pageStyle.page_item}
            nextLinkClassName={pageStyle.page_link}
            breakLabel=". . ."
            breakClassName={pageStyle.page_item}
            breakLinkClassName={pageStyle.page_link}
            containerClassName={pageStyle.pagination_item}
            activeClassName={pageStyle.active_page_item}
            renderOnZeroPageCount={null}
            forcePage={page ? page - 1 : 0}
          />
        }
      </div>
    );
  };

  return (
    <div>
      {pageCount !== 1 && pageCount!= undefined ?
        currentPage + 1 <= 1
          ? renderPagination("", ">")
          : currentPage + 1 >= pageCount
            ? renderPagination("<", "")
            :
            renderPagination("<", ">")
        : null
      }
    </div>
  )
}

