import { getRecipes } from "./Api";
import { useAsync } from "./CustomHooks";
import * as util from "./util";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import LinkButton from "./LinkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons'

function RecipePage() {

  const pathName = useLocation().pathname;
  const isListView = pathName === "/recipe-list";
  const { recipeId }  = useParams();

  let title = "";
  switch(pathName) {
    case "/recipe-list":
      title = "recipes"
      break;
    case "/recipe-list/create":
      title = "new recipe"
      break;
    case `/recipe-list/${recipeId}`:
      title = "details"
      break;
    case `/recipe-list/edit/${recipeId}`:
      title = "edit"
      break;
    default:
      throw new Error("Can't determine title from unknown pathname")
  }

  const recipeHeadersAsync = useAsync(getRecipes, []);
  
  if (recipeHeadersAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (recipeHeadersAsync.status === "rejected") {
    return <>something went wrong...</>
  }

  const sortedRecipeHeaders = util.sortObjectsByProperty(recipeHeadersAsync.value, "name");

  return (
    <div className="flex flex-col w-full relative">
      <div className="flex justify-between items-baseline">
        <div className="text-5xl my-5 capitalize">
          {title}
        </div>
        <div className="flex">
          {/* {
            !isListView &&
            <LinkButton 
              to="/recipe-list"
              linkType="back"
            />
          } */}
          {
            isListView &&
            <LinkButton
              to="/recipe-list/create"
              linkType="create"
            />
          }
        </div>
      </div>
      <div className={isListView ? `flex flex-col w-full` : "hidden sm:flex sm:flex-col" }>
        {
          sortedRecipeHeaders.map( recipeHeader => {
            return (
              <NavLink 
                className="flex bg-gradient-to-r from-gray-100 via-gray-200 to-yellow-200  
                rounded-xl mt-3 last-of-type:mb-3"
                key={ recipeHeader.id } 
                to={ `/recipe-list/${recipeHeader.id}` }
              >
                <div className="flex w-full items-center justify-baseline bg-white rounded-xl m-0.5">
                  <div className="bg-blue-800 h-[50px] w-[50px] m-1 rounded-md"></div>
                  <div className="flex">
                    <p className="capitalize w-[100px] text-center">{ recipeHeader.name }</p>
                  </div>
                  <div className="flex">
                    <p className="text-left">{ recipeHeader.foodType }</p>
                    <p className="text-left">{ recipeHeader.prepTimeInSeconds }</p>
                  </div>
                  <div className="flex grow justify-end">
                    <FontAwesomeIcon className="pr-[20px] text-gray-500" icon={faBars} />
                  </div>
                </div>
              </NavLink>
            )
          })
        }
      </div>
      <div className={isListView ? "hidden sm:flex" : "flex w-full"}>
        <Outlet />
      </div>
    </div>
  )
}


export default RecipePage;