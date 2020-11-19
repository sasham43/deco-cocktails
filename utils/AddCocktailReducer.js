const INITIAL_STATE = {
    new_cocktail_name: '',
    added_cocktail_ingredients: [],
    new_cocktail_ingredient: {
        ingredient_name: '',
        parts: 0
    }
}

const addCocktailReducer = (state = INITIAL_STATE, action) => {
    const { new_cocktail_name, added_cocktail_ingredients, new_cocktail_ingredient } = state

    switch(action.type){
        case 'SET_NEW_COCKTAIL_INGREDIENT':
            const new_ingredient = action.payload
            
            return {
                new_cocktail_name,
                added_cocktail_ingredients,
                new_cocktail_ingredient: new_ingredient
            }
        case 'SET_NEW_COCKTAIL_NAME':
            return {
                new_cocktail_name: action.payload,
                added_cocktail_ingredients,
                new_cocktail_ingredient
            }
        case 'SET_ADDED_COCKTAIL_INGREDIENTS':
            return {
                new_cocktail_name,
                added_cocktail_ingredients: action.payload,
                new_cocktail_ingredient
            }
        default:
            return state
    }
}
export default addCocktailReducer