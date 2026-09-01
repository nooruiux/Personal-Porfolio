import { cn } from "@/lib/utils";

/**
 * Container — horizontal layout constraint. The single place the site's max
 * content width and gutter are defined.
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "header" | "footer" | "nav";
}

export function Container({
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}
