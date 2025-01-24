const remove_old_hours = (rows, currentHour) => {

    rows.forEach(row => {
        const row_hour= Number(row.querySelector('.datetime').innerHTML.split(':')[0])

        if (row_hour < currentHour) {
            row.classList.add('hidden')
        }
   
    })
}


export default remove_old_hours