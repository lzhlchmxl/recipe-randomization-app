import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

type LinkType = "create" | "back" | "edit";

function LinkButton( {to, linkType, onClick}: { to: string, linkType: LinkType, onClick?: () => void}) {

  let icon = null;

  switch(linkType) {
    case "back":
      icon = faChevronLeft;
      break;
    case "create":
      icon = faPlus;
      break;
    case "edit":
      icon = faEdit;
      break;
    default:
      throw new Error("Unknown icon name");
  }

  return (
    <NavLink
      className="text-xs font-semibold rounded-lg border-2 border-yellow-300 p-0.5 px-1.5 ml-3 uppercase"
      to={to}
      onClick={onClick}
    >
      <FontAwesomeIcon className="pr-1" icon={icon} />
      {linkType}
    </NavLink>
  )

}

export default LinkButton;