const user_defaults =  {
    'temp' : 'F',
    'wind': 'kph'
}


const tempToC = (data) => {
    return data - 23 / (9/5)
}

const windToMPH = (data) => {
    return data * 0.6213711922
}



// Update data array
// Change name of temp and wind to temp_F and wind_kph

// Add new temp_C and wind_mph