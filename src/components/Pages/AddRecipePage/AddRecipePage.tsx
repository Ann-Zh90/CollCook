import React, {FormEvent, useState} from "react";
import {Field, Form } from "react-final-form";
import {units} from "../../../store/recipes-part";

import s from "./AddRecipePage.module.css"
import Ingredient from "./Ingredient/Ingredient";

interface IValues {
    title?: string;
    dishType?: string;
    cuisine?: string;
    foodType?: string;
}


const AddRecipePage = () => {
  const [ingredientsSet, setIngredientsSet] = useState([{iName:"", uName: "", aName:0}])

    // const handleChange = (e, index) => {
    //     console.log("a");
    // }
    //
    // const handleInputChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...inputList];
    //     list[index][name] = value;
    //     setInputList(list);
    // };

const onSubmit = (values: IValues) => {
    console.log(values)
}
    return (

        <Form
            onSubmit={onSubmit}
            render={({handleSubmit, form, submitting, pristine, values}) => (
                <div>
                    <h2>Create Your Own Culinary Masterpiece</h2>
                    <form onSubmit={handleSubmit} className={s.form}>
                        <div className={s.title}>
                            <label htmlFor="title">Make Up Name</label>
                            <Field<string> id="title" placeholder="type title" name="title" component="input"/>
                        </div>
                        <fieldset className={s.sectionContainer}>
                            <legend>Chose Types of Dish</legend>
                            <div>
                                <label htmlFor="dishType">Select Type of Dish</label>
                                <Field<string> id="dishType"  name="dishType" component="select" className={s.select}>
                                    <option/>
                                <option>First course</option>
                                <option>Second course</option>
                                <option>Drinks</option>
                                <option>Dessert</option>
                                </Field>
                            </div>

                            <div>
                                <label htmlFor="cuisine">Select Cuisine Nationality</label>

                                <Field<string> id="cuisine" name="cuisine" component="select" className={s.select}>
                                    <option/>
                                    <option>Asian</option>
                                    <option>French</option>
                                    <option>Ukrainian</option>
                                    <option>Caucasian</option>
                                </Field>
                            </div>

                            <div>
                                <label htmlFor="foodType">Select Food Type</label>
                                <Field<string> id="foodType" name="foodType" component="select" className={s.select}>
                                    <option/>
                                    <option>Eat Everything</option>
                                    <option>Vegetarian</option>
                                    <option>Vegan</option>
                                </Field>
                            </div>
                        </fieldset>
                        <fieldset>
                        <legend>Ingredients</legend>
                            {
                                ingredientsSet.map((ing, i)=>{
                                    return <div className={s.ingredientItem}>
                                        <Field component="input" name="ingredient" placeholder="Ingredient name"  />
                                        <Field component="input" name="amount" placeholder="Amount of ingredient" />
                                        <Field component="select"  name="units" className={s.select}>
                                            <option />
                                            {Object.values(units).map(u => <option key={u}>{u}</option>)}
                                        </Field>
                                    </div>
                                })
                            }
                        {/*<Field<string> name="ingredient" component={Ingredient} className={s.select}/>*/}
                        <button>Add Another Ingredient</button>
                        </fieldset>
                        <button  type="submit" className={s.btn}>Submit</button>
                    </form>
                </div>
            )}/>
    )
}

export default AddRecipePage;