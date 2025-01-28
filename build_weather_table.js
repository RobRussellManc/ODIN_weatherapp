
const create_row = function() {
    return document.createElement('tr');
}

const create_cell = function(cell_type, cell_content) {
    const cell = document.createElement(cell_type);
    cell.textContent = cell_content;
    return cell
}

const createWindCell = (cell_type, rotation) => {
    const cell = document.createElement(cell_type);
    cell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="black" transform=rotate(${rotation})><path d="M440-80v-647L256-544l-56-56 280-280 280 280-56 57-184-184v647h-80Z"/></svg>`;
    return cell 
}

const createTempCell = (cell_type, temp) => {
    const cell = document.createElement(cell_type);
    cell.textContent = temp;
    cell.style.backgroundColor = tempColourCell(temp)
    return cell
}

const tempColourCell = (data) => {
    if (data < 0) {
        return '#ADD8E6'
    } else if (data < 5) {
        return '#B0E0E6'
    } else if (data < 8) {
        return '#4682B4'
    } else if (data < 11) {
        return '#FFE4B5'
    } else if (data < 15) {
        return '#FFA500'
    } else if (data < 20) {
        return '#FF8C00'
    } else if (data < 25) {
        return '#FF7F50'
    } else if (data < 30) {
        return '#FF6347'
    } else {
        return '#FF4500'
    }
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
            if (name == 'datetime') {
                const data = element[name]
                const temp_cell = create_cell('td', data.slice(0,5))
                temp_cell.classList = name
                temp_row.appendChild(temp_cell)
            } else if (name == 'windspeed') {
                const default_wind = userDefaults['wind']
                const data = element[default_wind]
                const temp_cell = create_cell('td', data)
                temp_cell.classList = name
                temp_row.appendChild(temp_cell)
            } else if (name == 'temp') {
                const default_temp = userDefaults['temp']
                const data = element[default_temp]
                const temp_cell = createTempCell('td', data)
                temp_cell.classList = name
                temp_row.appendChild(temp_cell)
            } else if (name == 'winddir') {
                const data = element[name]
                const temp_cell = createWindCell('td', data)
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