import s from './RecipesPage.module.css'
import RecipeItem from "../../RecipeItem/RecipeItem";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

const RecipesPage:React.FC =()=> {
    const recipesList = useSelector((state:RootState) => state.recipes.dishes);
    const recipes = recipesList.map(recipe=> <RecipeItem recipe={recipe}/>)

    return <div className={s.container}>
        <h1>Worth a Try</h1>
        {recipes}
    </div>
}

export default RecipesPage;