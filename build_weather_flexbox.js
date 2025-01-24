import build_table from "./build_weather_table.js";

const create_div = (classname) => {
    const temp_div = document.createElement('div')
    temp_div.classList = classname
    return temp_div
}


const build_weather_flexbox = (date, data) => {
    const day_weather_box = create_div('weather_day')
    const day_header = create_div('day_header')
    const day_content = create_div('day_content')


    day_header.innerText = date;
    day_content.appendChild(build_table(data))

    day_weather_box.appendChild(day_header)
    day_weather_box.appendChild(day_content)
 
    return day_weather_box
}




export default build_weather_flexbox