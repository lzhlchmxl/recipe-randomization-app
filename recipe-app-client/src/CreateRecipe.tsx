import * as T from "./types";
import { createRecipe } from "./Api";
import RecipeForm from "./RecipeForm";
import { useOutletContext } from "react-router-dom";

// {setTitle}: {setTitle: (title: string) => void}
function CreateRecipe() {                                                                                                                                                        

  const setTitle = useOutletContext<(title: string) => void>();

  const tryCreate = async (recipe: T.RecipeFormData) => {
    const newRecipeId: T.RecipeId = await createRecipe(recipe);
    window.location.pathname = `/recipe-list/${newRecipeId}`
    setTitle(recipe.name)
  }

  return (
    <RecipeForm 
      initialRecipe={null}
      cancelLink='/recipe-list'
      cancelText="cancel"
      actionText="create"
      actionCallback={ (recipe: T.RecipeFormData) => tryCreate(recipe)}
    />
  )
}

export default CreateRecipe;