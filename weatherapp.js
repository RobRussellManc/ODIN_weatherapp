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
const api_url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/manchester?key='

const full_API = `${api_url}${api_key}`


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


const weather_tables_div = document.querySelector('.weather_tables')


get_data().then(weather_data => {
    console.log(weather_data)

    for (const day in weather_data) {
        const days_weather = weather_data[day]
        console.log(days_weather)
        const temp_box = build_weather_flexbox(day, days_weather)

        weather_tables_div.appendChild(temp_box)

    }
})



