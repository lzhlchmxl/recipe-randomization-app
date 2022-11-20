import * as T from "./types";
import * as util from "./util";

// TODO: make this a while loop instead of recursion
export function randomizeRecipe(recipes: T.Recipe[], prepTimeLimitInSeconds: number, selectedFoodType: T.FoodType): T.Recipe[] {

  // filter out any non-matching FoodTyped recipes or recipes that exceeds prepTimeLimit
  const qualifiedRecipes = recipes.filter( 
    recipe => 
    util.foodTypeMatchCheck(recipe.foodType, selectedFoodType) 
    && 
    recipe.prepTimeInSeconds <= prepTimeLimitInSeconds
  );

  return recurse(qualifiedRecipes, prepTimeLimitInSeconds);

  function recurse(qualifiedRecipes: T.Recipe[], prepTimeLimitInSeconds: number): T.Recipe[] {

    if (qualifiedRecipes.length === 0) {
      return [];
    }

    const selectedRecipe = qualifiedRecipes[Math.floor((qualifiedRecipes.length) * Math.random())];

    const remainingPrepTimeLimitInSeconds = prepTimeLimitInSeconds - selectedRecipe.prepTimeInSeconds;

    const remainingRecipes = qualifiedRecipes.filter( 
      recipe => 
      recipe.id !== selectedRecipe.id 
      && 
      recipe.prepTimeInSeconds <= remainingPrepTimeLimitInSeconds
    );

    return [selectedRecipe, ...recurse(remainingRecipes, remainingPrepTimeLimitInSeconds)];
  }

}
