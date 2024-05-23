import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table'
import { useMemo, useState } from 'react';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
            <div className="w3-container" style={{ width: '100%', maxHeight: '400px' }}>
                <input type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)}></input>
                <table className="w3-table-all w3-centered">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{ asc: ' -asc', desc: ' -desc' }[header.column.getIsSorted() ?? null]}
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
                                        {console.log("cell", flexRender(cell.column.columnDef.cell, cell.getContext()))}
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <ButtonGroup aria-label="outlined primary button group">
                <IconButton disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                <IconButton disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} aria-label="forward">
                    <ArrowForwardIcon />
                </IconButton>
            </ButtonGroup>
          
        </>

    )
};
export default ExchangeRateTable                 