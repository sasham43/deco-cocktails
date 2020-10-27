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

const stockReducer = (state = INITIAL_STATE, action) => {
    const {
        current, 
        possible
    } = state
    switch (action.type){
        case 'ADD_STOCK':
            const new_stock = action.payload
            current.push(new_stock)

            const newState = { current, possible }

            // should update AsyncStorage

            return newState
        case 'UPDATE_STOCK':
            // const {
            //     current,
            //     possible
            // } = state
            const updated_stock = action.payload

            var new_current = current.map(c=>{
                if(c.id == updated_stock.id){
                    return updated_stock
                } else {
                    return c
                }
            })

            console.log('????',updated_stock,  new_current)

            const updatedState = {current: new_current, possible}

            return updatedState
        default:
            return state
    }
}

export default combineReducers({
    stock: stockReducer
})