import * as T from "./types";

export function generateId(): string {
  return Math.random().toString();
}

export function recipeIdsToNames(recipeIds: T.RecipeId[], recipes: T.Recipe[]): string[] {

  // TODO: omg a n^2 alg, somebody do something... (I guess we could assume users are not supposed to have a history with milions of recipes while the prepTime was set to like 100 years) 
  const recipeNames = recipeIds.map( recipeId => {
    const recipe = recipes.find( recipe => recipe.id === recipeId);
    if (recipe === undefined) {
      return "Recipe Deleted"
    }
    return recipe.name;
  })

  return recipeNames;
}

// if filterType is mixed, meat, veggie or mixed recipes can match; but if filter type is meat/veggie, mixed recipes should'nt match.
export function foodTypeMatchCheck(recipeType: T.FoodType, filterType: T.FoodType): boolean {
  if (filterType === "mixed") {
    return true;
  } 

  return recipeType === filterType;
}

