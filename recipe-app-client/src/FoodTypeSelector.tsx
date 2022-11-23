import * as T from "./types";

function FoodTypeSelector(
  {value, setSelectedFoodType}
  :
  {
    value: T.FoodType | "default",
    setSelectedFoodType: (selectedFoodType: T.FoodType | "default") => void,
  }
) {

  return (
    <select
      value={value}
      onChange={ (e) => setSelectedFoodType(e.target.value as T.FoodType | "default")}
    > 
      <option value="default">- select -</option>
      <option value="meat">Meat</option>
      <option value="veggie">Veggie</option>
      <option value="mixed">Mixed</option>
    </select>
  )
}

export default FoodTypeSelector;