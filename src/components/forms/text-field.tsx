import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, controlClassName } from "@/components/forms/field";
import { cn } from "@/lib/utils";

interface TextFieldProps {
  id: string;
  label: string;
  defaultValue?: string;
  /** Controlled value; pair with `onValueChange`. */
  value?: string;
  onValueChange?: (value: string) => void;
  type?: "text" | "date" | "time";
  /** Unit rendered inside the control, right-aligned (e.g. "toneladas"). */
  suffix?: string;
  /** Tighter padding for narrow columns such as the filter sidebar. */
  compact?: boolean;
  className?: string;
}

export function TextField({
  id,
  label,
  defaultValue,
  value,
  onValueChange,
  type = "text",
  suffix,
  compact = false,
  className,
}: TextFieldProps) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <div className="relative">
        <Input
          id={id}
          type={type}
          defaultValue={defaultValue}
          value={value}
          onChange={onValueChange ? (event) => onValueChange(event.target.value) : undefined}
          className={cn(
            controlClassName,
            "h-auto",
            type !== "text" && "text-[13.5px]",
            compact && "px-2 py-2.5 text-[12.5px]",
            suffix && "pr-24"
          )}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-[13.5px] text-ink-ghost">
            {suffix}
          </span>
        ) : null}
      </div>
    </Field>
  );
}

interface TextareaFieldProps {
  id: string;
  label: string;
  hint?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function TextareaField({
  id,
  label,
  hint,
  placeholder,
  rows = 3,
  className,
}: TextareaFieldProps) {
  return (
    <Field label={label} hint={hint} htmlFor={id} className={className}>
      <Textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        className={cn(controlClassName, "resize-y text-sm leading-[1.55]")}
      />
    </Field>
  );
}
