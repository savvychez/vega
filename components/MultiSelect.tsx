"use client"
 
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type SelectOption = {
  value: string;
  label: string;
};

const selectOptions: SelectOption[] = [
  {
    value: "haircut",
    label: "Haircut",
  },
  {
    value: "nails",
    label: "Nails",
  },
  {
    value: "massage",
    label: "Massage",
  },
  {
    value: "botox",
    label: "Botox",
  },
  {
    value: "eyelashes",
    label: "Eyelashes",
  },
  {
    value: "waxing",
    label: "Waxing",
  },
  {
    value: "other",
    label: "Other",
  },
];

type MultiSelectProps = {
    // value: string[],
    selectOptions: SelectOption[],
    defaultSelections: string[],
    onChange: (value: string[]) => void,
    className?: string,
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(({selectOptions, defaultSelections, onChange, className,  ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (defaultSelections && defaultSelections.length > 0) {}
      setSelectedValues(defaultSelections);
  }, []);

  React.useEffect(() => {
    onChange(selectedValues);
  }, [selectedValues]);

  const toggleService = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const getServiceLabels = () => {
    if (selectedValues.length === 0) {
      return "Service(s) provided";
    }
    return selectOptions
      .filter((service) => selectedValues.includes(service.value))
      .map((service) => service.label)
      .join(", ");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={"w-full mt-1 justify-between bg-white hover:bg-white/50 focus:bg-white/90 pl-3 font-normal "  + (selectedValues.length === 0 ? "text-zinc-400" : "text-zinc-900")} 
        >
          {getServiceLabels()}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 bg-white text-zinc-700">
        <Command>
          <CommandInput placeholder="Search services..." className="h-9" />
          <CommandEmpty>No services found.</CommandEmpty>
          <CommandGroup>
            {selectOptions.map((service) => (
              <CommandItem
                key={service.value}
                value={service.value}
                className="hover:bg-red-50/50 rounded-md cursor-pointer"
                onSelect={() => toggleService(service.value)}
              >
                {service.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedValues.includes(service.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

export default MultiSelect;
