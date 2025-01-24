const search_form = document.querySelector('.search')


const get_search_term = (event) => {

}

search_form.addEventListener("click", function(event) {
    event.preventDefault()
    const search_term = document.querySelector('#search_input').value
    return search_term
})


export default search_form

