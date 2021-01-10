export const setDarkMode = dark_mode => (
    {
        type: 'SET_DARK_MODE',
        payload: dark_mode
    }
)

export const setTitle = title => (
    {
        type: 'SET_TITLE',
        payload: title
    }
)

export const setShareMenuMax = max => (
    {
        type: 'SET_SHARE_MENU_MAX',
        payload: max
    }
)

export const setTutorialComplete = complete => (
    {
        type: 'SET_TUTORIAL_COMPLETE',
        payload: complete
    }
)