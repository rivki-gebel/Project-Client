import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table'
import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Tooltip from '@mui/material/Tooltip';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Typography } from '@mui/material';
import './ExchangeRateTable.css';

const ExchangeRateTable = ({ exchangeRates }) => {

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');

    const baseCode = exchangeRates.baseCode;
    const conversionRates = exchangeRates.conversionRates;

    const data = useMemo(() => {
        return conversionRates.map(rate => ({
            base: baseCode,
            target: rate.targetCode,
            rate: rate.exchangeRate
        }));
    }, [baseCode, conversionRates]);

    const columns = [
        {
            header: 'Base',
            accessorKey: 'base'
        },
        {
            cell: ({ row }) => (
                <>
                    {row.original.target}
                    <img
                        className='flag'
                        src={`https://www.xe.com/svgs/flags/${row.original.target.toLowerCase()}.static.svg`}
                        alt={`${row.original.target} flag`}
                        style={{ marginLeft: '8px', width: '20px', height: '15px' }}
                    />
                </>
            ),
            header: 'Target',
            accessorKey: 'target'

        },
        {
            header: 'Rate',
            accessorKey: 'rate'
        }
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    });


    return (
        <>
            <div className="container" style={{ width: '100%', maxHeight: '400px' }}>
                <Input className='searchInput' placeholder="Search..." value={filtering} onChange={(e) => setFiltering(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon color='primary' />
                        </InputAdornment>
                    }
                />
                <table className='table'>
                    <thead className='table-header'>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.columnDef.header !== 'Base' && header.column.getCanSort() && <SwapVertIcon onClick={header.column.getToggleSortingHandler()}
                                            style={{ verticalAlign: 'middle', cursor: 'pointer' }} />}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}

                    </tbody>
                </table>

                {table.getRowModel().rows.length === 0 && (
                    <Typography className='noMatch'>
                        <SearchOffIcon color='primary' fontSize="small" style={{ marginRight: 5 }} />
                        No match items found
                    </Typography>
                )}
            </div>

            <div className='pagination'>

                <div className='pageNumber'>
                    <Typography>{`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}</Typography>
                </div>
                <ButtonGroup color="primary" aria-label="Medium-sized button group">
                    <Tooltip title="Previous">
                        <span>
                            <Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} aria-label="back">
                                <ArrowBackIcon />
                            </Button>
                        </span>
                    </Tooltip>
                    <Tooltip title="Next">
                        <span>
                            <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} aria-label="forward">
                                <ArrowForwardIcon />
                            </Button>
                        </span>
                    </Tooltip>
                </ButtonGroup>

            </div>


        </>

    )
};
export default ExchangeRateTable                 