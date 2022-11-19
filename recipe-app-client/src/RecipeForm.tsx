import * as T from "./types";
import { useState } from "react";
import { Link } from "react-router-dom";
import DurationPicker from "./DurationPicker";

function RecipeForm({
    initialRecipe,
    cancelText,
    cancelLink,
    actionText,
    actionCallback,
  }
  : 
  {
    initialRecipe: T.RecipeFormData | null,
    cancelText: string,
    cancelLink: string,
    actionText: string,
    actionCallback: (recipe: T.RecipeFormData) => void,

  }) {

  const [name, setName] = useState(initialRecipe ? initialRecipe.name : "");
  const [description, setDescription] = useState(initialRecipe ? initialRecipe.description : "");
  const [foodType, setFoodType] = useState<T.FoodType | "default">(initialRecipe ? initialRecipe.foodType : "default");
  const [prepTimeInSeconds, setPrepTimeInSeconds] = useState(initialRecipe ? initialRecipe.prepTimeInSeconds : 0);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <label>
          Name:
          <input 
            defaultValue={name}
            type={"text"}
            onChange={ (e) => setName(e.target.value)}
          />
        </label>
        
        <label>
          Food Type:
          <select
            value={foodType === undefined ? "default" : foodType}
            onChange={ (e) => setFoodType(e.target.value as T.FoodType | "default")}
          > 
            <option value="default">- select -</option>
            <option value="meat">Meat</option>
            <option value="veggie">Veggie</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>
        <DurationPicker 
          initialTotalSeconds={prepTimeInSeconds}
          setPrepTimeInSeconds={ (seconds) => {
            setPrepTimeInSeconds(seconds);
          }}
        />
        <label>
          Description:
          <input 
            defaultValue={description}
            type={"text"}
            onChange={ (e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="flex">
        <div
          onClick={ () => {
            if (name === "" ||
                foodType === "default" ||
                prepTimeInSeconds === 0 ||
                description === "") {
              alert("Please fill all the fields.")
              throw new Error("Cannot create recipe with incomplete information");
            }

            return actionCallback({name, foodType, prepTimeInSeconds, description});
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