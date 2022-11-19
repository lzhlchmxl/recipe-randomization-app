import { editRecipe, getRecipeDetails } from "./Api";
import { useAsync, useRequiredParams } from "./CustomHooks";
import ErrorIndicator from "./ErrorIndicator";
import LoadingIndicator from "./LoadingIndicator";
import RecipeForm from "./RecipeForm";
import * as T from "./types";

function EditRecipe() {

  const selectedRecipeId = useRequiredParams("recipeId");

  const recipeDetailsAsync = useAsync(() => getRecipeDetails(selectedRecipeId), []); // eslint-disable-line

  if (recipeDetailsAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (recipeDetailsAsync.status === "rejected") {
    return <ErrorIndicator />
  }

  const initialRecipe = recipeDetailsAsync.value;

  const tryEdit = async (recipe: T.RecipeFormData) => {
    const recipeClone = {
      ...recipe,
      id: selectedRecipeId,
    }
    await editRecipe(recipeClone);
    window.location.pathname = `/recipe-list/${selectedRecipeId}`;
  }

  return (
    <div className="flex flex-col items-center">
      <RecipeForm 
        initialRecipe={initialRecipe}
        cancelText="cancel"
        cancelLink={`/recipe-list/${initialRecipe.id}`}
        actionText="save"
        actionCallback={ (recipe) => {   
          tryEdit(recipe)
        }}
      />
    </div>
  ) 
}

export default EditRecipe;