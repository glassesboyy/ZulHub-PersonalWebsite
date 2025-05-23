"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableHeader } from "@/components/ui/data-table-header";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Testimonial } from "@/types/testimonials";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import * as React from "react";
const { useRouter } = require("next/navigation");

interface TestimonialDataTableProps {
  data: Testimonial[];
  onDelete: (id: number) => Promise<boolean>;
  onBulkDelete: (ids: number[]) => Promise<boolean>;
  onToggleApproval: (id: number, currentStatus: boolean) => Promise<boolean>;
}

export function TestimonialDataTable({
  data,
  onDelete,
  onBulkDelete,
}: TestimonialDataTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [singleDeleteId, setSingleDeleteId] = React.useState<number | null>(
    null
  );

  const handleSingleDelete = async () => {
    if (singleDeleteId) {
      const success = await onDelete(singleDeleteId);
      if (success) {
        setSingleDeleteId(null);
      }
    }
  };

  const handleBulkDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.id);
    const success = await onBulkDelete(selectedIds);
    if (success) {
      setRowSelection({});
    }
  };

  const columns: ColumnDef<Testimonial>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-xxs xs:text-xs md:text-sm"
        >
          Name
          <ArrowUpDown className="ml-2 h-3 xs:h-4 w-3 xs:w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="max-w-[120px] truncate  text-xxs xs:text-xs md:text-sm font-medium">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "message",
      header: ({ column }) => (
        <div className="text-xxs xs:text-xs md:text-sm">Message</div>
      ),
      cell: ({ row }) => (
        <div className="max-w-[100px] xs:max-w-[150px] md:max-w-[200px] truncate text-xxs xs:text-xs md:text-sm">
          {row.original.message}
        </div>
      ),
    },
    {
      accessorKey: "is_approved",
      header: ({ column }) => (
        <div className="text-xxs xs:text-xs md:text-sm">Status</div>
      ),
      cell: ({ row }) => (
        <div
          className={`px-2 xs:px-4 py-1 w-fit rounded-full text-center text-xxxs xs:text-xxs md:text-xs uppercase font-medium tracking-widest text-white ${
            row.original.is_approved ? "bg-green-600" : "bg-gray-600"
          }`}
        >
          {row.original.is_approved ? "Approved" : "Pending"}
        </div>
      ),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <div className="text-xxs xs:text-xs md:text-sm">Actions</div>
      ),
      cell: ({ row }) => {
        const testimonial = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 xs:h-8 w-6 xs:w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-3 xs:h-4 w-3 xs:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="text-xxs xs:text-xs md:text-sm"
            >
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/protected/testimonial/detail/${testimonial.id}`)
                }
              >
                Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/protected/testimonial/edit/${testimonial.id}`)
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setSingleDeleteId(testimonial.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="space-y-2 xs:space-y-4">
      <AlertDialog
        open={!!singleDeleteId}
        onOpenChange={() => setSingleDeleteId(null)}
      >
        <DataTableHeader
          filterKey="name"
          filterValue={
            (table.getColumn("name")?.getFilterValue() as string) ?? ""
          }
          placeholder="Filter by name..."
          onFilterChange={(value) =>
            table.getColumn("name")?.setFilterValue(value)
          }
          selectedCount={table.getFilteredSelectedRowModel().rows.length}
          onBulkDelete={handleBulkDelete}
        />
        <AlertDialogContent className="max-w-[90%] xs:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg xs:text-xl">
              Delete Multiple Testimonials
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xxs xs:text-xs md:text-sm">
              Are you sure you want to delete{" "}
              {table.getFilteredSelectedRowModel().rows.length} selected
              testimonial(s)? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const selectedRows = table.getFilteredSelectedRowModel().rows;
                const selectedIds = selectedRows.map((row) => row.original.id);
                const success = await onBulkDelete(selectedIds);
                if (success) {
                  setRowSelection({});
                }
              }}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!singleDeleteId}
        onOpenChange={() => setSingleDeleteId(null)}
      >
        <AlertDialogContent className="max-w-[90%] xs:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg xs:text-xl">
              Delete Testimonial
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xxs xs:text-xs md:text-sm">
              Are you sure you want to delete this testimonial? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSingleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No testimonials found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
