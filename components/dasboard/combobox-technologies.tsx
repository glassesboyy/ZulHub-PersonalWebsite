"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Technology } from "@/types/technology";
import { Badge } from "@/components/ui/badge";

interface ComboboxTechnologiesProps {
  technologies: Technology[];
  selectedTechnologies: Technology[];
  onSelect: (tech: Technology) => void;
  onRemove: (techId: number) => void;
}

export function ComboboxTechnologies({
  technologies,
  selectedTechnologies,
  onSelect,
  onRemove,
}: ComboboxTechnologiesProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select technologies...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search technology..." className="h-9" />
            <CommandList>
              <CommandEmpty>No technology found.</CommandEmpty>
              <CommandGroup>
                {technologies.map((tech) => (
                  <CommandItem
                    key={tech.id}
                    value={tech.name}
                    onSelect={() => {
                      onSelect(tech);
                      setOpen(false);
                    }}
                  >
                    {tech.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTechnologies.some((t) => t.id === tech.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selectedTechnologies.map((tech) => (
          <Badge
            key={tech.id}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {tech.name}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => onRemove(tech.id)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}
