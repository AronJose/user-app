import React from 'react';
import ReactPaginate from 'react-paginate';
import '../pagination/paging.css'

export default function PaginatedItems({ setCurrentPage, currentPage,totalPage}) {
    console.log(currentPage,)
    const PageChangeOnClick = (event) => {
        setCurrentPage(event.selected + 1) 
        if (totalPage < 6) {
            
        }
        
    };
    return (
        <>
            <ReactPaginate
                className="space-x-2 paging text-gray-700 flex items-center"
                breakLabel="..."
                nextLabel="Next >>"
                onPageChange={PageChangeOnClick}
                pageCount={totalPage}
                previousLabel="<< Previous"
                previousClassName="border px-4 py-2 rounded-full hover:bg-gray-400"
                nextClassName="border px-4 py-2 rounded-full hover:bg-gray-400"
            />
        </>
    )
}