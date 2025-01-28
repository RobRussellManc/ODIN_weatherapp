const updateButtonColour = () => {
    const userDefaults = userPreferences.get_user_default()

    const mph = document.querySelector('#wind_mph');
    const kph = document.querySelector('#wind_kph');
    const temp_c_button = document.querySelector('#temp_C');
    const temp_f_button = document.querySelector('#temp_F');

    
    for (const key in userDefaults) {
        if (userDefaults[key] == 'temp_C') {
            temp_c_button.classList.add('button_active')
            temp_f_button.classList.remove('button_active')
        } else if (userDefaults[key] == 'temp_F') {
            temp_f_button.classList.add('button_active')
            temp_c_button.classList.remove('button_active')
        }

        if (userDefaults[key] == 'windspeed_mph') {
            mph.classList.add('button_active')
            kph.classList.remove('button_active')
        } else if (userDefaults[key] == 'windspeed_kph') {
            kph.classList.add('button_active')
            mph.classList.remove('button_active')
        }
    }


}


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

    const mph_to_kph = () => {
        user_defaults.wind = 'windspeed_kph'
    }

    const kph_to_mph = () => {
        user_defaults.wind = 'windspeed_mph'
    }

    return {get_user_default, C_to_F, F_to_C, mph_to_kph, kph_to_mph}
})();







export {updateButtonColour, userPreferences}