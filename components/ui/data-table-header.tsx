import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";

interface DataTableHeaderProps {
  filterKey: string;
  filterValue: string;
  placeholder: string;
  onFilterChange: (value: string) => void;
  selectedCount: number;
  onBulkDelete: () => void;
}

export function DataTableHeader({
  filterKey,
  filterValue,
  placeholder,
  onFilterChange,
  selectedCount,
  onBulkDelete,
}: DataTableHeaderProps) {
  return (
    <AlertDialog>
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder={placeholder}
            value={filterValue ?? ""}
            onChange={(event) => onFilterChange(event.target.value)}
            className="max-w-sm"
          />
          {filterValue && (
            <Button
              variant="ghost"
              onClick={() => onFilterChange("")}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            disabled={selectedCount === 0}
            onClick={onBulkDelete}
            className="whitespace-nowrap"
          >
            Delete Selected
          </Button>
        </AlertDialogTrigger>
      </div>
    </AlertDialog>
  );
}
