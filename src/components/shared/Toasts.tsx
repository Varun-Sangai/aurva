import toast from "react-hot-toast";
import { IconExclamationCircle } from '@tabler/icons-react';

export const warningToast=(message:string)=>{
    toast(message,{icon:<IconExclamationCircle className="text-warning-main w-6 h-6"></IconExclamationCircle>})
}


export const successToast=(message:string)=>{
    toast.success(message);
}


export const errorToast=(message:string)=>{
    toast.error(message);
}