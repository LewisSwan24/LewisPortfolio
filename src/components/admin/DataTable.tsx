import React from 'react';
import styles from '@/styles/admin/data-table.module.css';

interface Column {
  header: string;
  accessor: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export default function DataTable({ columns, data }: DataTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => <th key={col.accessor}>{col.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => <td key={col.accessor}>{row[col.accessor]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
