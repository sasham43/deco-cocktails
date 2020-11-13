export const addCocktail = new_cocktail => (
    {
        type: 'ADD_COCKTAIL',
        payload: new_cocktail
    }
)

export const updateCocktail = updated_cocktail => (
    {
        type: 'UPDATE_COCKTAIL',
        payload: updated_cocktail
    }
)

export const updateCocktails = new_cocktails => (
    {
        type: 'UPDATE_COCKTAILS',
        payload: new_cocktails
    }
)

export const deleteCocktail = id => (
    {
        type: 'DELETE_COCKTAIL',
        payload: id
    }
)

export const deleteCocktails = () => (
    {
        type: 'DELETE_COCKTAILS',
    }
)

export const selectCocktail = id => (
    {
        type: 'SELECT_COCKTAIL',
        payload: id
    }
)