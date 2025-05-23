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
import { Certificate } from "@/types/certificate";
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
import Image from "next/image";
import * as React from "react";
const { useRouter } = require("next/navigation");

interface CertificateDataTableProps {
  data: Certificate[];
  onDelete: (id: number) => Promise<boolean>;
  onBulkDelete: (ids: number[]) => Promise<boolean>;
}

export function CertificateDataTable({
  data,
  onDelete,
  onBulkDelete,
}: CertificateDataTableProps) {
  const router = useRouter();
  const [singleDeleteId, setSingleDeleteId] = React.useState<number | null>(
    null
  );
  const [bulkDeleteIds, setBulkDeleteIds] = React.useState<number[] | null>(
    null
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const handleSingleDelete = async () => {
    if (singleDeleteId) {
      const success = await onDelete(singleDeleteId);
      if (success) {
        setSingleDeleteId(null);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (bulkDeleteIds) {
      const success = await onBulkDelete(bulkDeleteIds);
      if (success) {
        setBulkDeleteIds(null);
        setRowSelection({});
      }
    }
  };

  const columns: ColumnDef<Certificate>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
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
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xxs xs:text-xs md:text-sm"
          >
            Title
            <ArrowUpDown className="ml-2 h-3 xs:h-4 w-3 xs:w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="truncate max-w-[100px] xs:max-w-[200px] md:max-w-[300px] text-xxs xs:text-xs md:text-sm">
          {row.original.title}
        </div>
      ),
    },
    {
      accessorKey: "certificate_image",
      header: ({ column }) => (
        <div className="text-xxs xs:text-xs md:text-sm">Certificate Image</div>
      ),
      cell: ({ row }) => (
        <div className="w-20 xs:w-32 md:w-40 h-12 xs:h-16 md:h-20 relative">
          <Image
            src={row.original.certificate_image}
            alt={row.original.title}
            className="rounded-md"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <div className="text-xxs xs:text-xs md:text-sm">Actions</div>
      ),
      cell: ({ row }) => {
        const certificate = row.original;
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
                  router.push(`/protected/certificate/detail/${certificate.id}`)
                }
              >
                Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/protected/certificate/edit/${certificate.id}`)
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setSingleDeleteId(certificate.id)}
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
        <AlertDialogContent className="max-w-[90%] xs:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg xs:text-xl">
              Delete Certificate
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xxs xs:text-xs md:text-sm">
              Are you sure you want to delete this certificate? This action is
              permanent and cannot be undone.
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

      <AlertDialog
        open={!!bulkDeleteIds}
        onOpenChange={() => setBulkDeleteIds(null)}
      >
        <AlertDialogContent className="max-w-[90%] xs:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg xs:text-xl">
              Bulk Delete Certificates
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xxs xs:text-xs md:text-sm">
              Are you sure you want to delete {bulkDeleteIds?.length}{" "}
              certificates? This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTableHeader
        filterKey="title"
        filterValue={
          (table.getColumn("title")?.getFilterValue() as string) ?? ""
        }
        placeholder="Filter titles..."
        onFilterChange={(value) =>
          table.getColumn("title")?.setFilterValue(value)
        }
        selectedCount={table.getFilteredSelectedRowModel().rows.length}
        onBulkDelete={() => {
          const selectedRows = table.getFilteredSelectedRowModel().rows;
          const selectedIds = selectedRows.map((row) => row.original.id);
          setBulkDeleteIds(selectedIds);
        }}
      />

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
                  No certificates found.
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
