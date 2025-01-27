const userPreferences = (() => {
    // Store what the current user preferences are 
    const user_defaults = {
    'temp' : 'temp_C',
    'wind': 'windspeed_mph'
    }

    const get_user_default = () => {
        return user_defaults
    }

    const C_to_F = () => {
        user_defaults.temp = 'temp_F'
    }

    const F_to_C = () => {
        user_defaults.temp = 'temp_C'
    }

    return {get_user_default, C_to_F, F_to_C}
})();







export {userPreferences}