import * as T from "./types";

export function generateId(): string {
  return Math.random().toString();
}

export function recipeIdsToNames(recipeIds: T.RecipeId[], recipes: T.Recipe[]): string[] {

  // TODO: omg a n^2 alg, somebody do something... (I guess we could assume users are not supposed to have a history with milions of recipes while the prepTime was set to like 100 years) 
  const recipeNames = recipeIds.map( recipeId => {
    const recipe = recipes.find( recipe => recipe.id === recipeId);
    if (recipe === undefined) {
      throw new Error;
    }
    return recipe.name;
  })

  return recipeNames;
}

// Returns true if the two food types are the same, and vice versa
export function foodTypeMatchCheck(type1: T.FoodType, type2: T.FoodType): boolean {
  if (type2 === "mixed") {
    return true;
  } 

  return type1 === type2;
}

