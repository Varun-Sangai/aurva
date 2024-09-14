import { useCallback, useState } from "react";
import Skeleton, { SkeletonType } from "./Skeleton";
import { twMerge } from "tailwind-merge";

export default function CustomImage(props: { loading: boolean, loadingProps: SkeletonType, imgProps: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> }) {
    const { loadingProps, loading, imgProps } = props;
    const [imgLoading, setImgLoading] = useState<boolean>(true);

    const onLoad = useCallback((event:any) =>{
        if(imgProps?.onLoad){
            imgProps.onLoad(event);
        }
        setTimeout(()=>{setImgLoading(false)},1000);
    }, []);

    return <>
        {(imgLoading || loading) && <Skeleton {...loadingProps}></Skeleton>}
        {loading?null:<img {...imgProps} className={twMerge(`w-full aspect-square ${imgLoading?'hidden':'block'}`,imgProps.className)} onLoad={onLoad}/>}
    </>
}