import { useState } from "react";
import { randomizeRecipes } from "./Api";
import { useAsync } from "./CustomHooks";
import DurationPicker from "./DurationPicker";
import FoodTypeSelector from "./FoodTypeSelector";
import ErrorIndicator from "./ErrorIndicator";
import LoadingIndicator from "./LoadingIndicator";
import * as T from "./types";
import { NavLink } from "react-router-dom";
import RandomizedRecipeResults from "./RandomizeRecipeResults";

function RandomizePage() {

  const [prepTimeLimitInSecounds, setPrepTimeLimitInSeconds] = useState(0);
  const [selectedFoodType, setSelectedFoodType] = useState<T.FoodType | "default">("default");

  const [randomizerParam, setRandomizerParam] = useState<T.RandomizerParam | null>(null);
  

  const randomierResults = () => {
    if (randomizerParam === null) {
      return <div>Please enter search parameters</div>
    } 
    return (
      <RandomizedRecipeResults 
        randomizerParam={randomizerParam}
      />
    )
  }

  return (
    <div className="flex flex-col">
      <label>
        Prep Time:
        <DurationPicker
          initialTotalSeconds={0}
          setPrepTimeInSeconds={ setPrepTimeLimitInSeconds }
        />
      </label>
      <label>
        Food Type:
        <FoodTypeSelector 
          value={selectedFoodType}
          setSelectedFoodType={ setSelectedFoodType }
        />
      </label>
      {randomierResults()}
      <button
        onClick={ () => {
          if (prepTimeLimitInSecounds <= 0 || selectedFoodType === "default") {
            alert("Please enter valid inputs");
            throw new Error("ranomizer param invalid")
          }
          const newParam = {
            prepTimeLimitInSecounds, 
            selectedFoodType,
          }
          setRandomizerParam(newParam);
        }}
      >
        What to Eat
      </button>
      <NavLink
        // onClick={ () => {
        //   tryCreateHistory
        // }}
        to='/history'
      >
        Confirm
      </NavLink>
    </div>
  )
}

export default RandomizePage;