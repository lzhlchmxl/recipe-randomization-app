import * as T from "./types";
import { useEffect, useState } from "react";
import * as util from "./util";
import { Link, useHref } from "react-router-dom";
import { createRecipe } from "./Api";

function CreateRecipe() {

  const emptyRecipe: T.NewRecipe = {
    name: null,
    prepTimeInSeconds: null,
    foodType: null,
    description: null
  }

  const emptyDuration: T.Duration = {
    hours: null,
    minuets: null,
    seconds: null,
  }

  const [recipe, setRecipe] = useState<T.NewRecipe>(emptyRecipe);

  const [duration, setDuration] = useState<T.Duration>(emptyDuration);

  useEffect( () => {
    const prepTimeInSeconds = util.durationToSeconds(duration);
    util.setState(setRecipe, "prepTimeInSeconds", prepTimeInSeconds)
  }, [duration])

  const tryCreate = async () => {
    try {
      const newRecipeId: T.RecipeId = await createRecipe(recipe);
      window.location.pathname = `/recipe-list/${newRecipeId}`

    } catch (err) {
      alert("Something went wrong when creating new recipe.");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <label>
          Name:
          <input 
            type={"text"}
            onChange={ (e) => util.setState(setRecipe, "name", e.target.value)}
          />
        </label>
        <label>
          Preparation Time:
          H:
          <input
            className="w-10"
            type={"number"}
            min={0}
            max={24}
            onChange={ (e) => util.setState(setDuration, "hours", e.target.valueAsNumber)}
          />
          M:
          <input 
            className="w-10"
            type={"number"}
            min={0}
            max={60}
            onChange={ (e) => util.setState(setDuration, "minuets", e.target.valueAsNumber)}
          />
          S:
          <input
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
            onChange={ (e) => {
              util.setState(setRecipe, "foodType", e.target.value as T.FoodType) 
            }}
          > 
            <option value="meat">Meat</option>
            <option value="veggie">Veggie</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>

        <label>
          Description:
          <input 
            type={"text"}
            onChange={ (e) => util.setState(setRecipe, "description", e.target.value)}
          />
        </label>
      </div>
      <div
        onClick={ tryCreate }
      >
        save
      </div>
      <Link
        to={'/recipe-list'}
      >
        cancel
      </Link> 
    </div>
  )
}

export default CreateRecipe;