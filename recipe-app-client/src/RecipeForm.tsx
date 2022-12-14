import * as T from "./types";
import { useState } from "react";
import DurationPicker from "./DurationPicker";
import FoodTypeSelector from "./FoodTypeSelector";
import Button from "./Button";

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

  const areAllFieldsValid = name !== "" && description !== "" && foodType !== "default" && prepTimeInSeconds !== 0
  const isAnyFieldChanged = name !== "" || description !== "" || foodType !== "default" || prepTimeInSeconds !== 0

  const tryCancel = () => {
    if (isAnyFieldChanged) {
      if(window.confirm("Unsaved changes will be discard. Confirm?")) {
        window.location.href = cancelLink;
      }
    } else {
      window.location.href = cancelLink;
    }
  }

  const tryPassCreationInfoToParent = () => {
    if (areAllFieldsValid) {
      return actionCallback({name, foodType, prepTimeInSeconds, description});
    }
    alert("Please fill all the fields.")
    throw new Error("Cannot create recipe with incomplete information");
  }

  const inputWrapperClassName = `flex justify-between items-center 
                                  bg-gradient-to-r from-gray-100 via-gray-200 to-yellow-200 rounded-xl                    
                                  h-10 my-3 w-full`

  return (
    <div className="flex flex-col w-full">
      <div
        className="w-full h-[250px] bg-gray-800"
      />
      <div className={inputWrapperClassName}>
        <p className="pl-5 capitalize">name:</p>
        <div className="pr-5">
          <input 
            className="rounded-md"
            defaultValue={name}
            type={"text"}
            onChange={ (e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className={inputWrapperClassName}>
        <p className="pl-5 capitalize">food type:</p>
        <div className="pr-5">
          <FoodTypeSelector 
            value={foodType}
            setSelectedFoodType={ setFoodType}
          />
        </div>
      </div>
      <div className={inputWrapperClassName}>
        <p className="pl-5 capitalize">prep time:</p>
        <div className="pr-5">
          <DurationPicker 
            initialTotalSeconds={prepTimeInSeconds}
            setPrepTimeInSeconds={ (seconds) => {
              setPrepTimeInSeconds(seconds);
            }}
          />
        </div>
      </div>
      <div className={inputWrapperClassName}>
        <p className="pl-5 capitalize">description:</p>
        <div className="pr-5">
          <input 
            className="rounded-md"
            defaultValue={description}
            type={"text"}
            onChange={ (e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-evenly mt-5">
        <Button 
          onClick={tryPassCreationInfoToParent}
          buttonText={actionText}
          type="primary"
        />
        <Button 
          onClick={tryCancel}
          buttonText={cancelText}
          type="action"
        />
      </div>
    </div>
  )
}

export default RecipeForm;