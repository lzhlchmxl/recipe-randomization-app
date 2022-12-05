import RandomizePage from "./RandomizePage";

function HomePage() {

  return (
    <div className="flex flex-col">
      <div className="text-lg">Let's figure out what we are having today</div>
      <RandomizePage />
    </div>
  )
}
 export default HomePage;