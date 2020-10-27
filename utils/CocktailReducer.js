var default_cocktails = []


const INITIAL_STATE = {
    cocktails: [...default_cocktails]
}

const cocktailReducer = (state = INITIAL_STATE, action) => {
    
    switch (action.type){
        default:
            return state
    }
}

export default cocktailReducer