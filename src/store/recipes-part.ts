import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IDish {
    id: number;
    name: string;
    categories: string[];
    ingredients: Array<[name: string, amount: number, units: string]>
    date: Date;
    rate: number;
    smallDescription: string;
    fullDescription: string[]
}

interface IRecipesState {
    dishes: IDish[]
}

export const units = {
    piece: "piece",
    g: "g",
    tbsp: "tbsp",
    tsp: "tsp",
    kg: "kg",
    ml: "ml",
    l: "l"
}

const initialState: IRecipesState = {
    dishes: [{
        id:1,
        name: "Vegetable Udon Stir Fry (Veggie Yaki Udon)",
        categories: ["asian cuisine", "main course", "spaghetti", "udon", "vegetables"],
        ingredients: [["sesame oil", 1.5, units.tbsp], ["red onion", 1, units.piece], ["mangetout", 160, units.g], ["baby corn", 70, units.g], ["baby pak choi", 2, units.piece], ["spring onions", 3, units.piece], ["large garlic clove", 1, units.piece], ["mild curry powder", 0.5, units.tbsp], ["low-salt soy sauce", 4, units.tsp], ["ready-to-cook udon noodles", 300, units.g], ["pickled sushi ginger", 1, units.tbsp]],
        date: new Date(),
        rate: 4.5,
        smallDescription: "Pack in the veg with our flavour-packed Japanese-inspired yaki udon. It's healthy, takes just 25 minutes to make, and is low in fat and calories",
        fullDescription: ["Heat the oil in a non-stick frying pan or wok over a high heat. Add the onion and fry for 5 mins. Stir in the mangetout, corn, pak choi and spring onions and cook for 5 mins more. Add the garlic, curry powder and soy sauce, and cook for another minute.", "Add the udon noodles along with the ginger (if using) and reserved brine, and stir in 2-3 tbsp hot water until the noodles are heated through. Divide between bowls and serve."]
    }]
}

export const recipesPart = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipe(state, action: PayloadAction<IDish>) {
            state.dishes.push(action.payload)
        }
    }
})

export const recipesAction = recipesPart.actions;
export default recipesPart.reducer;
//export default recipesPart;