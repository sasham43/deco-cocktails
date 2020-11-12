import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const titlePadding = 37 + 41 + 20
const footerHeight = 25
const viewHeight = windowHeight - (titlePadding + footerHeight)

const INITIAL_STATE = {
    dark_mode: false,
    dark_theme: {
        backgroundColor: '#000',
        color: '#fff',
        shadowColor: 'rgba(200, 200, 200, 1)',
        borderColor: '#444',
    },
    light_theme: {
        backgroundColor: '#fff',
        color: '#000',
        shadowColor: 'rgba(50, 50, 50, 1)',
        borderColor: '#aaa',
    },
    current_theme: {},
    default_styles: {
        viewStyles: {
            paddingTop: 10,
            paddingLeft: 40,
            paddingRight: 40,
            height: viewHeight,
            marginTop: 50, // account for menu
        },
    }
}

const uiReducer = (state = INITIAL_STATE, action) => {
    const {
        dark_mode,
        dark_theme,
        light_theme,
        current_theme,
        default_styles,
    } = state
    switch (action.type){
        case 'SET_DARK_MODE':
            const new_dark_mode = action.payload
            if (new_dark_mode) {
                new_current = dark_theme
            } else {
                new_current = light_theme
            }
            return {
                dark_mode: new_dark_mode,
                dark_theme,
                light_theme,
                current_theme: new_current,
                default_styles
            }
        default:
            var new_current = {}
            if(dark_mode){
                new_current = dark_theme
            } else {
                new_current = light_theme
            }
            const new_state = {dark_mode,dark_theme,light_theme, current_theme: new_current, default_styles}
            return new_state
    }
}


export default uiReducer