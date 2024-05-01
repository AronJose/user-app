import React from 'react';
import ReactPaginate from 'react-paginate';
import '../pagination/paging.css'

export default function PaginatedItems({ setCurrentPage }) {
    const PageChangeOnClick = (event) => {
        setCurrentPage(event.selected + 1)
    };
    return (
        <>
            <ReactPaginate className="pagination p-0 paging m-5  me-5 mt-2"
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={PageChangeOnClick}
                pageCount={2}
                previousLabel="< Previous" />
        </>
    )
}