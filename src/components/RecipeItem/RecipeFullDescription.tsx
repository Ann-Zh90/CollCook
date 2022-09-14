import React, {Fragment, useCallback, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import CookRating from "../Utility/CookRating";

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';

import s from "./RecipeFullDescription.module.css";
import {IDish} from "../../store/recipes-part";
import {fireBaseURL} from "../Pages/AddRecipePage/AddRecipePageUseFormHook/AddRecipeUseFormHook";

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Interesting',
    3.5: 'Not Bad',
    4: 'Good',
    4.5: 'Tasty',
    5: 'Delicious',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const RecipeFullDescription: React.FC = () => {
    const [rating, setRating] = useState<number | null>(4);
    const [hover, setHover] = useState<number>(-1);
    const [isRatingReadOnly, setIsRatingReadOnly] = useState<boolean>(false)

    const recipesList = useSelector((state: RootState) => state.recipes.dishes);
    const {id} = useParams();
    const recipe = recipesList.find(recipe => recipe.id.toString() === id);

    const steps = recipe?.fullDescription?.map((step, index) => <div>
        <h2>STEP {index + 1}</h2>
        <div>{step[0]}</div>
        {step[1] && <img src={step[1]} alt={recipe.name}/>}
    </div>)

    const updateRecipe = useCallback(async (recipeList: IDish[]) => {
        await fetch(fireBaseURL, {
            method: "PUT",
            body: JSON.stringify(recipeList),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, [])

    const onRatingChange = (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
        console.log("rating changed");
        setRating(newValue);
        setIsRatingReadOnly(true);
        if (newValue && id) {
            const recipeListUPD = recipesList.map(recipe => {
                console.log(recipe)
                if (recipe.id === +id && recipe.rating) {
                    console.log("rating is object");
                    const newRating = (recipe.rating.rating * recipe.rating.voices + newValue) / (recipe.rating.voices + 1)
                    return ({
                        ...recipe, rating: {
                            voices: recipe.rating.voices + 1,
                            rating: +(Math.round(newRating * 2) / 2).toFixed(1)
                        }
                    })
                }

                return recipe
            })
            console.log(recipeListUPD)
            updateRecipe(recipeListUPD)
        }


    }

    return (<Fragment>
        {!recipe && <div>Error!</div>}
        {recipe &&
            <div className={s.recipeContainer}>
                <div className={s.recipeHeader}>
                    <div className={s.titleContainer}>
                        <img src={recipe.mainImg} alt="udon"/>
                        <h1 className={s.title}>{recipe.name}</h1></div>
                </div>
                <div className={s.data}>
                    <div>Published: {recipe.date}</div>
                    <div className={s.rating}>Rating:
                        <CookRating value={recipe.rating ? recipe.rating.rating : 0}/>
                    </div>
                </div>
                <div>Categories: {recipe.categories.join(", ")}</div>
                <div>Ingredients: {recipe.ingredients.map(ing => ing[0]).join(", ")}
                </div>
                <div>Cooking Steps
                    {recipe && steps}
                </div>

                <div>
                    <h4>Do You Like This Recipe?</h4>
                    <div className={s.rating}><Rating
                        readOnly={isRatingReadOnly}
                        name="hover-feedback"
                        value={rating}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={onRatingChange}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                    />
                        {rating !== null && (
                            <Box sx={{ml: 2}}>{labels[hover !== -1 ? hover : rating]}</Box>
                        )}</div>
                </div>
            </div>}
    </Fragment>)
}

export default RecipeFullDescription