
function Button(
  {
    buttonText,
    type,
    onClick,
    // size,
  }
  :
  {
    buttonText: string,
    type: "primary" | "action" | "warning",
    // size?: "small" | "medium" | "large",
    onClick: () => void,
  }
) {

  // const className = `rounded-3xl text-white bg-green-400 w-fit px-5 py-2 capitalize`

  const className = () => {
    let className = "";
    switch(type) {
      case "primary":
        className += `rounded-3xl text-white bg-green-400 w-fit px-5 py-2 capitalize`
        break;
      case "action":
        className += `rounded-xl text-white bg-gray-800 w-fit px-5 py-2 capitalize`
        break;
      case "warning":
        className += `rounded-xl text-white bg-red-500 w-fit px-5 py-2 capitalize`
        break;
      default:
        throw new Error("Invalid button type.");
    }
    // if (typeof size !== undefined) {
    //   switch(size) {
    //     case "small":
          
    //       break;
    //     case "medium":
    //       break;
    //     case "large":
    //       break;
    //   }
  
    // }
    
    return className;
  }

  return (
    <button
      className={className()}
      onClick={onClick}
    >
      {buttonText}
    </button>
  )
}

export default Button;