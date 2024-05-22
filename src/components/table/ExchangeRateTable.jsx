import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table'
import { useMemo, useState } from 'react';

const ExchangeRateTable = ({ exchangeRates }) => {

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const baseCode = exchangeRates.base_code;
    const conversionRates = exchangeRates.conversion_rates;
    
    const data = useMemo(() => {
        return Object.entries(conversionRates).map(([target, rate]) => ({
            base: baseCode,
            target,
            rate
        }));
    }, [baseCode, conversionRates]);

    const columns = [
        {
            header: 'Base',
            accessorKey: 'base'
        },
        {
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
        state:{
            sorting: sorting,
            globalFilter:filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    });


    return (
        <>
            <div class="w3-container" style={{ width: '100%', maxHeight: '400px' }}>
                <input type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)}></input>
                <table class="w3-table-all w3-centered">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{asc:' -asc',desc:' -desc'}[header.column.getIsSorted()?? null]}
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

            <div>
                <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous</button>
                <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next</button>
            </div>

        </>

    )
};
export default ExchangeRateTable                 