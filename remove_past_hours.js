const remove_old_hours = (rows) => {
    const now_hours = new Date().getHours()

    rows.forEach(row => {
        const row_hour= Number(row.querySelector('.datetime').innerHTML.split(':')[0])

        if (row_hour < now_hours) {
            row.classList.add('hidden')
        }
   
    })
}


export default remove_old_hours