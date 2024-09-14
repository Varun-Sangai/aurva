import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const typographyStyles = cva([], {
  variants: {
    variant:{
      h1:["font-semibold text-4xl"],
      h2:["font-semibold text-3xl"],
      h3:["font-semibold text-2xl"],
      h4:["font-semibold text-xl"],
      h5:["font-semibold text-lg "],
      h6:["font-semibold text-base"],
      subtitle:["font-semibold text-sm"],
      body1:["font-normal text-sm"],
      body2:["font-normal text-xs"],
    },
    fontWeight:{
      400:["font-normal"],
      500:["font-medium"],
      600:["font-semibold"],
      700:["font-bold"],
    },
    loading:{
      true:["animate-pulse bg-grey-300 rounded-xl text-transparent"],
      false:[""]
    }
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
    variant: "body1",
    fontWeight:600,
    loading:false
    // customcolor: "primary",
    // backgroundColor: "primary",
    // size: "default",
    // customDisabled:false
  },
});

export type TypographyType = VariantProps<typeof typographyStyles> & PropsWithChildren & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> ;

const Typography=({
  variant,
  fontWeight,
  loading,
  className,
  children,
  ...props
}: TypographyType) => {
  return (
    <div className={twMerge(typographyStyles({variant,fontWeight,loading}),className)} {...props}>
      {children}
    </div>
  );
};

export default Typography;
