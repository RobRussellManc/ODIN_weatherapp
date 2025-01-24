import build_table from "./build_weather_table.js";
import build_weather_flexbox from "./build_weather_flexbox.js";


// Things my weather app will show

const to_show = [
    'datetime',
    'hours',
    'conditions',
    'temp',
    'winddir',
    'windspeed',
    'cloudcover',
    'pressure',
    'precip'
]

function filter_array(input_array) {
    const output_array = input_array.map(item => {
        const filtered = {};
        to_show.forEach(key => {
            if (key in item) {
                filtered[key] = item[key]
            }
        });
        return filtered;
    })
    return output_array
}

// Connect to API
const api_key = 'C9BGJFM8DMJWTTAP7EFWRD384'
const api_url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const api_location = 'manchester'


function capatalise(word) {
    const firstletter = word.charAt(0).toUpperCase()
    return firstletter + word.slice(1) 
}

const api_location_capatalised = capatalise(api_location)




const full_API = `${api_url}${api_location}?key=${api_key}`


function get_data() {
    return fetch(full_API, {mode: 'cors'})
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {

            const seven_days = response.days.slice(0,7);

            const my_data = seven_days.reduce((acc, { datetime, hours }) => {
                acc[datetime] = filter_array(hours); // Add the key-value pair to the accumulator
                return acc;            // Return the updated accumulator
            }, {});
            return my_data
        })
};


// Display location
const location_div = document.querySelector('.location')
location_div.textContent = `Current location: ${api_location_capatalised}`;


const weather_tables_div = document.querySelector('.weather_tables')


get_data().then(weather_data => {
    console.log(weather_data)

    // Loop over each day
    // Use a counter to help display Today, Tomorrow and/or dates
    let count = 0;
    for (const day in weather_data) {
        const days_weather = weather_data[day]
        console.log(days_weather)
        if (count == 0) {
            const temp_box = build_weather_flexbox(`Today (${day})`, days_weather)
            weather_tables_div.appendChild(temp_box)
            count = count + 1
        } if (count == 1) {
            const temp_box = build_weather_flexbox(`Tomorrow (${day})`, days_weather)
            weather_tables_div.appendChild(temp_box)
            count = count + 1
        } else {
            const temp_box = build_weather_flexbox(day, days_weather)
            weather_tables_div.appendChild(temp_box)
            count = count + 1
        }
        

        

    }
})



