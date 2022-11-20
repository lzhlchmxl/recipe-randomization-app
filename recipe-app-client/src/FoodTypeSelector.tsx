import * as T from "./types";

function FoodTypeSelector(
  {value, setFoodType}
  :
  {
    value: T.FoodType | "default",
    setFoodType: (selectedFoodType: T.FoodType | "default") => void,
  }
) {

  return (
    <select
      value={value}
      onChange={ (e) => setFoodType(e.target.value as T.FoodType | "default")}
    > 
      <option value="default">- select -</option>
      <option value="meat">Meat</option>
      <option value="veggie">Veggie</option>
      <option value="mixed">Mixed</option>
    </select>
  )
}

export default FoodTypeSelector;