import { NavLink, Outlet } from 'react-router-dom';
import { ReactComponent as HomeIcon } from './assets/home_icon.svg';
import { ReactComponent as RecipesIcon } from './assets/menu_icon.svg';
import { ReactComponent as HistoryIcon } from './assets/history_icon.svg';

function App() {
  return (
    <div className='flex flex-col p-5 h-screen'>
      <div className='hidden sm:flex'>
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
      <div className='flex justify-between mt-auto sm:hidden'>
        <button
          onClick={ () => window.location.href = '/'}
        >
          <HomeIcon />
        </button>
        <button
          onClick={ () => window.location.href = '/recipe-list'}
        >
          <RecipesIcon />
        </button>
        <button
          onClick={ () => window.location.href = '/history'}
        >
          <HistoryIcon />
        </button>
      </div>
    </div>
  );
}

export default App;
