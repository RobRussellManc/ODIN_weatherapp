import build_table from "./build_weather_table.js";
import build_weather_flexbox from "./build_weather_flexbox.js";
import remove_old_hours from "./remove_past_hours.js";
import {filter_array, capatalise} from "./dataProcessing.js";
import {updateButtonColour, userPreferences} from "./userPreferences.js";

// Connect to API
const api_key = 'C9BGJFM8DMJWTTAP7EFWRD384'
const api_url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const default_api_location = 'manchester'

// Declare global variable to store data 
let myData;


// Get data using async/await function
async function get_data(location) {
    const full_API = `${api_url}${location}?key=${api_key}`

    try  {
        const response = await fetch(full_API, {mode: 'cors'})
        const weatherData = await response.json()
        if (!response) {
            search_result(false)
        } else {
            display_data(weatherData)
            switchPreferences(weatherData)
        }
    } catch(error) {
        search_result(false)
    }

}

/*
function get_data(location) {
    const full_API = `${api_url}${location}?key=${api_key}`

    return fetch(full_API, {mode: 'cors'})
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {

            //if not result was found/search failed
            if (!response) {
                search_result(false)
                return null
            } else {
                // Display the weather data 
                display_data(response)

                // Initiate the switch preferences using the data 
                switchPreferences(response)

            }
        })
        .catch(function(error) {
            search_result(false)
        })
};

*/


// Handle failed search
const search_result = (success) => {
    const failed_search_div = document.querySelector('.failed_search')
    if (!success) {
        failed_search_div.textContent = 'Search failed'
    } else {
        failed_search_div.textContent = ''
    }

}

// Display location at top of page
const display_location = (search_term) => {
    const api_location_capatalised = capatalise(search_term)
    const location_div = document.querySelector('.location')
    location_div.textContent = `Current location: ${api_location_capatalised}`;    
}


// Load default location upon page load 
get_data('Manchester')



const displayCurrentConditions = (data) => {
    const currentInfoDiv = document.querySelector('.current_time');
    const currentSunRiseDiv = document.querySelector('.sunset')

    const currentCondition = data.currentConditions.conditions
    const sunrise = data.currentConditions.sunrise.slice(0, 5)
    const sunset = data.currentConditions.sunset.slice(0, 5)

    currentInfoDiv.textContent = `Current conditions: ${currentCondition}`
    currentSunRiseDiv.textContent = `Sunrise: ${sunrise}      Sunset: ${sunset}`
}


const extractSevenDays = (data) => {
    const seven_days = data.days.slice(0,7);

    const seven_days_hours = seven_days.reduce((acc, { datetime, hours }) => {
        acc[datetime] = filter_array(hours); // Add the key-value pair to the accumulator
        return acc;            // Return the updated accumulator
    }, {});

    return seven_days_hours
};


const display_data = (data) => {

    console.log(data)
    // Select the container to insert weather info into
    const weather_tables_div = document.querySelector('.weather_tables')

    // Get the current user display defaults 
    const userDefaults = userPreferences.get_user_default()    

    // Display the location at top of page
    display_location(data.resolvedAddress)

    // Update current conditions box
    displayCurrentConditions(data)

    // Remove the failed search warning if it's displaying
    search_result(true)

    // Clear existing weather data 
    document.querySelector('.weather_tables').innerHTML = '';

    // Extract the 7 days info from the data object
    const seven_days_hours = extractSevenDays(data);

    console.log(seven_days_hours)

    // Loop over each day
    // Use a counter to help display Today, Tomorrow and/or dates
    let count = 0;
    for (const day in seven_days_hours) {
        const days_weather = seven_days_hours[day]
        if (count == 0) {
            const temp_box = build_weather_flexbox(`Today (${day})`, days_weather, userDefaults)
            const table_rows = temp_box.querySelector('.day_content').querySelector('.weather_table').querySelectorAll('.weather_row')
            remove_old_hours(table_rows, data.currentConditions.datetime.split(':')[0])
            weather_tables_div.appendChild(temp_box)
            
        } else if (count == 1) {
            const temp_box = build_weather_flexbox(`Tomorrow (${day})`, days_weather, userDefaults)
            weather_tables_div.appendChild(temp_box)

        } else {
            const temp_box = build_weather_flexbox(day, days_weather, userDefaults)
            weather_tables_div.appendChild(temp_box)

        }  
        count = count + 1
    }
}



// Search bar stuff
const search_button = document.querySelector('#search_submit')

search_button.addEventListener("click", function(event) {
    event.preventDefault()

    const search_input = document.querySelector('#search_input')
    const search_term = search_input.value
    get_data(search_term)
    document.querySelector('#search_input').value = '';

    return search_term
})



const switchPreferences = function (data) {
    const tempPref = document.querySelectorAll('.tempPref');
    const windPref = document.querySelectorAll('.windPref');

    updateButtonColour()
    
    // Add temp listeners 
    tempPref.forEach(button => {
        button.addEventListener("click", (event) => {
            if (button.id == 'temp_C') {
                userPreferences.F_to_C()
                //console.log('C')
    
            } else {
                userPreferences.C_to_F()
                //console.log('F')
            }
            console.log(data)
            display_data(data)
            updateButtonColour()
        })
    })

    // Add wind listeners 
    windPref.forEach(button => {
        button.addEventListener("click", (event) => {
            if (button.id == 'wind_mph') {
                userPreferences.kph_to_mph()
    
            } else {
                userPreferences.mph_to_kph()
            }
            console.log(data)
            display_data(data)
            updateButtonColour()
        })
    })
};

