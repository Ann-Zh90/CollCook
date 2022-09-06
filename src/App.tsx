import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import MainContent from "./components/MainContent/MainContent";
import AboutPage from './components/Pages/AboutPage/AboutPage';
import BlogPage from './components/Pages/BlogPage/BlogPage';
import RecipesPage from './components/Pages/RecipesPage/RecipesPage';
import RecipeFullDescription from "./components/RecipeItem/RecipeFullDescription";
import AddRecipeUseFormHook from "./components/Pages/AddRecipePage/AddRecipePageUseFormHook/AddRecipeUseFormHook";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainContent/>}>
                    <Route path="/recipes" element={<RecipesPage/>}/>
                    <Route path="/recipes/:id" element={<RecipeFullDescription/>}/>
                    <Route path="/blog" element={<BlogPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/add" element={<AddRecipeUseFormHook/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
