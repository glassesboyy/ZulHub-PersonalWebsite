import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface RecapDataTableProps {
  data: any[];
  columns: {
    header: string;
    accessorKey: string;
    cell?: (value: any) => React.ReactNode;
  }[];
  title: string;
  managePath: string;
}

export function RecapDataTable({
  data,
  columns,
  title,
  managePath,
}: RecapDataTableProps) {
  const renderCell = (column: any, row: any) => {
    if (column.cell) {
      return column.cell(row[column.accessorKey]);
    }
    return row[column.accessorKey];
  };

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={managePath}>
          <Button>Manage</Button>
        </Link>
      </div>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.slice(0, 5).map((row, i) => (
                <TableRow key={i}>
                  {columns.map((column) => (
                    <TableCell key={column.accessorKey}>
                      {renderCell(column, row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
