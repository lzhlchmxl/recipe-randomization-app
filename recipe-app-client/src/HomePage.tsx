import { useState } from "react";
import { NavLink } from "react-router-dom";
import DurationPicker from "./DurationPicker";
import FoodTypeSelector from "./FoodTypeSelector";
import RecipeRandomizationResults from "./RecipeRandomizationResults";
import * as T from "./types";

function HomePage() {

  const [prepTimeLimitInSecounds, setPrepTimeLimitInSeconds] = useState(0);
  const [foodType, setFoodType] = useState<T.FoodType | "default">("default");
  const [refreshKey, setRefreshKey] = useState("");
  const selectedFoodType = foodType === "default" ? "mixed" : foodType;

  return (
    <div className="flex flex-col">
      <label>
        Prep Time:
        <DurationPicker
          initialTotalSeconds={0}
          setPrepTimeInSeconds={ seconds => {
            setPrepTimeLimitInSeconds(seconds);
          }}
        />
      </label>
      <label>
        Food Type:
        <FoodTypeSelector 
          value={foodType}
          setFoodType={ foodType => {
            setFoodType(foodType);
          }}
        />
      </label>
      <RecipeRandomizationResults 
        refreshKey={refreshKey}
        prepTimeLimitInSecounds={prepTimeLimitInSecounds}
        selectedFoodType={selectedFoodType}
      />
      <button
        onClick={ () => {
          setRefreshKey(new Date().toString());
        }}
      >
        What to Eat
      </button>
      {/* <NavLink
        onClick={ () => {
          tryCreateHistory
        }}
        to='/history'
      >
        Confirm
      </NavLink> */}
    </div>
  )
}
 export default HomePage;