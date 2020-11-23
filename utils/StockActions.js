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