import * as T from "./types";
import { useState } from "react";
import * as util from "./util";
import { Link } from "react-router-dom";

function RecipeForm({
    initialRecipe,
    cancelText,
    cancelLink,
    actionText,
    actionCallback,
  }
  : 
  {
    initialRecipe: T.RecipeDetail | null,
    cancelText: string,
    cancelLink: string,
    actionText: string,
    actionCallback: (recipe: T.RecipeDetail | T.NewRecipe) => void,

  }) {

  const emptyRecipe: T.EmptyRecipe = {
    name: null,
    prepTimeInSeconds: null,
    foodType: null,
    description: null,
  }

  const emptyDuration: T.Duration = {
    hours: null,
    minuets: null,
    seconds: null,
  }

  const [recipe, setRecipe] = useState<T.RecipeDetail | T.EmptyRecipe | T.NewRecipe>(initialRecipe === null ? emptyRecipe : initialRecipe);
  const [duration, setDuration] = useState<T.Duration>(initialRecipe === null ? emptyDuration : util.secondsToDuration(initialRecipe.prepTimeInSeconds));

  return (
    <div className="flex flex-col">
      <div className="flex">
        <label>
          Name:
          <input 
            defaultValue={recipe.name ? recipe.name : undefined}
            type={"text"}
            onChange={ (e) => util.setState(setRecipe, "name", e.target.value)}
          />
        </label>
        <label>
          Preparation Time:
          H:
          <input
            defaultValue={duration.hours ? duration.hours : undefined}
            className="w-10"
            type={"number"}
            min={0}
            max={24}
            onChange={ (e) => util.setState(setDuration, "hours", e.target.valueAsNumber)}
          />
          M:
          <input 
            defaultValue={duration.minuets ? duration.minuets : undefined}
            className="w-10"
            type={"number"}
            min={0}
            max={60}
            onChange={ (e) => util.setState(setDuration, "minuets", e.target.valueAsNumber)}
          />
          S:
          <input
            defaultValue={duration.seconds ? duration.seconds : undefined}
            className="w-10" 
            type={"number"}
            min={0}
            max={60}
            onChange={ (e) => util.setState(setDuration, "seconds", e.target.valueAsNumber)}
            
          />
        </label>
        <label>
          Food Type:
          <select
            value={recipe.foodType === null ? "default" : recipe.foodType}
            onChange={ (e) => util.setState(setRecipe,"foodType", e.target.value as T.FoodType)}
          > 
            <option disabled value="default">- select -</option>
            <option value="meat">Meat</option>
            <option value="veggie">Veggie</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>

        <label>
          Description:
          <input 
            defaultValue={recipe.description ? recipe.description : undefined}
            type={"text"}
            onChange={ (e) => util.setState(setRecipe, "description", e.target.value)}
          />
        </label>
      </div>
      <div className="flex">
        <div
          onClick={ () => {
            const recipeClone = {
              ...recipe,
              prepTimeInSeconds: util.durationToSeconds(duration),
            }

            if (recipeClone.description === null || recipeClone.foodType === null || recipeClone.name === null || recipeClone.prepTimeInSeconds === null) {
              alert("Please fill all the fields.")
              throw new Error("Cannot create recipe with incomplete information");
            }
            return actionCallback(recipeClone);
          } }
        >
          {actionText}
        </div>
        <Link
          to={cancelLink}
        >
          {cancelText}
        </Link> 
      </div>
    </div>
  )
}

export default RecipeForm;