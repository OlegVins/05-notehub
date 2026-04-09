import ReactPaginate, {type ReactPaginateProps } from "react-paginate";
import css from './Pagination.module.css';

const Paginate = ((ReactPaginate as unknown) as { default?: React.FC<ReactPaginateProps> }).default || ReactPaginate;
const TypedPaginate = Paginate as React.FC<ReactPaginateProps>;

interface PaginationProps {
    pageCount: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    pageCount,
    onPageChange,
}: PaginationProps) {
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    };

    return (
        <TypedPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={css.pagination}
            activeClassName={css.active}
            pageClassName={css.page}
            previousLabel="<"
            nextLabel=">"
        />
    );
}