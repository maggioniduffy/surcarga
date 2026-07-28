"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps {
  id: string;
  label: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function CheckboxField({
  id,
  label,
  defaultChecked,
  checked,
  onCheckedChange,
  className,
}: CheckboxFieldProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Checkbox
        id={id}
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="size-[15px] border-line-control-hover data-checked:border-brand data-checked:bg-brand data-checked:text-surface-base"
      />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal text-ink-muted">
        {label}
      </Label>
    </div>
  );
}
