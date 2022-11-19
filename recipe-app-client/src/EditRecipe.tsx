import { useEffect, useState } from "react";
import { editRecipe, getRecipeDetails } from "./Api";
import { useAsync, useRequiredParams } from "./CustomHooks";
import ErrorIndicator from "./ErrorIndicator";
import LoadingIndicator from "./LoadingIndicator";
import RecipeForm from "./RecipeForm";
import * as util from "./util";
import * as T from "./types";
import { Link } from "react-router-dom";

// Note: I feel like there is something weird about my approach below with how I handled the recipe variable
function EditRecipe() {

  const [recipe, setRecipe] = useState<T.RecipeDetail | null>(null);

  const selectedRecipeId = useRequiredParams("recipeId");

  const recipeDetailsAsync = useAsync(() => getRecipeDetails(selectedRecipeId), []);

  if (recipeDetailsAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (recipeDetailsAsync.status === "rejected") {
    return <ErrorIndicator />
  }

  const initialRecipe = recipeDetailsAsync.value;

  const tryEdit = async () => {
    // TODO: the error handling attempts down below deserve an A for AFFORT :)
    try {

      if (recipe === null) {
        throw new Error("Cannot edit a null recipe");
      }

      await editRecipe(recipe);

      window.location.pathname = `/recipe-list/${recipe.id}`

    } catch (err) {
      alert("Something went wrong when creating new recipe.");
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* <RecipeForm 
        initialRecipe={initialRecipe}
        // TODO: kind sir plz fix my type
        setRecipe={ (key, value) => {
          util.setState(setRecipe as React.Dispatch<React.SetStateAction<T.NewRecipe>>, key, value)
        }}

      /> */}
      {/* <button
        onClick={ tryEdit }
      >
        save
      </button> */}
      <Link
        to={`/recipe-list/${initialRecipe.id}`}
      >
        cancel
      </Link> 
    </div>
  ) 
}

export default EditRecipe;