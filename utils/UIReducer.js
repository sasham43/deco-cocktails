const INITIAL_STATE = {
    dark_mode: true,
    dark_theme: {
        backgroundColor: '#000',
        color: '#fff'
    },
    light_theme: {
        backgroundColor: '#fff',
        color: '#000'
    },
    current_theme: {}
}

const uiReducer = (state = INITIAL_STATE, action) => {
    const {
        dark_mode,
        dark_theme,
        light_theme,
        current_theme
    } = state
    switch (action.type){
        default:
            var new_current = {}
            if(dark_mode){
                new_current = dark_theme
            } else {
                new_current = light_theme
            }
            const new_state = {dark_mode,dark_theme,light_theme, current_theme: new_current}
            return new_state
    }
}


export default uiReducer