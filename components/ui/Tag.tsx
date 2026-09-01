import { cn } from "@/lib/utils";

/**
 * Tag — a compact pill for a single piece of metadata: a tech name, a tool, a
 * project category. Lighter weight than <Badge />.
 *
 * @example
 * <Tag>Figma</Tag>
 * <Tag leading={<span aria-hidden>◆</span>}>Prototyping</Tag>
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  leading?: React.ReactNode;
}

export function Tag({ leading, className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border-default bg-surface-card px-3 py-1 text-sm font-medium text-text-secondary",
        className,
      )}
      {...props}
    >
      {leading}
      {children}
    </span>
  );
}
