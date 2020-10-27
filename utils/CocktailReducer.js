import { generate } from 'shortid'


var default_cocktails = defaultCocktails()
// var default_cocktails = [
//     {
//         id: generate(),
//         name: 'Martini',
//         // ingredients: [
//         //     {
//         //         id: generate(),
//         //         ingredient_name: 'Gin',
//         //         parts: 1
//         //     },
//         //     {
//         //         id: generate(),
//         //         ingredient_name: 'Dry Vermouth',
//         //         parts: 1
//         //     },
//         // ]
//     },
//     {
//         id: generate(),
//         name: 'Gin & Tonic',
//         // ingredients: [
//         //     {
//         //         id: generate(),
//         //         ingredient_name: 'Gin',
//         //         parts: 1
//         //     },
//         //     {
//         //         id: generate(),
//         //         ingredient_name: 'Tonic',
//         //         parts: 2
//         //     },
//         // ]
//     },
//     {
//         id: generate(),
//         name: 'Negroni',
//         // ingredients: [
//         //     {
//         //         id: generate(),
//         //         ingredient_name: 'Gin',
//         //         parts: 1
//         //     },
//         //     {
//         //         id: generate(),
//         //         ingredient_name: 'Sweet Vermouth',
//         //         parts: 1
//         //     },
//         //     {
//         //         id: generate(),
//         //         ingredient_name: 'Campari',
//         //         parts: 1
//         //     },
//         // ]
//     },
// ]


const INITIAL_STATE = {
    // cocktails: [...default_cocktails],
    current: [...default_cocktails],
    possible: []
}

const cocktailReducer = (state = INITIAL_STATE, action) => {
    // console.log('cocktail reducing', state)
    
    const { cocktails } = state
    switch (action.type){
        // case 'ADD_COCKTAIL':
        //     const new_cocktail = action.payload
        //     cocktails.push(new_cocktail)

        //     const newState = {cocktails}

        //     return newState
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
                    parts: 0
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
            name: 'Manhatten',
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