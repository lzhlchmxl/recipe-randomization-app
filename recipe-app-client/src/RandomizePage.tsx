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
    <div className="flex flex-col">
      <label
        className="mt-3 mb-3"
      >
        Preparation Time:
        <br />
        <DurationPicker
          initialTotalSeconds={0}
          setPrepTimeInSeconds={ setPrepTimeLimitInSeconds }
        />
      </label>
      <label
        className="mb-3"
      >
        Food Type:
        <br />
        <FoodTypeSelector 
          value={selectedFoodType}
          setSelectedFoodType={ setSelectedFoodType }
        />
      </label>
      <Button 
        buttonText="generate"
        type="primary"
        onClick={ () => handleSetRandomizerParam()}
      />
      {randomierResults()}
    </div>
  )
}

export default RandomizePage;