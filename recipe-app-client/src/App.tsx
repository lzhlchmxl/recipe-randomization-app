import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faBook, faClockRotateLeft  } from '@fortawesome/free-solid-svg-icons'

function App() {

  return (
    <div className='flex flex-col h-screen bg-yellow-500'>
      <div className='flex flex-col p-5 overflow-y-auto h-[calc(100%-50px)] bg-gradient-to-r from-white via-white to-yellow-50 rounded-b-3xl'>
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
      <div className='flex justify-between sm:hidden text-gray-100 text-4xl p-1 mt-[3px]'>
          <button
            className='flex items-center'
            onClick={ () => window.location.href = '/'}
          >
            <FontAwesomeIcon icon={faKey} />
          </button>
          <button
            className='flex items-center'
            onClick={ () => window.location.href = '/recipe-list'}
          >
            <FontAwesomeIcon icon={faBook} />
          </button>
          <button
            className='flex items-center'
            onClick={ () => window.location.href = '/history'}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} />
          </button>
      </div>
    </div>
  );
}

export default App;
