import {AnyAction} from "redux";
import {RootState} from "./store";
import {ThunkAction} from "redux-thunk";

import {IDish, recipesAction} from "./recipes-part";
import {fireBaseURL} from "../components/Pages/AddRecipePage/AddRecipePageUseFormHook/AddRecipeUseFormHook";

const fetchRecipe = (): ThunkAction<
    void,
    RootState,
    unknown,
    AnyAction
    > => {
    return async (dispatch) => {
        const getRecipes = async () => {
            const response = await fetch(fireBaseURL);
            return await response.json();
        }

        try {
            const data = await getRecipes()
            const allRecipes: IDish[] = Object.values(data);
            allRecipes.forEach(i=> console.log(i.name))
            dispatch(recipesAction.getAllRecipes(allRecipes))
        }
        catch(error:any) {
            console.log(error.message)
        }

    }
}

const updateRecipe = ():ThunkAction<
    void,
    RootState,
    unknown,
    AnyAction
    > => {
    return async (dispatch) => {
        const putRecipe = async ()=> {
            const response = await fetch(fireBaseURL, )
        }
    }
}

export default fetchRecipe;