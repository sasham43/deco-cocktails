import { generate } from 'shortid'


var default_cocktails = defaultCocktails()

const INITIAL_STATE = {
    current: [...default_cocktails],
    possible: [],
    slider: 0,
    selected: []
}

const cocktailReducer = (state = INITIAL_STATE, action) => {    
    const { current, selected } = state
    switch (action.type){
        case 'ADD_COCKTAIL':
            const new_cocktail = action.payload
            // current.push(new_cocktail)
            const add_current = current.map(c=>c)
            add_current.push(new_cocktail)
            // const add_current = [...current, new_cocktail]

            const newState = {current: add_current, selected}

            return newState
        case 'UPDATE_COCKTAILS':
            const updated = action.payload
            const updated_current = current.map(c=>{
                if(c.id == updated.id){
                    return updated
                } else {
                    return c
                }
            })

            const updatedState = {current: updated_current, selected}

            return updatedState
        case 'DELETE_COCKTAIL':
            const delete_id = action.payload
            const deleted = current.filter(c=>c.id != delete_id)

            const deleteState = {current: deleted, selected}

            return deleteState
        case 'DELETE_COCKTAILS':
            const not_deleted = current.filter(c=>!c.selected)

            const notDeleteState = {current: not_deleted, selected}

            return notDeleteState
        case 'SELECT_COCKTAIL':
            const select_id = action.payload
            const selected_cocktails = current.map(c=>{
                if(c.id == select_id){
                    c.selected = !c.selected
                }
                return c
            })

            const selectState = {current: selected_cocktails, selected: selected_cocktails.filter(s=>s.selected)}

            return selectState
        case 'UNSELECT_ALL':
            return {
                current: current.map(c => {
                    c.selected = false
                    return c
                }),
                selected: []
            }
        case 'CHANGE_COCKTAIL_SLIDER':
            const slider_val = action.payload

            return {current, slider: slider_val, selected}
        case 'RESET':
            return INITIAL_STATE
        default:
            return state
    }
}

export default cocktailReducer

function defaultCocktails() {
    var cocktails = [
        {
            id: generate(),
            name: 'Martini',
            ingredients: [
                {
                    id: generate(),
                    ingredient_name: 'Gin',
                    parts: 2.5
                },
                {
                    id: generate(),
                    ingredient_name: 'Dry Vermouth',
                    parts: .5
                },
            ],
            directions: 'Stir gin and dry vermouth with ice for 30 seconds.  Garnish with an olive.'
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
            ],
            directions: 'Stir gin with ice in a rocks glass.  Add tonic.  Garnish with a wedge of lime.'
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
            ],
            directions: 'Stir gin, sweet vermouth, and campari with ice for 30 seconds.  Strain into a coupe glass.'
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
                    parts: 'float'
                },
            ],
            directions: 'Shake rye, lemon juice, and simple syrup with ice for 15 seconds.  Strain into a rocks glass.  Float the red wine over the back of a barspoon.'
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
            ],
            directions: 'Stir rye, sweet vermouth, and campari with ice for 30 seconds.  Strain into a coupe glass.'
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
                    parts: 'dash'
                },
            ],
            directions: 'Stir rye, sweet vermouth, and angostura with ice for 30 seconds.  Strain into a rocks glass.  Garnish with a cherry.'
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
            ],
            directions: 'Shake gin, lime juice, green chartreuse and maraschino Liquer with ice for 15 seconds.  Strain into a chilled coupe glass.'
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
            ],
            directions: 'Shake gin, cocchi americano, lemon juice, and cointreau with ice for 15 seconds.  Strain into a chilled coupe glass.'
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
            ],
            directions: 'Shake brandy, lemon juice, and cointreau with ice for 15 seconds.  Strain into a chilled coupe glass rimmed with sugar.'
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
            ],
            directions: 'Shake gin, lemon juice, and simple syrup with ice for 15 seconds.  Strain into a champagne glass, top with Champagne.'
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
            ],
            directions: `Three measures of Gordon's, one of vodka, half a measure of Kina Lillet.  Shake it very well until it's ice-cold, then add a large slice of lemon peel.`
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
                    parts: 'dash'
                },
                {
                    id: generate(),
                    ingredient_name: `Peychaud's`,
                    parts: 'dash'
                },
                {
                    id: generate(),
                    ingredient_name: 'Absinthe',
                    parts: 'rinse'
                },
            ],
            directions: `Stir rye, brandy, angostura, and peychaud's with ice for 30 seconds.  Strain into a rocks glass rinsed with Absinthe.`
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
            ],
            directions: 'Stir rye, sweet vermouth, brandy, and benedictine with ice for 30 seconds.  Strain into a rocks glass.  Garnish with a cherry.'
        },
    ]

    // testing
    // for(var i = 0; i < 20; i++){
    //     cocktails.push({
    //         name: String(i),
    //         id: generate(),
    //         ingredients: [
    //             {
    //                 id: generate(),
    //                 ingredient_name: 'Test',
    //                 parts: 1
    //             }
    //         ]
    //     })
    // }

    return cocktails
}