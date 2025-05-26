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
import { Social } from "@/types/socials";
import * as TablerIcons from "@tabler/icons-react";
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
import { useRouter } from "next/navigation";
import * as React from "react";

type IconKey = keyof typeof TablerIcons;

interface SocialDataTableProps {
  data: Social[];
  onDelete: (id: number) => void;
  onBulkDelete: (ids: number[]) => void;
}

export function SocialDataTable({
  data,
  onDelete,
  onBulkDelete,
}: SocialDataTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [singleDeleteId, setSingleDeleteId] = React.useState<number | null>(
    null
  );
  const [bulkDeleteIds, setBulkDeleteIds] = React.useState<number[] | null>(
    null
  );

  const handleBulkDelete = async () => {
    if (bulkDeleteIds) {
      await onBulkDelete(bulkDeleteIds);
      setBulkDeleteIds(null);
      setRowSelection({});
    }
  };

  const handleSingleDelete = () => {
    if (singleDeleteId !== null) {
      onDelete(singleDeleteId);
      setSingleDeleteId(null);
    }
  };

  const columns: ColumnDef<Social>[] = [
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
        <div className="text-xxs xs:text-xs md:text-sm font-medium">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => (
        <div className="text-xxs xs:text-xs md:text-sm">Description</div>
      ),
      cell: ({ row }) => (
        <div className="max-w-[100px] xs:max-w-[150px] md:max-w-[200px] truncate text-xxs xs:text-xs md:text-sm">
          {row.original.description}
        </div>
      ),
    },
    {
      accessorKey: "link",
      header: () => <div className="text-xxs xs:text-xs md:text-sm">Link</div>,
      cell: ({ row }) => (
        <Button
          variant="link"
          className="p-0 h-auto text-xxs xs:text-xs md:text-sm text-blue-600 hover:text-blue-600/50 transition-colors duration-300"
          onClick={() =>
            window.open(row.original.link, "_blank", "noopener,noreferrer")
          }
        >
          Visit Link
        </Button>
      ),
    },
    {
      accessorKey: "icon",
      header: () => <div className="text-xxs xs:text-xs md:text-sm">Icon</div>,
      cell: ({ row }) => {
        const IconComponent = TablerIcons[
          row.original.icon as IconKey
        ] as React.ComponentType<{ size: number }>;
        return (
          <div className="flex items-center">
            {IconComponent && <IconComponent size={20} />}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="text-xxs xs:text-xs md:text-sm">Actions</div>
      ),
      cell: ({ row }) => {
        const social = row.original;
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
                  router.push(`/protected/social/detail/${social.id}`)
                }
              >
                Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/protected/social/edit/${social.id}`)
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setSingleDeleteId(social.id)}
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
      {/* Single Delete Dialog */}
      <AlertDialog
        open={!!singleDeleteId}
        onOpenChange={() => setSingleDeleteId(null)}
      >
        <AlertDialogContent className="max-w-[90%] xs:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg xs:text-xl">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xxs xs:text-xs md:text-sm">
              This action will permanently delete this social. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSingleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Dialog */}
      <AlertDialog
        open={!!bulkDeleteIds}
        onOpenChange={() => setBulkDeleteIds(null)}
      >
        <AlertDialogContent className="max-w-[90%] xs:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg xs:text-xl">
              Bulk Delete Socials
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xxs xs:text-xs md:text-sm">
              Are you sure you want to delete {bulkDeleteIds?.length} social
              links?
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
        filterKey="name"
        filterValue={
          (table.getColumn("name")?.getFilterValue() as string) ?? ""
        }
        placeholder="Filter names..."
        onFilterChange={(value) =>
          table.getColumn("name")?.setFilterValue(value)
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
                  No socials found.
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
