import React, {Fragment} from "react";
import udon from "../../images/recipes/udon.jpg"
import s from "./RecipeFullDescription.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";


const RecipeFullDescription: React.FC = () => {
    const recipesList = useSelector((state: RootState) => state.recipes.dishes);
    const {id} = useParams();
    const recipe = recipesList.find(recipe => recipe.id.toString() === id);
    return (<Fragment>
        {!recipe && <div>Error!</div>}
        {recipe &&
            <div className={s.recipeContainer}>
                <div className={s.recipeHeader}>
                    <div className={s.titleContainer}>
                        <img src={udon} alt="udon"/>
                        <h1 className={s.title}>{recipe.name}</h1></div>
                </div>
                <div className={s.data}>
                    <div>Published: {recipe.date}</div>
                    <div>Rating: {recipe.rate}</div>
                </div>
                <div>Categories: {recipe.categories.join(", ")}</div>
                <div>Ingredients: {recipe.ingredients.map(ing => ing[0]).join(", ")}
                </div>
                <div>Cooking Steps
                    <div>
                        <h2>STEP 1</h2>
                        {recipe.fullDescription && recipe.fullDescription[0]}</div>
                    <div>
                        <h2>STEP 2</h2>
                        {recipe.fullDescription && recipe.fullDescription[1]}
                    </div>
                </div>
            </div>}
    </Fragment>)
}

export default RecipeFullDescription