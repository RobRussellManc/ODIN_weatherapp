console.log('hi')


// Things my weather app will show

const to_show = [
    'datetime',
    'hours',
    'temp',
    'windir',
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
const api_url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key='

const full_API = `${api_url}${api_key}`
//console.log(full_API)

fetch(full_API, {mode: 'cors'})
.then(function(response) {
    return response.json()
})
.then(function(response) {
    console.log(response)
    const seven_days = response.days.slice(0,7);
    console.log(seven_days)
    const extracted_info = filter_array(seven_days)
    console.log(extracted_info)
} )


