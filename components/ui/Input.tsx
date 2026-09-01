import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Input / Textarea — labelled form controls with built-in error display,
 * wired for react-hook-form (spread `register(...)` onto them).
 *
 * @example
 * <Input label="Name" {...register("name")} error={errors.name?.message} />
 * <Textarea label="Message" rows={5} {...register("message")} error={…} />
 */
const fieldClasses =
  "w-full rounded-sm border border-border-default bg-surface-card px-4 py-2.5 text-base text-text-primary placeholder:text-text-secondary transition duration-fast ease-standard focus-visible:border-brand focus-visible:outline-none disabled:opacity-50 aria-[invalid=true]:border-brand-accent";

interface FieldWrapProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  id: string;
  children: (describedBy: string | undefined, invalid: boolean) => React.ReactNode;
}

function FieldWrap({ label, error, hint, required, id, children }: FieldWrapProps) {
  const describedBy = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
        {required ? (
          <span className="text-brand-accent" aria-hidden>
            {" *"}
          </span>
        ) : null}
      </label>
      {children(describedBy, Boolean(error))}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-sm text-text-secondary">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-brand-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, required, id, className, ...props },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldWrap
      label={label}
      error={error}
      hint={hint}
      required={required}
      id={fieldId}
    >
      {(describedBy, invalid) => (
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={cn(fieldClasses, className)}
          {...props}
        />
      )}
    </FieldWrap>
  );
});

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, hint, required, id, className, ...props },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;

    return (
      <FieldWrap
        label={label}
        error={error}
        hint={hint}
        required={required}
        id={fieldId}
      >
        {(describedBy, invalid) => (
          <textarea
            ref={ref}
            id={fieldId}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={cn(fieldClasses, "resize-y", className)}
            {...props}
          />
        )}
      </FieldWrap>
    );
  },
);
