import { NavLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <NavLink
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          to={"/recipe-list"}
        >
          Recipes
        </NavLink>
        <NavLink
          to={"/history"}
        >
          History
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
