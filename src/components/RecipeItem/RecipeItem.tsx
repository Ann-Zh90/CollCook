import s from './RecipeItem.module.css';
import {Link} from 'react-router-dom';
import React from "react";
import {IDish} from "../../store/recipes-part";
import CookRating from "../Utility/CookRating";

interface IRecipeItemProps {
    recipe: IDish
}

const RecipeItem: React.FC<IRecipeItemProps> = ({recipe}) => {

    return <div className={s.card}>
        <div className={s.imgContainer}>
            <img src={recipe.mainImg} alt="udon" className={s.image}/>
        </div>
        <div className={s.infoContainer}>
            <div className={s.name}>{recipe.name}</div>
            <div className={s.data}>
                <div>Published: {recipe.date}</div>
                {recipe.rating?.rating !== undefined && <div className={s.rating}><CookRating value={recipe.rating.rating}/></div>}
            </div>
            <div className={s.category}>Categories: {recipe.categories.join(", ")}</div>
            <div className={s.ingredients}>Ingredients: {recipe.ingredients.map(ing => ing[0]).join(", ")}</div>
            <div className={s.smallDescription}>{recipe.smallDescription}</div>

        </div>
        <Link to={`/recipes/${recipe.id}`} className={s.link}>Read more</Link>
    </div>
}

export default RecipeItem