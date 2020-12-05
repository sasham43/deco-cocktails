import { Dimensions, Platform, StatusBar } from 'react-native'
// import * as Device from 'expo-device'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const screen = Dimensions.get('screen')

// const windowWidth = useWindowDimensions().width;
// const windowHeight = useWindowDimensions().height;

// handle some sort of adaptive screens
var footerBottom


// const statusBarHeight = statusBar.currentHeight ? statusBar.currentHeight : 0
const titlePadding = 37 + 41 + 20
const footerHeight = 25
var viewHeight = windowHeight - (titlePadding + footerHeight)
const statusBarHeight = StatusBar.currentHeight ? (StatusBar.currentHeight) : 0
// const androidFooterHeight = (screen.height - (windowHeight + statusBarHeight))
// console.log('wh', Dimensions.get('window'), footerBottom)
// console.log('screen', screen, screen.height, windowHeight, statusBarHeight)
// console.log('diff', statusBarHeight, androidFooterHeight)
// console.log('info', Device.getPlatformFeaturesAsync())
// console.log('other', Dimensions.get('status bar'))
// Device.getPlatformFeaturesAsync().then(resp=>console.log('info', resp))
console.log('viewheight', screen.height, viewHeight, windowHeight)
if (Platform.OS == 'android') {
    // footerBottom = 50
    // footerBottom = statusBarHeight
    viewHeight = viewHeight - statusBarHeight
    footerBottom = 10
} else {
    if (windowHeight > 1000) {
        footerBottom = 50
    } else if (windowHeight > 700) {
        footerBottom = 75
    } else {
        footerBottom = 25
    }
}

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
        border_color,
        title
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
                title
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
                title: new_title
            }
        default:
            return state
    }
}


export default uiReducer