import { generate } from 'shortid'


var default_cocktails = defaultCocktails()

const INITIAL_STATE = {
    // cocktails: [...default_cocktails],
    current: [...default_cocktails],
    possible: [],
    slider: 0
}

const cocktailReducer = (state = INITIAL_STATE, action) => {
    // console.log('cocktail reducing', state)
    
    const { current } = state
    switch (action.type){
        case 'ADD_COCKTAIL':
            // console.log('adding', action)
            const new_cocktail = action.payload
            current.push(new_cocktail)

            const newState = {current}

            return newState
        case 'UPDATE_COCKTAILS':
            const updated = action.payload
            // console.log('updated', updated)
            const updated_current = current.map(c=>{
                if(c.id == updated.id){
                    return updated
                } else {
                    return c
                }
            })

            const updatedState = {current: updated_current}

            return updatedState
        case 'DELETE_COCKTAIL':
            const delete_id = action.payload
            const deleted = current.filter(c=>c.id != delete_id)

            const deleteState = {current: deleted}

            return deleteState
        case 'DELETE_COCKTAILS':
            const not_deleted = current.filter(c=>!c.selected)

            const notDeleteState = {current: not_deleted}

            return notDeleteState
        case 'SELECT_COCKTAIL':
            const select_id = action.payload
            const selected = current.map(c=>{
                if(c.id == select_id){
                    c.selected = !c.selected
                }
                return c
            })
            console.log('select action', select_id)

            const selectState = {current: selected}

            return selectState
        case 'CHANGE_COCKTAIL_SLIDER':
            const slider_val = action.payload

            return {current, slider: slider_val}
        case 'RESET':
            return INITIAL_STATE
        default:
            return state
    }
}

export default cocktailReducer



function defaultCocktails() {
    return [
        {
            id: generate(),
            name: 'Martini',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Dry Vermouth',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Gin & Tonic',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Tonic',
                    parts: 2
                },
            ]
        },
        {
            id: generate(),
            name: 'Negroni',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Sweet Vermouth',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Campari',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Whiskey Sour',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: 2
                },
                {
                    id: generate(),
                    ingredient_name: 'Lemon Juice',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Simple Syrup',
                    parts: .5
                },
                {
                    id: generate(),
                    ingredient_name: 'Red Wine',
                    // parts: 0
                    parts: 'float'
                },
            ]
        },
        {
            id: generate(),
            name: 'Boulevardier',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Sweet Vermouth',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Campari',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Manhattan',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: 2
                },
                {
                    id: generate(),
                    ingredient_name: 'Sweet Vermouth',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Angostura',
                    // parts: 'dash'
                    parts: 0
                },
            ]
        },
        {
            id: generate(),
            name: 'Last Word',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Lime Juice',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Green Chartreuse',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Maraschino Liquer',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Corpse Reviver #2',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Cocchi Americano',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Lemon Juice',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Cointreau',
                    parts: 1
                },
            ]
        },
        {
            id: generate(),
            name: 'Sidecar',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Brandy',
                    parts: 1.5
                },
                {
                    id: generate(),
                    ingredient_name: 'Lemon Juice',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Cointreau',
                    parts: .75
                },
            ]
        },
        {
            id: generate(),
            name: 'French 75',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Lemon Juice',
                    parts: .5
                },
                {
                    id: generate(),
                    ingredient_name: 'Simple Syrup',
                    parts: .5
                },
                {
                    id: generate(),
                    ingredient_name: 'Champagne',
                    parts: 3
                },
            ]
        },
        {
            id: generate(),
            name: 'Vesper',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 3
                },
                {
                    id: generate(),
                    ingredient_name: 'Vodka',
                    parts: 1
                },
                {
                    id: generate(),
                    ingredient_name: 'Cocchi Americano',
                    parts: .75
                },
            ]
        },
        {
            id: generate(),
            name: 'Sazerac',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: 1.5
                },
                {
                    id: generate(),
                    ingredient_name: 'Brandy',
                    parts: 1.5
                },
                {
                    id: generate(),
                    ingredient_name: 'Angostura',
                    parts: 0
                },
                {
                    id: generate(),
                    ingredient_name: 'Peychauds',
                    parts: 0
                },
                {
                    id: generate(),
                    ingredient_name: 'Absinthe',
                    parts: 0
                },
            ]
        },
        {
            id: generate(),
            name: 'Vieux Carre',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Rye',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Sweet Vermouth',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Brandy',
                    parts: .75
                },
                {
                    id: generate(),
                    ingredient_name: 'Benedictine',
                    parts: .25
                },
            ]
        },
    ]
}