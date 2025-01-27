
const create_row = function() {
    return document.createElement('tr');
}

const create_cell = function(cell_type, cell_content) {
    const cell = document.createElement(cell_type);
    cell.textContent = cell_content;
    return cell
}


const table_headers_names = [
    'Time',
    'Temp',
    'Summary',
    'Wind',
    'Wind dir',
    'Precip'
]



// What to show on the page
const API_names = [
    'datetime',
    'temp',
    'conditions',
    'windspeed',
    'winddir',
    'precip'
]







const build_table = function(data, userDefaults) {


    const table = document.createElement('table')
    table.classList = 'weather_table'


    const table_header = document.createElement('tr')

    // Add header cells to table header row
    table_headers_names.forEach(element => {
        const temp_cell = create_cell('th', element);
        
        table_header.appendChild(temp_cell)
    }); 

    // Add table header to table object
    table.appendChild(table_header);

    // Display weather data
    // Accepts hours array
    
    data.forEach(element => {
        // get user defaults 
        //const user_defaults = userPreferences.get_user_default()


        const temp_row = create_row()
        temp_row.classList = 'weather_row'
        API_names.forEach(name => {
            // Handle defaults
            if (name == 'windspeed') {
                const default_wind = userDefaults['wind']
                const data = element[default_wind]
                const temp_cell = create_cell('td', data)
                temp_cell.classList = name
                temp_row.appendChild(temp_cell)
            } else if (name == 'temp') {
                const default_temp = userDefaults['temp']
                const data = element[default_temp]
                const temp_cell = create_cell('td', data)
                temp_cell.classList = name
                temp_row.appendChild(temp_cell)
            } else {
                const data = element[name]
                const temp_cell = create_cell('td', data)
                temp_cell.classList = name
                temp_row.appendChild(temp_cell)
            }


            
        })
        table.appendChild(temp_row)
    })



    return table

};


export default build_table