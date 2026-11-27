import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        gold: "bg-gold text-navy shadow-[0_6px_20px_-6px_rgb(212_183_122/0.6)] hover:bg-gold-light hover:shadow-[0_10px_28px_-8px_rgb(212_183_122/0.7)]",
        navy: "bg-navy text-white hover:bg-navy-700",
        "outline-light": "border border-white/25 text-white hover:border-gold hover:text-gold",
        "outline-dark": "border border-navy/15 bg-white text-navy hover:border-gold hover:text-gold-ink",
        ghost: "text-navy hover:text-gold-ink",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
