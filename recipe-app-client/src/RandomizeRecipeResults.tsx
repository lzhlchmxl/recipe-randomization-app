import { createHistory, randomizeRecipes } from "./Api";
import Button from "./Button";
import { useAsync } from "./CustomHooks";
import ErrorIndicator from "./ErrorIndicator";
import LoadingIndicator from "./LoadingIndicator";
import * as T from "./types";
import * as util from "./util";

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
  let totalPrepTimeInSeconds = 0;

  const recipeList = recipes.map( recipe => {
    recipeIds.push(recipe.id);
    totalPrepTimeInSeconds+=recipe.prepTimeInSeconds;
    return (
      <div
        key={recipe.id}
        className=" bg-gradient-to-r from-gray-100 via-gray-200 to-yellow-200  
                    rounded-xl mt-3 last-of-type:mb-3"
      >
        <div className="flex items-center justify-baseline bg-white rounded-xl m-0.5">
          <div className="bg-blue-800 h-[50px] w-[50px] m-1 rounded-md"></div>
          <div className="flex">
            <p className="capitalize w-[100px] text-center">{ recipe.name }</p>
          </div>
          <div className="flex max-w-[calc(100%-160px)]">
            <p className="text-left w-full">{ recipe.description }</p>
          </div>
        </div>
      </div>
    ) 
  })

  const getTotalDuration = () => {
    const duration = util.secondsToDuration(totalPrepTimeInSeconds);
    return `${duration.hours}h${duration.minutes}m`;
  }

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
    <div className="flex flex-col h-fit-content max-h-[400px] overflow-y-auto">
      <div className="flex justify-between items-baseline">
        <p className="text-gray-800 font-bold text-xl">Recipes ({recipeList.length})</p>
        <p className="text-gray-500 font-semibold text-base">Time: {getTotalDuration()}</p>
      </div>
      <div
        className="flex flex-col overflow-y-auto h-fit"
      >
        {recipeList}
      </div>
      <div className="self-center">
        <Button
          buttonText={`looks good ${String.fromCharCode(8594)}`}
          type="action"
          onClick={ () => 
            tryCreateHistory()
          }
        />
      </div>
    </div>
  )
}

export default RandomizedRecipeResults;