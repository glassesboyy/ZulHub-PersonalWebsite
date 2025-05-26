import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecapColumn } from "@/types/recap";
import Link from "next/link";

interface RecapDataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: RecapColumn<T>[];
  title: string;
  managePath: string;
}

export function RecapDataTable<T extends Record<string, unknown>>({
  data,
  columns,
  title,
  managePath,
}: RecapDataTableProps<T>) {
  const renderCell = (column: RecapColumn<T>, row: T): React.ReactNode => {
    const value = row[column.accessorKey];
    if (column.cell) {
      return column.cell(value);
    }
    if (typeof value === "string" || typeof value === "number") {
      return value;
    }
    return null;
  };

  return (
    <div className="rounded-md border w-full">
      <div className="flex flex-col xs:flex-row items-center justify-between p-2 xs:p-4 border-b gap-2 xs:gap-0">
        <h2 className="text-lg xs:text-xl font-semibold">{title}</h2>
        <Link href={managePath}>
          <Button size="sm" className="w-full xs:w-auto">
            Manage
          </Button>
        </Link>
      </div>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.accessorKey as string}
                  className="text-xxs xs:text-xs md:text-sm whitespace-nowrap"
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-16 xs:h-20 md:h-24 text-xs xs:text-sm"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.slice(0, 5).map((row, i) => (
                <TableRow key={i}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessorKey as string}
                      className="text-xxs xs:text-xs md:text-sm whitespace-nowrap"
                    >
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
