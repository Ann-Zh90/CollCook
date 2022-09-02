import s from './RecipesPage.module.css'
import RecipeItem from "../../RecipeItem/RecipeItem";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {Link} from "react-router-dom";

const RecipesPage:React.FC =()=> {
    const recipesList = useSelector((state:RootState) => state.recipes.dishes);
    const recipes = recipesList.map(recipe=> <RecipeItem recipe={recipe}/>)

    return <div className={s.container}>
        <h1>Worth a Try</h1>
        {recipes}
        <Link to="/add">
            <div className={s.addRecipe}><p>Add new recipe</p></div>
        </Link>
    </div>
}

export default RecipesPage;