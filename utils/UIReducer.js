import { Dimensions, Platform } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

// handle some sort of adaptive screens
var footerBottom = 10
// if (Platform.OS == 'android') {
//     footerBottom = 10
// } else {
//     if (windowHeight > 1000) {
//         footerBottom = 50
//     } else if (windowHeight > 700) {
//         footerBottom = 75
//     } else {
//         footerBottom = 25
//     }
// }

const INITIAL_STATE = {
    title: 'Crump Cocktails',
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
    current_theme: {
        backgroundColor: '#fff',
        color: '#000',
        shadowColor: 'rgba(50, 50, 50, 1)',
        borderColor: '#aaa',
    },
    // current_theme: {},
    border_color: '#ccc',
    share: {
        menu_max: 4
    },
    default_styles: {
        window: {
            width: windowWidth,
            height: windowHeight
        },
        viewStyles: {
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 40,
            // height: viewHeight,
            flex: 1,
            marginTop: 50, // account for menu
        },
        footerStyles: {
            width: windowWidth - 40,
            marginLeft: 20,
            alignContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            zIndex: 10,
            position: 'absolute',
            // height: 75,
            bottom: footerBottom,
        },
    },
    tutorial_complete: false
}

const uiReducer = (state = INITIAL_STATE, action) => {
    const {
        dark_mode,
        dark_theme,
        light_theme,
        current_theme,
        default_styles,
        button_borders,
        border_color,
        title,
        share,
        tutorial_complete
    } = state
    switch (action.type){
        case 'SET_DARK_MODE':
            var new_current = {}
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
                border_color: border,
                title,
                share,
                tutorial_complete
            }
        case 'SET_TITLE':
            const new_title = action.payload

            return {
                dark_mode,
                dark_theme,
                light_theme,
                current_theme,
                default_styles,
                button_borders,
                border_color,
                title: new_title,
                share,
                tutorial_complete
            }
        case 'SET_SHARE_MENU_MAX':
            const new_max = action.payload
            // console.log('setting share menu max', new_max)

            return {
                dark_mode,
                dark_theme,
                light_theme,
                current_theme,
                default_styles,
                button_borders,
                border_color,
                title,
                share: {
                    menu_max: new_max
                },
                tutorial_complete
            }
        case 'SET_TUTORIAL_COMPLETE':
            const complete = action.payload

            console.log('setting complete', complete, action)

            return {
                dark_mode,
                dark_theme,
                light_theme,
                current_theme,
                default_styles,
                button_borders,
                border_color,
                title,
                share,
                tutorial_complete: complete
            }
        default:
            return state
    }
}


export default uiReducer