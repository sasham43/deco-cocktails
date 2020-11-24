import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

console.log('ui reducer', windowHeight)
// handle some sort of adaptive screens
var footerBottom
if(windowHeight < 700){
    footerBottom = -100
} else {
    footerBottom = -50
}

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
    button_borders: {
        dark_border: '#333',
        light_border: '#ccc'
    },
    current_theme: {},
    border_color: '',
    default_styles: {
        viewStyles: {
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 40,
            height: viewHeight,
            marginTop: 50, // account for menu
        },
        footerStyles: {
            width: windowWidth - 40,
            marginLeft: 20,
            alignContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            zIndex: 10,
            height: 200,
            position: 'absolute',
            bottom: footerBottom,
            // bottom: -60,
            // bottom: 100
            // bottom: 10,
            // bottom: -100
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
        button_borders,
    } = state
    switch (action.type){
        case 'SET_DARK_MODE':
            const new_dark_mode = action.payload
            var border
            if (new_dark_mode) {
                new_current = dark_theme
                border = button_borders.dark_border
            } else {
                new_current = light_theme
                border = button_borders.light_border
            }
            return {
                dark_mode: new_dark_mode,
                dark_theme,
                light_theme,
                current_theme: new_current,
                default_styles,
                button_borders,
                border_color: border
            }
        default:
            var new_current = {}
            if(dark_mode){
                new_current = dark_theme
                border = button_borders.dark_border
            } else {
                new_current = light_theme
                border = button_borders.light_border
            }
            const new_state = {
                dark_mode, 
                dark_theme, 
                light_theme, 
                current_theme: new_current, 
                default_styles,
                button_borders,
                border_color: border}
            return new_state
    }
}


export default uiReducer