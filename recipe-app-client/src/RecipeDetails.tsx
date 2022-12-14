import { deleteRecipeById, getRecipeDetails } from "./Api";
import Button from "./Button";
import { useAsync, useRequiredParams } from "./CustomHooks";
import ErrorIndicator from "./ErrorIndicator";
import LinkButton from "./LinkButton";
import LoadingIndicator from "./LoadingIndicator";
import * as util from "./util";

function RecipeDetails() {

  const selectedRecipeId = useRequiredParams("recipeId");

  const recipeDetailsAsync = useAsync(() => getRecipeDetails(selectedRecipeId), [selectedRecipeId]);
  
  const tryDelete = async () => {
    
    const isConfirmDeletion = window.confirm("This is irreversible. Are you sure you want to delete this recipe?");
    
    if (isConfirmDeletion) {
      const deletionStatusCode = await deleteRecipeById(selectedRecipeId);
      if (deletionStatusCode === 204) {
        window.location.pathname = "/recipe-list";
      } else {
        alert("something went wrong, the deletion did not go through")
      }
    }
  }

  if ( recipeDetailsAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( recipeDetailsAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const recipeDetails = recipeDetailsAsync.value;

  const inputWrapperClassName = `flex justify-between items-center 
                                bg-gradient-to-r from-gray-100 via-gray-200 to-yellow-200 rounded-xl                    
                                h-10 my-3 w-full`

  const prepDuration = util.secondsToDuration(recipeDetails.prepTimeInSeconds);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="absolute right-0 top-[46px]">
        <LinkButton 
          to="/recipe-list"
          linkType="back"
        />
        <LinkButton
          to={`/recipe-list/edit/${recipeDetails.id}`}
          linkType="edit"
        />
      </div>
      <div className={inputWrapperClassName}>
        <p className="pl-5 capitalize">name:</p>
        <div className="pr-5">
          { recipeDetails.name }
        </div>
      </div>
      <div className={inputWrapperClassName}>
        <p className="pl-5 capitalize">food type:</p>
        <div className="pr-5">
          { recipeDetails.foodType }
        </div>
      </div>
      <div className={inputWrapperClassName}>
        <p className="pl-5 capitalize">prep time:</p>
        <div className="pr-5">
          { `${prepDuration.hours}h ${prepDuration.minutes}m` }
        </div>
      </div>
      <div className={inputWrapperClassName}>
        <p className="pl-5 capitalize">description:</p>
        <div className="pr-5">
          { recipeDetails.description }
        </div>
      </div>
      <div className="mt-3">
        <Button 
          buttonText="delete"
          type="warning"
          onClick={ tryDelete }
        />
      </div>
    </div>
  )
}

export default RecipeDetails;