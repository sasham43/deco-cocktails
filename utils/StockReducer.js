import { combineReducers } from 'redux'
import { generate } from 'shortid'

var default_stock = [
    {
        id: generate(),
        label: 'Rye',
        in_stock: true
    },
    {
        id: generate(),
        label: 'Gin',
        in_stock: true
    },
    {
        id: generate(),
        label: 'Sweet Vermouth',
        in_stock: true
    },
    {
        id: generate(),
        label: 'Rum',
        in_stock: false
    },
]

const INITIAL_STATE = {
    current: [...default_stock],
    possible: []
}

const stockReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case 'ADD_STOCK':
            const {
                current, 
                possible
            } = state
            const new_stock = action.payload
            current.push(new_stock)

            const newState = { current, possible }

            console.log('adding stock in reducer')

            return newState
        default:
            return state
    }
}

export default combineReducers({
    stock: stockReducer
})