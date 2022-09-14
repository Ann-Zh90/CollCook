import s from './RecipesPage.module.css'
import RecipeItem from "../../RecipeItem/RecipeItem";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store";
import {Link} from "react-router-dom";

import fetchRecipe from "../../../store/recipe-action";

const RecipesPage: React.FC = () => {
    const recipesList = useSelector((state: RootState) => state.recipes.dishes);
    const recipes = recipesList.map(recipe => <RecipeItem key={recipe.id} recipe={recipe}/>)

    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchRecipe())
    }, [dispatch])

    return (
        <div>
            <h1>Worth to Try</h1>
            <div className={s.container}>
                <div className={s.allRecipes}>{recipes}</div>
            </div>
            <Link to="/add">
                <div className={s.addRecipe}><p>Add new recipe</p></div>
            </Link>
        </div>)
}

export default RecipesPage;