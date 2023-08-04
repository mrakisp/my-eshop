import { useState, Dispatch, SetStateAction } from "react";
import TablePagination from "@mui/material/TablePagination";

interface PaginationBarProps {
  pagination: {
    page: number;
    perPage: number;
  };
  setPagination: Dispatch<
    SetStateAction<{
      page: number;
      perPage: number;
    }>
  >;
  paginationTotalCount: number;
  perPageOptions?: number[];
}
export default function PaginationBar({
  pagination,
  setPagination,
  paginationTotalCount,
  perPageOptions = [30, 60, 90],
}: PaginationBarProps) {
  const [page, setPage] = useState(pagination.page);
  const [rowsPerPage, setRowsPerPage] = useState(pagination.perPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setPagination({ page: newPage, perPage: rowsPerPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPagination({ page: 0, perPage: parseInt(event.target.value, 10) });
  };

  return (
    <TablePagination
      rowsPerPageOptions={perPageOptions}
      component="div"
      count={paginationTotalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
