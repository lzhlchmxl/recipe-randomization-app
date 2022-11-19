import * as T from "./types";
import { createRecipe } from "./Api";
import RecipeForm from "./RecipeForm";

function CreateRecipe() {                                                                                                                                                        

  const tryCreate = async (recipe: T.RecipeFormData) => {
    const newRecipeId: T.RecipeId = await createRecipe(recipe);
    window.location.pathname = `/recipe-list/${newRecipeId}`
  }

  return (
    <div className="flex flex-col items-center">
      <RecipeForm 
        initialRecipe={null}
        cancelLink='/recipe-list'
        cancelText="cancel"
        actionText="create"
        actionCallback={ (recipe: T.RecipeFormData) => tryCreate(recipe)}
      />
    </div>
  )
}

export default CreateRecipe;