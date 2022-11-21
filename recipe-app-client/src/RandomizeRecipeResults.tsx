import { randomizeRecipes } from "./Api";
import { useAsync } from "./CustomHooks";
import ErrorIndicator from "./ErrorIndicator";
import LoadingIndicator from "./LoadingIndicator";
import * as T from "./types";

function RandomizedRecipeResults(
  { randomizerParam }
  :
  { randomizerParam: T.RandomizerParam }
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

  const recipeList = recipes.map( recipe => {
    return (
      <div
        key={recipe.id}
      >
        { recipe.name }
      </div>
    )
  })

  return (
    <div>
      {recipeList}
    </div>
  )
}

export default RandomizedRecipeResults;