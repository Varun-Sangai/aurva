import { cva, VariantProps } from "class-variance-authority";
import {PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const skeletonStyles = cva(["animate-pulse bg-grey-300 rounded-xl text-transparent"], {
  variants: {
    // customcolor: {
    //   primary: ["!text-gray-600"],
    //   secondary: ["!text-white"],
    //   error:["!text-error-700"],
    //   tertiary: ["!text-transparent"],
    // },
    // backgroundColor: {
    //   primary: ["!bg-white !border-gray-300 hover:!bg-gray-200"],
    //   secondary: ["!bg-primary-500 !border-primary-500 disabled:opacity-[0.6] disabled:cursor-not-allowed hover:!bg-primary-600"],
    //   error:["!bg-error-50 !border-error-200 hover:!bg-error-100"],
    //   tertiary: [""],
    // },
    // customDisabled:{
    //   true:["opacity-[0.8] cursor-not-allowed"],
    //   false:[""]
    // },
    // size: {
    //   default: ["!rounded-xl sm:!px-6 sm:!py-4 !px-4 !py-3"],
    // },
  },
  defaultVariants: {
   
    // customcolor: "primary",
    // backgroundColor: "primary",
    // size: "default",
    // customDisabled:false
  },
});

export type TypographyType = VariantProps<typeof skeletonStyles> & PropsWithChildren & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> ;

const Skeleton=({
  className,
  children,
  ...props
}: TypographyType) => {
  return (
    <div className={twMerge(skeletonStyles({}),className)} {...props}>
      {children}
    </div>
  );
};

export default Skeleton;
