import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RecipePage from './RecipePage';
import reportWebVitals from './reportWebVitals';
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import CreateRecipe from './CreateRecipe';
import EditRecipe from './EditRecipe';
import HomePage from './HomePage';
import HistoryPage from './HistoryPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="recipe-list" element={<RecipePage />} >
            <Route index element={<div>Please select a recipe from the list</div>} />
            <Route path=":recipeId" element={<RecipeDetails />} />
            <Route path="create" element={<CreateRecipe />} />
            <Route path="edit/:recipeId" element={<EditRecipe />} />
          </Route>
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
