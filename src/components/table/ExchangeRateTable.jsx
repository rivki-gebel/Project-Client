import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from '@tanstack/react-table';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const ExchangeRateTable = ({ exchangeRates }) => {
    const data = useMemo(() => {
        if (!exchangeRates || !exchangeRates.conversion_rates) return [];
        return Object.keys(exchangeRates.conversion_rates).map(target => ({
            base: exchangeRates.base_code,
            target,
            rate: exchangeRates.conversion_rates[target]
        }));
    }, [exchangeRates]);

    const columns = useMemo(() => [
        {
            Header: 'Base',
            accessor: 'base'
        },
        {
            Header: 'Target',
            accessor: 'target'
        },
        {
            Header: 'Exchange Rate',
            accessor: 'rate'
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        // pageOptions,
        // pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 10 }
    }, useSortBy, usePagination);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader {...getTableProps()} aria-label="sticky table">
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(event, newPage) => gotoPage(newPage)}
                onRowsPerPageChange={event => {
                    setPageSize(Number(event.target.value));
                    gotoPage(0);
                }}
                nextIconButtonProps={{ onClick: nextPage, disabled: !canNextPage }}
                backIconButtonProps={{ onClick: previousPage, disabled: !canPreviousPage }}
            />
        </Paper>
    );
};

export default ExchangeRateTable;
