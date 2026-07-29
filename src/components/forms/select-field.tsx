"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, controlClassName } from "@/components/forms/field";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: readonly SelectOption[];
  defaultValue?: string;
  /** Controlled value; pair with `onValueChange`. */
  value?: string;
  onValueChange?: (value: string) => void;
  /** Icon rendered inside the trigger, before the value. */
  icon?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export function SelectField({
  id,
  label,
  options,
  defaultValue,
  value,
  onValueChange,
  icon,
  compact = false,
  className,
}: SelectFieldProps) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <SelectControl
        id={id}
        label={label}
        options={options}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        icon={icon}
        compact={compact}
      />
    </Field>
  );
}

/** The trigger + popup on its own, for places with no visible field label. */
export function SelectControl({
  id,
  label,
  options,
  defaultValue,
  value,
  onValueChange,
  icon,
  compact = false,
  className,
}: SelectFieldProps) {
  return (
    <Select
      items={options as SelectOption[]}
      defaultValue={defaultValue}
      value={value}
      onValueChange={
        onValueChange ? (next: string | null) => onValueChange(next ?? "") : undefined
      }
    >
      <SelectTrigger
        id={id}
        aria-label={label}
        className={cn(
          controlClassName,
          "h-auto justify-between gap-2 text-left",
          compact && "px-3 py-[11px] text-[13.5px]",
          className
        )}
      >
        {icon ? <span className="shrink-0 text-ink-faint">{icon}</span> : null}
        <SelectValue className="truncate" />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
