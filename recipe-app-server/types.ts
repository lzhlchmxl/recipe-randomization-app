// Database Types
export type Database = {
  recipes: Recipe[],
  histories: History[],
};

export type FoodType = "meat" | "veggie" | "mixed";

export type Recipe = {
  id: RecipeId,
} & NewRecipe;

export type NewRecipe = {
  name: string,
  foodType: FoodType,
  prepTimeInSeconds: number,
  description: string
}

export type RecipeId = string

export type History = {
  id: HistoryId,
} & NewHistory;

export type HistoryId = string;

type NewHistory = {
  dateCreated: Date,
  recipeIds: RecipeId[],	
}


// API endpoints Types
export type RecipeHeader = {
  id: RecipeId,
  name: string,
  foodType: FoodType,
  prepTimeInSeconds: number,
}

export type RecipeDetail = Recipe;

export type HistoryHeader = {
  id: HistoryId,
  recipeNames: string[],
  dateCreated: Date,
}

export type RandomizerParam = {
	prepTimeLimitInSecounds: number,
	selectedFoodType: FoodType,
}
