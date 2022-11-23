import { createHistory, randomizeRecipes } from "./Api";
import { useAsync } from "./CustomHooks";
import ErrorIndicator from "./ErrorIndicator";
import LoadingIndicator from "./LoadingIndicator";
import * as T from "./types";

function RandomizedRecipeResults(
  { 
    randomizerParam, 
  }
  :
  { 
    randomizerParam: T.RandomizerParam,
  }
) {

  const recipeRandomizationResultsAsync = useAsync(() => randomizeRecipes(randomizerParam), [randomizerParam]); // eslint-disable-line
  
  if (recipeRandomizationResultsAsync.status === "pending") {
    return <LoadingIndicator />;
  }

  if (recipeRandomizationResultsAsync.status === "rejected") {
    return <ErrorIndicator />;
  }

  const recipes = recipeRandomizationResultsAsync.value;

  if (recipes.length === 0) {
    return <div>No qualified results found, please modify randomize parameters or create more recipes</div>
  }

  const recipeIds: T.RecipeId[] = [];
  const recipeList = recipes.map( recipe => {
    recipeIds.push(recipe.id);
    return (
      <div
        key={recipe.id}
      >
        { recipe.name }
      </div>
    ) 
  })

  const tryCreateHistory = async () => { 

    if (recipeIds.length === 0) {
      alert("Please press the 'what to eat' button before confirming");
      throw new Error("Unable to create history with no recipes");
    }

    const resStatusCode = await createHistory(recipeIds);

    if (resStatusCode !== 204) {
      alert("History was not created sucessfully");
      throw new Error("History was not created sucessfully");
    }

    window.location.pathname = '/history';
  }

  return (
    <div>
      {recipeList}
      {/* TODO: the UI below is not desirable and should be fixed later*/}
      <button
        onClick={ () => 
          tryCreateHistory()
        }
      >
        Confirm
      </button>
    </div>
  )
}

export default RandomizedRecipeResults;