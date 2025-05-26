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
import { Project } from "@/types/projects";
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
import { useRouter } from "next/navigation";
import * as React from "react";

interface ProjectDataTableProps {
  data: Project[];
  onDelete: (id: number) => void;
  onBulkDelete: (ids: number[]) => void;
}

export function ProjectDataTable({
  data,
  onDelete,
  onBulkDelete,
}: ProjectDataTableProps) {
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

  const handleSingleDelete = async () => {
    if (singleDeleteId) {
      await onDelete(singleDeleteId);
      setSingleDeleteId(null);
    }
  };

  const handleBulkDelete = async () => {
    if (bulkDeleteIds) {
      await onBulkDelete(bulkDeleteIds);
      setBulkDeleteIds(null);
      setRowSelection({});
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-gray-600";
      case "on process":
        return "bg-blue-600";
      case "on hold":
        return "bg-yellow-600";
      case "done":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const columns: ColumnDef<Project>[] = [
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
        <div className="max-w-[150px] truncate font-medium text-xxs xs:text-xs md:text-sm">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-xxs xs:text-xs md:text-sm"
        >
          Status
          <ArrowUpDown className="ml-2 h-3 xs:h-4 w-3 xs:w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div
          className={`px-2 xs:px-4 py-1 w-fit rounded-full text-center text-xxxs xs:text-xxs md:text-xs uppercase font-medium tracking-widest text-white ${getStatusColor(
            row.original.status
          )}`}
        >
          {row.original.status}
        </div>
      ),
    },
    {
      accessorKey: "project_image",
      header: () => (
        <div className="text-xxs xs:text-xs md:text-sm">Project Image</div>
      ),
      cell: ({ row }) => (
        <div className="w-20 xs:w-28 md:w-36 h-12 xs:h-14 md:h-16 relative">
          <Image
            src={row.original.project_image}
            alt={row.original.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div className="text-xxs xs:text-xs md:text-sm">Actions</div>
      ),
      cell: ({ row }) => {
        const project = row.original;
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
                  router.push(`/protected/project/detail/${project.id}`)
                }
              >
                Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/protected/project/edit/${project.id}`)
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setSingleDeleteId(project.id)}
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
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xxs xs:text-xs md:text-sm">
              Are you sure you want to delete this project? This action cannot
              be undone.
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

      {/* Bulk Delete Dialog */}
      <AlertDialog
        open={!!bulkDeleteIds}
        onOpenChange={() => setBulkDeleteIds(null)}
      >
        <AlertDialogContent className="max-w-[90%] xs:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg xs:text-xl">
              Bulk Delete Projects
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xxs xs:text-xs md:text-sm">
              Are you sure you want to delete {bulkDeleteIds?.length} projects?
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
          <TableHeader className="bg-muted/50 ">
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
                  No projects found.
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
