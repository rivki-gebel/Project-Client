import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table'
import { useMemo } from 'react';

const ExchangeRateTable = ({ exchangeRates }) => {
       
    const data = useMemo(() => {
        return Object.entries(exchangeRates.conversion_rates).map(([target, rate]) => ({
            base: exchangeRates.base_code,
            target,
            rate
        }));
    }, [exchangeRates]);

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

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

    return (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table>
                <thead>
                      {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                                    {console.log("cell",flexRender(cell.column.columnDef.cell, cell.getContext()))}                                    
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
};
export default ExchangeRateTable                 