export const addCocktail = new_cocktail => (
    {
        type: 'ADD_COCKTAIL',
        payload: new_cocktail
    }
)

export const updateCocktail = updated_cocktail => (
    {
        type: 'UPDATE_COCKTAIL',
        payload: updated_stock
    }
)

export const updateCocktails = new_cocktails => (
    {
        type: 'UPDATE_COCKTAILS',
        payload: new_cocktails
    }
)