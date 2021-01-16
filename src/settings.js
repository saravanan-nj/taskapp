let Settings = {}

if (process.env.NODE_ENV == 'development') {
    Settings.HOME_PATH = '/'
} else {
    Settings.HOME_PATH = '/taskapp/'
}
export {
    Settings
}
