import { Link } from "react-router-dom";
import { deleteRecipeById, getRecipeDetails } from "./Api";
import { useAsync, useRequiredParams } from "./CustomHooks";
import ErrorIndicator from "./ErrorIndicator";
import LoadingIndicator from "./LoadingIndicator";

function RecipeDetails() {

  const selectedRecipeId = useRequiredParams("recipeId");

  const recipeDetailsAsync = useAsync(() => getRecipeDetails(selectedRecipeId), [selectedRecipeId]);
  
  // Note: something feels off about this solution
  const tryDelete = async () => {
    // try {
      const deletionStatusCode = await deleteRecipeById(selectedRecipeId);
      if (deletionStatusCode === 204) {
        window.location.pathname = "/recipe-list";
      } else {
        alert("something went wrong, the deletion did not go through")
      }
    // } catch(err) {
    //   alert("something went wrong, the deletion did not go through")
    // }
  }

  if ( recipeDetailsAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( recipeDetailsAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const recipeDetails = recipeDetailsAsync.value;


  return (
    <div className="flex flex-col">
      <div className="flex">
        <div>{ recipeDetails.name }</div>
        <div>{ recipeDetails.foodType }</div>
        <div>{ recipeDetails.prepTimeInSeconds }</div>
        <div>{ recipeDetails.description }</div>
      </div>
      <div className="flex">
        <button>Edit</button>
        <Link
          className="sm:hidden"
          to={'/recipe-list'}
        >
          Back
        </Link>
        <div
          onClick={ tryDelete }
        >
          Delete
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails;