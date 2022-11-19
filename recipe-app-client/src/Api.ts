import * as T from "./types";


export async function getRecipes(): Promise<T.RecipeHeader[]> {

  // Note: for error testing
  // if (Math.random() > 0.5) {
  //   throw new Error("it failed");
  // }
  const response = await fetch('/api/recipe-list');

  if (response.status !== 200) {
    throw new Error("/api/recipe-list returned HTTP status code: " + response.status);
  }

  const recipeHeaders: T.RecipeHeader[] = await response.json();

  return recipeHeaders;
}

export async function getRecipeDetails(id: T.RecipeId): Promise<T.RecipeDetail> {
  const response = await fetch(`/api/recipe-list/${id}`)

  if (response.status !== 200) {
    throw new Error(`/api/recipe-list/:${id} returned HTTP status code: ${response.status}`);
  }

  const recipeDetails: T.RecipeDetail = await response.json();

  return recipeDetails;
}

export async function deleteRecipeById(id: T.RecipeId): Promise<number> {
  const response = await fetch(`/api/recipe-list/${id}`, { method: 'delete' })

  if (response.status !== 204) {
    throw new Error(`/api/recipe-list/:${id} returned HTTP status code: ${response.status}`);
  }

  return response.status;
}

export async function createRecipe(newRecipe: T.NewRecipe): Promise<T.RecipeId> {

  // TODO clean this up somehow, samething in editRecipe function
  if (newRecipe.description === null || newRecipe.foodType === null || newRecipe.name === null || newRecipe.prepTimeInSeconds === null) {
    alert("Can't create recipe with unfilled fields");
  }

  const requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRecipe)
  }

  const response = await fetch(`/api/recipe-list/create`, requestOptions);

  if (response.status !== 200) {
    throw new Error(`/api/recipe-list/create returned HTTP status code: ${response.status}`)
  }

  const recipeId: T.RecipeId = await response.json();

  return recipeId;
}

export async function editRecipe(recipe: T.RecipeDetail): Promise<number> {

  if (recipe.description === null || recipe.foodType === null || recipe.name === null || recipe.prepTimeInSeconds === null) {
    alert("Can't create recipe with unfilled fields");
  }

  const requestOptions = {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  }

  const response = await fetch(`/api/recipe-list/edit/${recipe.id}`, requestOptions);

  if (response.status !== 204) {
    throw new Error(`/api/recipe-list/create returned HTTP status code: ${response.status}`)
  }

  return response.status;
}



