import { ReactFlowProvider } from "@xyflow/react";
import FoodFlow from "./foodflow/FoodFlow";
import { useCallback, useState } from "react";
import SideDrawer from "../shared/SideDrawer";
import MealDetail from "./mealdetail/SideMealDetail";

export default function Dashboard() {
    const [mealId, setMealId] = useState<string>();

    const toggleMeal= useCallback((id?: string) => {
        setMealId(id);
    }, []);

    const handleMealUnselected=useCallback(()=>{
        toggleMeal(undefined);
    },[])

    return <>
        <ReactFlowProvider>
            <FoodFlow toggleMeal={toggleMeal}></FoodFlow>
        </ReactFlowProvider>
        <SideDrawer open={Boolean(mealId)} closeable={false} onClose={handleMealUnselected}>
            <MealDetail id={mealId || ""} onClose={handleMealUnselected}></MealDetail>
        </SideDrawer>
    </>
}