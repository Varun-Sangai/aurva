import { IconX } from "@tabler/icons-react";
import { PropsWithChildren, useCallback } from "react";
import { twMerge } from "tailwind-merge";

type SideDrawerProps = {
  open: boolean;
  onClose: () => void
  closeable?: boolean;
  overlayProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  sidedrawerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
} & PropsWithChildren;

export default function SideDrawer({
  open,
  onClose: onCloseProp,
  closeable = true,
  overlayProps,
  sidedrawerProps,
  children
}: SideDrawerProps) {

  const onClose = useCallback(() => {
    onCloseProp();
    const body = document.body;
    body.style.overflow = open ? "auto" : "hidden";
  }, [open]);

  const overlayOnClick = useCallback((event: any) => {
    if (overlayProps?.onClick) {
      overlayProps.onClick(event);
    }
    onClose();
  }, [onClose,overlayProps?.onClick]);

  const sidedrawerOnClick = useCallback((event: any) => {
    event.stopPropagation();
    if (sidedrawerProps?.onClick) {
      sidedrawerProps.onClick(event);
    }
  }, [sidedrawerProps?.onClick]);

  return (
    <div {...overlayProps}
      onClick={overlayOnClick} className={twMerge(`${open ? "fixed cursor-pointer top-0 right-0 w-full h-full bg-black/50 z-[1000]" : ""}`, overlayProps?.className)}>
      <div {...sidedrawerProps} onClick={sidedrawerOnClick} className={twMerge(`fixed top-0 right-0 w-full overflow-y-auto max-w-lg h-full flex flex-col  bg-white transition-all duration-300 z-10 ${open ? "translate-x-0" : "translate-x-full"}`, sidedrawerProps?.className)}>
        {closeable && <div className="flex flex-col px-4 py-4 gap-4">
          <IconX className="self-start cursor-pointer !text-grey-300" onClick={() => {
            onClose();
          }}></IconX>
          <div className="flex h-10">
          </div>
        </div>}
        {children}
      </div>
    </div>
  );
}
