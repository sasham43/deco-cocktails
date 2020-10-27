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