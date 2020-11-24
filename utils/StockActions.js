export const addStock = new_stock => (
    {
        type: 'ADD_STOCK',
        payload: new_stock
    }
)

export const updateStock = updated_stock => (
    {
        type: 'UPDATE_STOCK',
        payload: updated_stock
    }
)

export const selectStock = select_id => (
    {
        type: 'SELECT_STOCK',
        payload: select_id
    }
)

export const deleteStock = () => (
    {
        type: 'DELETE_STOCK',
    }
)

export const updateInStock = () => (
    {
        type: 'UPDATE_IN_STOCK'
    }
)

export const selectBottlesInStock = () => (
    {
        type: 'SELECT_BOTTLES_IN_STOCK'
    }
)

export const resetDefaultStock = () => (
    {
        type: 'RESET'
    }
)