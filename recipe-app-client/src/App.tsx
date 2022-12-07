import { NavLink, Outlet } from 'react-router-dom';
import { ReactComponent as HomeIcon } from './assets/home_icon.svg';
import { ReactComponent as RecipesIcon } from './assets/menu_icon.svg';
import { ReactComponent as HistoryIcon } from './assets/history_icon.svg';

function App() {

  return (
    <div className='flex flex-col h-screen bg-yellow-500'>
      <div className='flex flex-col p-5 h-full bg-gradient-to-r from-white via-white to-yellow-50 rounded-b-3xl'>
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
      </div>
      <div className='flex justify-between my-3 sm:hidden'>
          <button
            onClick={ () => window.location.href = '/'}
          >
            <HomeIcon 
              style={ { color: "white" } }
            />
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
