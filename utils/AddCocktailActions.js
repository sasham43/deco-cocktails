export const setNewCocktailIngredient = ingredient => (
    {
        type: 'SET_NEW_COCKTAIL_INGREDIENT',
        payload: ingredient
    }
)

export const setNewCocktailName = name => (
    {
        type: 'SET_NEW_COCKTAIL_NAME',
        payload: name
    }
)

export const setAddedCocktailIngredients = ingredients => (
    {
        type: 'SET_ADDED_COCKTAIL_INGREDIENTS',
        payload: ingredients
    }
)