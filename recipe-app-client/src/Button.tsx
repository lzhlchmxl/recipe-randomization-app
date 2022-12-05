
function Button(
  {
    buttonText,
    buttonIcon,
    type,
    onClick,
  }
  :
  {
    buttonText: string,
    buttonIcon?: string,
    type: "primary" | "action",
    onClick: () => void,
  }
) {

  const className = `rounded-sm text-white bg-green-400 w-fit px-5 py-2`

  return (
    <button
      className={className}
      onClick={onClick}
    >
      {buttonText}
      {buttonIcon !== undefined && buttonIcon}
    </button>
  )
}

export default Button;