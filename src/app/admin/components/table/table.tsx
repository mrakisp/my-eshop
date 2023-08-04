"use client";

import * as React from "react";

import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";

interface DataTableProps {
  children: React.ReactNode;
  columns: {
    label: string;
    align: string;
    action?: JSX.Element;
  }[];
  stickyHeader?: boolean;
}
export default function DataTable({
  children,
  columns,
  stickyHeader = true,
}: DataTableProps) {
  return (
    <TableContainer>
      <Table stickyHeader={stickyHeader} size="small">
        <TableHead>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {columns.map((column: any) => (
              <TableCell key={column.label} align={column.align} variant="head">
                {column.label} {column.action}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
