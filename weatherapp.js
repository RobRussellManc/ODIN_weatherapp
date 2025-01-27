import build_table from "./build_weather_table.js";
import build_weather_flexbox from "./build_weather_flexbox.js";
import remove_old_hours from "./remove_past_hours.js";
import {filter_array, capatalise} from "./dataProcessing.js";

// Things my weather app will show





// Connect to API
const api_key = 'C9BGJFM8DMJWTTAP7EFWRD384'
const api_url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const default_api_location = 'manchester'


function get_data(location) {
    const full_API = `${api_url}${location}?key=${api_key}`
    //console.log(full_API)
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
                 
                // Remove the failed search warning if it's displaying
                search_result(true)
                
                console.log(response)
                const currentConditions= response.currentConditions

                // Display the weather data 
                display_data(response)
            }
        })
        .catch(function(error) {
            search_result()
        })
};



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


const weather_tables_div = document.querySelector('.weather_tables')


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



const display_data = (data) => {

    // Update current conditions box
    displayCurrentConditions(data)
    // Display the location at top of page
    display_location(data.resolvedAddress)
    // Clear existing weather data 
    document.querySelector('.weather_tables').innerHTML = '';


    const seven_days = data.days.slice(0,7);

    const seven_days_hours = seven_days.reduce((acc, { datetime, hours }) => {
        acc[datetime] = filter_array(hours); // Add the key-value pair to the accumulator
        return acc;            // Return the updated accumulator
    }, {});

    

    // Loop over each day
    // Use a counter to help display Today, Tomorrow and/or dates
    let count = 0;
    for (const day in seven_days_hours) {
        const days_weather = seven_days_hours[day]
        console.log(days_weather)
        console.log(count)
        if (count == 0) {
            console.log('00')
            const temp_box = build_weather_flexbox(`Today (${day})`, days_weather)
            const table_rows = temp_box.querySelector('.day_content').querySelector('.weather_table').querySelectorAll('.weather_row')
            remove_old_hours(table_rows, data.currentConditions.datetime.split(':')[0])
            weather_tables_div.appendChild(temp_box)
            
        } else if (count == 1) {
            console.log('11')
            const temp_box = build_weather_flexbox(`Tomorrow (${day})`, days_weather)
            weather_tables_div.appendChild(temp_box)

        } else {
            const temp_box = build_weather_flexbox(day, days_weather)
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



