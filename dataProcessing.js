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


const tempToC = (data) => {
    return Math.round((data - 23) / (9/5))
}

const windToMPH = (data) => {
    return Math.round(data * 0.6213711922)
}


function filter_array(input_array) {
    const output_array = input_array.map(item => {
        const filtered = {};
        to_show.forEach(key => {
            if (key == 'temp') {
                filtered[key+"_F"] = Math.round(item[key])
                filtered[key+"_C"] = tempToC(item[key])
            } if (key == 'windspeed') {
                filtered[key+"_kph"] = Math.round(item[key])
                filtered[key+"_mph"] = windToMPH(item[key])
            }
                else if (key in item) {
                filtered[key] = item[key]
            }
        });
        return filtered;
    })
    return output_array
}


function capatalise(word) {
    const firstletter = word.charAt(0).toUpperCase()
    return firstletter + word.slice(1) 
}

export {filter_array, capatalise}