import { getRecipes } from "./Api";
import { useAsync } from "./CustomHooks";
import * as util from "./util";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

function RecipePage() {

  const isListView = useLocation().pathname === "/recipe-list";

  const recipeHeadersAsync = useAsync(getRecipes, []);
  
  if (recipeHeadersAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (recipeHeadersAsync.status === "rejected") {
    return <>something went wrong...</>
  }

  const sortedRecipeHeaders = util.sortObjectsByProperty(recipeHeadersAsync.value, "name");

  return (
    <div className="flex">
      <div className={isListView ? `flex flex-col` : "hidden sm:flex sm:flex-col" }>
        {
          sortedRecipeHeaders.map( recipeHeader => {
            return (
              <NavLink 
                className="flex"
                key={ recipeHeader.id } 
                to={ `/recipe-list/${recipeHeader.id}` }
              >
                <div>{ recipeHeader.name }</div>
                <div>{ recipeHeader.foodType }</div>
                <div>{ recipeHeader.prepTimeInSeconds }</div>
                <br />
              </NavLink>
            )
          })
        }
        <NavLink
          to={ `/recipe-list/create` }
        >
          New Recipe
        </NavLink>
      </div>
      <div className={isListView ? "hidden sm:flex" : "flex"}>
        <Outlet />
      </div>
    </div>
  )
}


export default RecipePage;