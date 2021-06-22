var output = document.getElementById('output')
var inputsearch = document.getElementById('search')
inputsearch.addEventListener('click',()=>{
    let inputbarsearch = document.getElementById('barsearch').value
    fetch(`https://api.jikan.moe/v3/search/anime?q=${inputbarsearch}`).then(response => {
        return response.json()
    }).then(newresponse => {
        showanime(newresponse.results)
    })
})
function showanime(getnewresponse){
    document.getElementById('output').innerHTML = ''
    for (anime of getnewresponse)
    {
        console.log(anime)
        adddom(anime)
    }
}
function adddom(anime)
{

    let card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('style','width: 18rem;')
    let img = document.createElement('img')
    img.classList.add('card-img-top')
    img.setAttribute('src',anime.image_url)
    let cardbody = document.createElement('div')
    cardbody.classList.add('card-body')
    let h4 = document.createElement('h4')
    h4.classList.add('card-title')
    h4.innerHTML = `${anime.title}`
    let p = document.createElement('p')
    p.classList.add('card-text')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.setAttribute('type','submit')

    card.appendChild(img)
    card.appendChild(cardbody)
    cardbody.appendChild(h4)
    cardbody.appendChild(p)
    cardbody.appendChild(button)

    output.appendChild(card)
}
