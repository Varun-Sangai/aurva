import { IconX } from "@tabler/icons-react";
import { useMeal } from "../../../apis/queries/meals.queries";
import Typography from "../../shared/Tyography";
import { generateArray } from "../../../utils/helper";
import CustomImage from "../../shared/Image";
import { useEffect } from "react";
import { errorToast } from "../../shared/Toasts";

type SideMealDetailProps = {
    id: string;
    onClose: () => void;
}

export default function MealDetail({ id, onClose }: SideMealDetailProps) {

    const meal = useMeal(id);
    const loading = meal?.isFetching;
    
    useEffect(()=>{
        if(meal?.error){
            errorToast(meal?.error?.message || "Error fetching meal!!")
        }
    },[meal?.error]);

    return <div className="flex flex-col h-full">
        <div className="sticky top-0 z-10 bg-white">
            <div className="flex mx-4 py-4 border-grey-300  border-solid border-b-[0.1250rem] items-center  gap-4 justify-between">
                {<Typography variant={"h3"} loading={loading} className={`${loading ? 'text-transparent' : 'text-grey-600'}`}>{meal?.data?.strMeal || "Title of Meal"}</Typography>}
                <IconX className="cursor-pointer !text-grey-500" onClick={() => {
                    onClose();
                }}></IconX>
            </div>
        </div>
        <div className="w-full flex-grow flex flex-col px-4 py-4 gap-4">
            <CustomImage loading={loading} loadingProps={{ className: 'w-full aspect-square' }} imgProps={{ src: meal?.data?.strMealThumb, className: "w-full aspect-square" }}></CustomImage>
            {
                loading ? <div className="flex flex-wrap gap-2">{generateArray(3).map((_, index) => {
                    return <Typography key={index} variant={"body1"} fontWeight={500} className="px-4 py-1" loading={loading}>Tag</Typography>
                })}</div>
                    : <div className="flex flex-wrap gap-2">{meal?.data?.strTags?.split(",")?.map((tag, index) => {
                        return <Typography key={index} variant={"body1"} fontWeight={500} className="px-4 py-1 border-yellow-400 border-solid border-[0.125rem] flex items-center rounded-xl bg-yellow-50">{tag as string}</Typography>
                    })}</div>
            }
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                <div>
                    <Typography variant={"body1"} fontWeight={500} className="text-text-secondary w-full break-all">Category</Typography>
                </div>
                <div className="">
                    <Typography variant={"body1"} fontWeight={500} loading={loading} className="w-full break-all">{meal?.data?.strCategory || "_"}</Typography>
                </div>

                <div className="">
                    <Typography variant={"body1"} fontWeight={500} className="text-text-secondary break-all">Area</Typography>
                </div>
                <div className="">
                    <Typography variant={"body1"} fontWeight={500} loading={loading} className="w-full break-all">{meal?.data?.strArea || "_"}</Typography>
                </div>

                <div className="">
                    <Typography variant={"body1"} fontWeight={500} className="text-text-secondary break-all">YouTube</Typography>
                </div>
                <div className="">
                    <Typography variant={"body1"} fontWeight={500} loading={loading} className="w-full break-all underline"><a href={meal?.data?.strYoutube} target="_blank">{meal?.data?.strYoutube || "_"}</a></Typography>
                </div>
                <div className="">
                    <Typography variant={"body1"} fontWeight={500} className="text-text-secondary break-all">Recipe</Typography>
                </div>
                <div className="">
                    <Typography variant={"body1"} fontWeight={500} loading={loading} className="w-full break-all underline"><a href={meal?.data?.strSource} target="_blank">{meal?.data?.strSource || "_"}</a></Typography>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Typography variant={"h6"}>Instructions</Typography>
                <Typography variant={"body1"} loading={loading} className="break-all" fontWeight={500}>{meal?.data?.strInstructions}</Typography>
            </div>
        </div>
    </div >
}