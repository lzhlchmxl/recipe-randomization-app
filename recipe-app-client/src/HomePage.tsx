import RandomizePage from "./RandomizePage";

function HomePage() {

  return (
    <div className="flex flex-col h-full">
      <div className="text-5xl my-5">It's cooking time!</div>
      <RandomizePage />
    </div>
  )
}
 export default HomePage;