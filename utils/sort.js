export function sortedIngredients(ingredients) {
    if (!ingredients) return []
    return ingredients.sort((a, b) => {
        var a_val = typeof a.parts == 'string' ? 0 : a.parts
        var b_val = typeof b.parts == 'string' ? 0 : b.parts

        if (a_val > b_val) {
            return -1
        } else if (a_val < b_val) {
            return 1
        } else {
            return 0
        }
    })
}