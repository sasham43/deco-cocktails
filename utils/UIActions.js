export const setDarkMode = dark_mode => (
    {
        type: 'SET_DARK_MODE',
        payload: dark_mode
    }
)

export const setNewTitle = title => (
    {
        type: 'SET_MENU_TITLE',
        payload: title
    }
)