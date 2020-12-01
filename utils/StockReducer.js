import { combineReducers } from 'redux'
import { generate } from 'shortid'

// var default_stock = [
//     {
//         id: generate(),
//         label: 'Rye',
//         in_stock: true
//     },
//     {
//         id: generate(),
//         label: 'Gin',
//         in_stock: true
//     },
//     {
//         id: generate(),
//         label: 'Sweet Vermouth',
//         in_stock: true
//     },
//     {
//         id: generate(),
//         label: 'Rum',
//         in_stock: false
//     },
// ]
var default_stock = [
    { id: generate(), label: 'Gin', in_stock: true },
    { id: generate(), label: 'Dry Vermouth', in_stock: true },
    { id: generate(), label: 'Tonic', in_stock: true },
    { id: generate(), label: 'Sweet Vermouth', in_stock: true },
    { id: generate(), label: 'Campari', in_stock: true },
    { id: generate(), label: 'Rye', in_stock: true },
    { id: generate(), label: 'Lemon Juice', in_stock: true },
    { id: generate(), label: 'Simple Syrup', in_stock: true },
    { id: generate(), label: 'Red Wine', in_stock: true },
    { id: generate(), label: 'Angostura', in_stock: true },
    { id: generate(), label: 'Lime Juice', in_stock: true },
    { id: generate(), label: 'Green Chartreuse', in_stock: true },
    { id: generate(), label: 'Maraschino Liquer', in_stock: true },
    { id: generate(), label: 'Cocchi Americano', in_stock: true },
    { id: generate(), label: 'Cointreau', in_stock: true },
    { id: generate(), label: 'Brandy', in_stock: true },
    { id: generate(), label: 'Champagne', in_stock: true },
    { id: generate(), label: 'Vodka', in_stock: true },
    { id: generate(), label: 'Peychauds', in_stock: true },
    { id: generate(), label: 'Absinthe', in_stock: true },
    { id: generate(), label: 'Benedictine', in_stock: true }
]

const INITIAL_STATE = {
    current: [...default_stock],
    possible: []
}

const stockReducer = (state = INITIAL_STATE, action) => {
    const {
        current, 
        possible
    } = state
    switch (action.type){
        case 'ADD_STOCK':
            const new_stock = action.payload
            // current.push(new_stock)

            const newState = { 
                current: [...current, new_stock], 
                possible 
            }

            // should update AsyncStorage

            return newState
        case 'UPDATE_STOCK':
            const updated_stock = action.payload

            var new_current = current.map(c=>{
                if(c.id == updated_stock.id){
                    return updated_stock
                } else {
                    return c
                }
            })

            const updatedState = {current: new_current, possible}

            return updatedState
        case 'SELECT_STOCK':
            var select_id = action.payload

            var selected_stock = current.map(c=>{
                if(c.id == select_id){
                    c.selected = !c.selected
                }
                return c
            })

            return {current: selected_stock}
        case 'DELETE_STOCK':
            return {
                current: current.filter(c => !c.selected)
            }
        case 'UPDATE_IN_STOCK':
            return {
                current: current.map(c=>{
                    c.in_stock = c.selected
                    c.selected = false
                    return c
                })
            }
        case 'SELECT_BOTTLES_IN_STOCK':
            return {
                current: current.map(c => {
                    c.selected = c.in_stock
                    return c
                })
            }
        case 'UNSELECT_ALL':
            return {
                current: current.map(c => {
                    c.selected = false
                    return c
                })
            }
        case 'RESET':
            return INITIAL_STATE
        default:
            return state
    }
}

export default stockReducer
