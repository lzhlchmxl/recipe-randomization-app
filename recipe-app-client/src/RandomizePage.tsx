import { useState } from "react";
import DurationPicker from "./DurationPicker";
import FoodTypeSelector from "./FoodTypeSelector";
import * as T from "./types";
import RandomizedRecipeResults from "./RandomizeRecipeResults";
import Button from "./Button";

function RandomizePage() {

  const [prepTimeLimitInSecounds, setPrepTimeLimitInSeconds] = useState(0);
  const [selectedFoodType, setSelectedFoodType] = useState<T.FoodType | "default">("default");

  const [randomizerParam, setRandomizerParam] = useState<T.RandomizerParam | null>(null);  

  const randomierResults = () => {
    if (randomizerParam === null) {
      // return <div>Please enter search parameters</div>
      return;
    } 
    return (
      <RandomizedRecipeResults 
        randomizerParam={randomizerParam}
      />
    )
  }

  const handleSetRandomizerParam = () => {
    if (prepTimeLimitInSecounds <= 0 || selectedFoodType === "default") {
      alert("Please enter valid inputs");
      throw new Error("ranomizer param invalid")
    }
    const newParam = {
      prepTimeLimitInSecounds, 
      selectedFoodType,
    }
    setRandomizerParam(newParam);
  }

  return (
    <div className="flex flex-col items-center">
      {/* TODO: this should prob be a component */}
      <div className="flex justify-between items-center 
                      bg-gradient-to-r from-gray-100 via-gray-200 to-yellow-200 rounded-xl
                      text-gray-600 font-semibold 
                      h-10 my-5 w-full
                      "
      >
        <p className="pl-5">Preparation Time:</p>
        <div className="pr-5">
          <DurationPicker
            initialTotalSeconds={0}
            setPrepTimeInSeconds={ setPrepTimeLimitInSeconds }
          />
        </div>
      </div>
      <div className="flex justify-between items-center 
                      bg-gradient-to-r from-gray-100 via-gray-200 to-yellow-200 rounded-xl
                      text-gray-700 font-semibold 
                      h-10 my-5 w-full
                      "
      >
        <p className="pl-5">Food Type:</p>
        <div className="pr-5">
          <FoodTypeSelector 
            value={selectedFoodType}
            setSelectedFoodType={ setSelectedFoodType }
          />
        </div>
      </div>
      <div className="mt-5">
        <Button 
          buttonText="generate"
          type="primary"
          onClick={ () => handleSetRandomizerParam()}
        />
      </div>
      {randomierResults()}
    </div>
  )
}

export default RandomizePage;