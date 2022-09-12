import React, {FormEvent, useState} from "react";
import {recipesAction, units, IDish} from "../../../../store/recipes-part";
import {useForm, SubmitHandler} from "react-hook-form";

import {firstRecipe} from "../../../../store/recipes-part";

import s from './AddRecipeUseFormHook.module.css'
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store/store";

export const fireBaseURL = 'https://coolcook-ce2db-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'


interface IIngredient {
    ingredient?: string;
    amount?: string;
    units?: string;
    id?: string;
}
interface IStep{
    image: string;
    text: string;
}

type IFormData = {
    title: string;
    cuisine: string;
    dishType: string;
    foodType: string;
    ingredients: {
        [prop: string]: IIngredient
    }
    smlDescription: string;
    fullDescription: {
        [prop: string]: IStep
    };
    mainImg: string
}

interface IStep {
    text: string;
    id: string;
}


const AddRecipeUseFormHook = () => {
    const {register, handleSubmit} = useForm<IFormData>();
    const [ingredientSet, setIngredientSet] = useState<IIngredient[]>([{
        ingredient: "",
        amount: "",
        units: "",
        id: "0"
    }])

    const [cookingStep, setCookingStep] = useState<IStep[]>([{
        text: "",
        id: "0",
        image: ""
    }])

    //const dispatch = useDispatch<AppDispatch>();

    async function addRecipeFireBase(recipe: IDish) {
        await fetch(fireBaseURL, {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    const onSubmit: SubmitHandler<IFormData> = (data) => { // create correct type for form data
        //console.log(data.mainImg[0])
       // const img = URL.createObjectURL(data.mainImg[0])
        const date = new Date().toLocaleDateString('en-GB')
        const recipe: IDish = {
            id: Math.random(),
            name: data.title,
            categories: [data.cuisine, data.dishType, data.foodType],
            ingredients: Object.values(data.ingredients).map((ingredient: any) => [ingredient.ingredient, ingredient.amount, ingredient.units]) as Array<[name: string, amount: number, units: string]>,
            date: date,
            smallDescription: data.smlDescription,
            fullDescription: Object.values(data.fullDescription).map(i=> [i.text, i.image]),
            mainImg: data.mainImg,
        }
        //dispatch(recipesAction.addRecipe(recipe));
        addRecipeFireBase(recipe)
    };


    const ingredientChangeHandler = (e: FormEvent<HTMLInputElement>, index: number) => {
        const newIngredientSet = [...ingredientSet];
        newIngredientSet[index].ingredient = e.currentTarget.value;
        setIngredientSet(newIngredientSet)
    }

    const amountChangeHandler = (e: FormEvent<HTMLInputElement>, index: number) => {
        const newIngredientSet = [...ingredientSet];
        newIngredientSet[index].amount = e.currentTarget.value;
        setIngredientSet(newIngredientSet)
    }

    const unitsChangeHandler = (e: FormEvent<HTMLSelectElement>, index: number) => {
        const newIngredientSet = [...ingredientSet];
        newIngredientSet[index].units = e.currentTarget.value;
        setIngredientSet(newIngredientSet)
    }

    const addIngredientHandler = () => {
        setIngredientSet([...ingredientSet, {
            ingredient: "",
            amount: "",
            units: "",
            id: "id" + Math.random().toString(16).slice(2)
        }])
    }

    const stepChangeHandler = (e: FormEvent<HTMLTextAreaElement>, index: number) => {
        const newCookingStep = [...cookingStep];
        newCookingStep[index].text = e.currentTarget.value;
        setCookingStep(newCookingStep)
    }

    const addStepHandler = () => {
        setCookingStep([...cookingStep, {
            text: "",
            id: "id" + Math.random().toString(16).slice(2),
            image: ""
        }])
    }

    return (

        <div>
            <h2>Create Your Own Culinary Masterpiece</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.title}>
                    <label htmlFor="title">Make Up Name</label>
                    <input id="title" placeholder="type title" {...register("title")}/>
                    <label htmlFor="mainImg">Add an Image Link </label>
                    <input  id="mainImg" {...register("mainImg")}/>
                </div>
                <fieldset className={s.sectionContainer}>
                    <legend>Chose Types of Dish</legend>
                    <div>
                        <label htmlFor="dishType">Select Type of Dish</label>
                        <select id="dishType" {...register("dishType")} className={s.select}>
                            <option/>
                            <option>First course</option>
                            <option>Second course</option>
                            <option>Baking</option>
                            <option>Drinks</option>
                            <option>Dessert</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="cuisine">Select Cuisine Nationality</label>

                        <select id="cuisine" {...register("cuisine")} className={s.select}>
                            <option/>
                            <option>Asian</option>
                            <option>French</option>
                            <option>Ukrainian</option>
                            <option>Caucasian</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="foodType">Select Food Type</label>
                        <select id="foodType" {...register("foodType")} className={s.select}>
                            <option/>
                            <option>Eat Everything</option>
                            <option>Vegetarian</option>
                            <option>Vegan</option>
                        </select>
                    </div>
                </fieldset>


                <fieldset>
                    <legend>Ingredients</legend>
                    {ingredientSet.map((ing, index) => {
                            return <div className={s.ingredientItem} key={ing.id}>
                                <input  {...register(`ingredients.ingredient_${ing.id}.ingredient`)}
                                        placeholder="Ingredient name"
                                        onChange={e => ingredientChangeHandler(e, index)} defaultValue={ing.ingredient}/>
                                <input  {...register(`ingredients.ingredient_${ing.id}.amount`)}
                                        placeholder="Amount of ingredient"
                                        onChange={e => amountChangeHandler(e, index)} defaultValue={ing.amount}/>
                                <select {...register(`ingredients.ingredient_${ing.id}.units`)} className={s.select}
                                        onChange={e => unitsChangeHandler(e, index)} defaultValue={ing.units}>
                                    <option/>
                                    {Object.values(units).map(u => <option key={u}>{u}</option>)}
                                </select>
                            </div>

                        }
                    )
                    }
                    <button type="button" onClick={addIngredientHandler}>Add Another Ingredient</button>
                </fieldset>

                <fieldset>
                    <legend>Add Small Description</legend>
                    <label htmlFor="smlDescription">Small Description</label>
                    <textarea id="smlDescription" {...register("smlDescription")}/>
                </fieldset>

                <fieldset>
                    <legend>Add Step by Step Description</legend>

                    {cookingStep.map((step, index) => <div key={step.id}>
                        <div><label htmlFor={`${step.id}.image`}>Add image</label>
                            <input id={`${step.id}.image`} {...register(`fullDescription.step_${step.id}.image`)}/>
                        </div>
                        <div><label htmlFor={`step_${step.id}`}>{index + 1} step</label>
                            <textarea id={`step_${step.id}`} {...register(`fullDescription.step_${step.id}.text`)}
                                      onChange={e => stepChangeHandler(e, index)} defaultValue={step.text}/>
                        </div>
                    </div>)}
                    <button type="button" onClick={addStepHandler}>Add Step</button>
                </fieldset>

                <button type="submit" className={s.btn}>Create recipe</button>
            </form>
        </div>
    )
}

export default AddRecipeUseFormHook;