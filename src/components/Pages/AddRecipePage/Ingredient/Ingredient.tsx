import s from "./Ingredient.module.css";
import {units} from "../../../../store/recipes-part";
import React from "react";
import { Field } from "react-final-form";

interface IProps {
    name: number;
}

const Ingredient:React.FC = () => {
  return (
      <div className={s.ingredientItem}>
          <Field component="input" name="ingredient" placeholder="Ingredient name"/>
          <Field component="input" name="amount" placeholder="Amount of ingredient"/>
          <Field component="select"  name="units" className={s.select}>
              <option />
              {Object.values(units).map(u => <option key={u}>{u}</option>)}
          </Field>
          {/*<input name="ingredient" placeholder="Ingredient name"/>*/}
          {/*<input name="amount" placeholder="Amount of ingredient"/>*/}
          {/*<select id="units" name="units" className={s.select}>*/}
          {/*    <option />*/}
          {/*    {Object.values(units).map(u => <option key={u}>{u}</option>)}*/}
          {/*</select>*/}
      </div>
  )
}

export default Ingredient;