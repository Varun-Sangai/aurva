import { cva, VariantProps } from "class-variance-authority";
import {PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const skeletonStyles = cva(["animate-pulse bg-grey-300 rounded-xl text-transparent"], {
  variants: {
  },
  defaultVariants: {
  },
});

export type SkeletonType = VariantProps<typeof skeletonStyles> & PropsWithChildren & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> ;

const Skeleton=({
  className,
  children,
  ...props
}: SkeletonType) => {
  return (
    <div className={twMerge(skeletonStyles({}),className)} {...props}>
      {children}
    </div>
  );
};

export default Skeleton;
