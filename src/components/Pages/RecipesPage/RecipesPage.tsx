import s from './RecipesPage.module.css'
import RecipeItem from "../../RecipeItem/RecipeItem";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store";
import {Link} from "react-router-dom";

import {fireBaseURL} from "../AddRecipePage/AddRecipePageUseFormHook/AddRecipeUseFormHook";
import {IDish, recipesAction} from "../../../store/recipes-part";

const RecipesPage:React.FC =()=> {
    const recipesList = useSelector((state:RootState) => state.recipes.dishes);
    const recipes = recipesList.map(recipe => <RecipeItem key={recipe.id} recipe={recipe}/>)

    const dispatch = useDispatch<AppDispatch>();

    const getRecipes = useCallback(async ()=>{
        const response = await fetch(fireBaseURL);
        const data = await response.json();
        const allRecipes:IDish[] = Object.values(data);
        // console.log(data);
        // console.log(Object.values(data)) //массив dishes
        dispatch(recipesAction.getAllRecipes(allRecipes))
    }, [])

    useEffect(()=> {
    getRecipes()
    }, [])

    return <div className={s.container}>
        <h1>Worth a Try</h1>
        {recipes}
        <Link to="/add">
            <div className={s.addRecipe}><p>Add new recipe</p></div>
        </Link>
    </div>
}

export default RecipesPage;