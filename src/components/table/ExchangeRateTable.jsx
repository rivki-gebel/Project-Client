import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

const ExchangeRateTable = ({ exchangeRates }) => {
    console.log("in exchange table", exchangeRates);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Base</TableCell>
                            <TableCell>Target</TableCell>
                            <TableCell>Exchange-Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                         {exchangeRates && exchangeRates.conversion_rates && Object.keys(exchangeRates.conversion_rates)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(target => (
                            <TableRow key={target}>
                                <TableCell>{exchangeRates.base_code}</TableCell>
                                <TableCell>{target}</TableCell>
                                <TableCell>{exchangeRates.conversion_rates[target]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={exchangeRates && exchangeRates.conversion_rates ? Object.keys(exchangeRates.conversion_rates).length:0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ExchangeRateTable;