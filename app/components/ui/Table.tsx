// app/components/ui/Table.tsx
import React from 'react';

interface Column {
    key: string;
    header: string;
    width?: string;
}

interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
    striped?: boolean;
    hoverable?: boolean;
    bordered?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const Table: React.FC<TableProps> = ({
    columns,
    data,
    striped = false,
    hoverable = true,
    bordered = true,
    size = 'md'
}) => {
    const sizeStyles = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    const paddingStyles = {
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4'
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg border-2" style={{ borderColor: 'var(--color-second-header)' }}>
            <table className={`w-full ${sizeStyles[size]}`}>
                {/* Table Header */}
                <thead style={{ backgroundColor: 'var(--color-head-table)' }}>
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={column.key}
                                className={`${paddingStyles[size]} text-left font-semibold border-r-2 last:border-r-0`}
                                style={{
                                    color: 'var(--color-header)',
                                    width: column.width || 'auto',
                                    borderColor: 'var(--color-second-header)'
                                }}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {data.length === 0 ? (
                        <tr style={{ backgroundColor: 'var(--color-firstrow)' }}>
                            <td
                                colSpan={columns.length}
                                className={`${paddingStyles[size]} text-center`}
                                style={{ color: 'var(--color-header)', opacity: 0.6 }}
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`
                                    ${bordered ? 'border-t-2' : ''}
                                    ${hoverable ? 'hover:opacity-80 transition-opacity duration-150' : ''}
                                `}
                                style={{
                                    backgroundColor: striped && rowIndex % 2 === 1
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'var(--color-firstrow)',
                                    borderColor: bordered ? 'var(--color-second-header)' : undefined
                                }}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={column.key}
                                        className={`${paddingStyles[size]} border-r-2 last:border-r-0`}
                                        style={{
                                            color: 'var(--color-header)',
                                            borderColor: 'var(--color-second-header)'
                                        }}
                                    >
                                        {row[column.key] ?? '-'}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};