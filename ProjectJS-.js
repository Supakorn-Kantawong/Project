var output = document.getElementById('output')
var inputsearch = document.getElementById('search')

var outputShowMyList = document.getElementById('outputlist')

var SearchBox = document.getElementById('Search')
var Mylist = document.getElementById('Mylist')
var detailbox = document.getElementById('detail')
var home = document.getElementById('HOME')
var sild = document.getElementById('sild')
var Footer = document.getElementById('footer')


function Onload()
{
    detailbox.style.display = 'none'
    Mylist.style.display = 'block'
}

document.getElementById('MyANIME').addEventListener('click', ()=>{
    SearchBox.style.display = 'none'
    Mylist.style.display = 'block'
    sild.style.display = 'none'
    
})

document.getElementById('HOME').addEventListener('click', ()=>{
    detailbox.style.display = 'none'
    Mylist.style.display = 'none'
    sild.style.display = 'block'
})

inputsearch.addEventListener('click',()=>{
    detailbox.style.display = 'none'
    SearchBox.style.display ='block'
    sild.style.display = 'none'
    Mylist.style.display='none'
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
        adddom(anime)
    }
}
function adddom(movie)
{

    let card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('style','width: 18rem;')
    let img = document.createElement('img')
    img.classList.add('card-img-top')
    img.setAttribute('src',movie.image_url)
    img.setAttribute('style','padding-top: 10px;')
    let cardbody = document.createElement('div')
    cardbody.classList.add('card-body')
    let h4 = document.createElement('h4')
    h4.classList.add('card-title')
    h4.innerHTML = `${movie.title}`
    let p = document.createElement('p')
    p.classList.add('card-text')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-outline-warning')
    button.setAttribute('type','submit')
    button.setAttribute('id','add')
    button.innerText ='เพิ่มในรายการที่ชอบ'

    button.addEventListener('click', function () {

        let cox = confirm(` คุณต้องการจะเพิ่ม Anime ${movie.title} หรือไม่?`)
        if (cox == true) {
            A = {id,movie}
            console.log(A)
            addTodb(A)

        } else {

        }
    })


    card.appendChild(img)
    card.appendChild(cardbody)
    cardbody.appendChild(h4)
    cardbody.appendChild(p)
    cardbody.appendChild(button)

    output.appendChild(card)
}

function addTodb(anime) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(anime)
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        console.log(data)
        ShowMyAnime(data)
    })
}

function ShowMyAnime(animelist) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110353`)
        .then((response) => {
            return response.json()
        }).then(data => {
            loopData(data)
        })
}

function loopData(animeList) {
    document.getElementById('outputlist').innerHTML = ''
    for (anime of animeList) {
        Mydom(anime)

    }
}

function detail(anime) {

    let image = document.getElementById('image')

    image.setAttribute('src', anime.image_url)

    let t = document.getElementById('title')

    t.innerText = anime.title

    let sy = document.getElementById('sysnopis')

    sy.innerText = (` Synopsis : ${anime.synopsis}`)

    let Ty = document.getElementById('T')

    Ty.innerText = (` Type : ${anime.type}`)

    let P = document.getElementById('E')

    P.innerText = (` episodes : ${anime.episodes}`)

    let S = document.getElementById('S')

    S.innerText = (`Score : ${anime.score}`)

    let R = document.getElementById('R')

    R.innerText = (` Rated : ${anime.rated}`)

    let btclose = document.getElementById('close')
    btclose.setAttribute('type','button')
    btclose.classList.add('btn')
    btclose.classList.add('btn-danger')
    btclose.innerHTML = 'ปิด'
    btclose.addEventListener('click', function(){
        detail(anime)
        detailbox.style.display = 'none'
    })
}

function Mydom(anime)
{

    let card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('style','width: 18rem;')
    let img = document.createElement('img')
    img.classList.add('card-img-top')
    img.setAttribute('src',anime.image_url)
    img.setAttribute('style','padding-top: 10px;')
    let cardbody = document.createElement('div')
    cardbody.classList.add('card-body')
    let h4 = document.createElement('h4')
    h4.classList.add('card-title')
    h4.innerHTML = `${anime.title}`
    let p = document.createElement('p')
    p.classList.add('card-text')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-success')
    button.innerHTML = 'รายละเอียด'
    button.setAttribute('type','submit')
    button.addEventListener('click' ,function(){
        detail(anime)
        detailbox.style.display = 'block'

    })


    let btdelete = document.createElement('button')
    btdelete.setAttribute('type', 'button')
    btdelete.setAttribute('id', 'Delete')
    btdelete.innerText = 'ลบออก'
    btdelete.classList.add('btn')
    btdelete.classList.add('btn-danger')
    btdelete.classList.add('mx-1')
    btdelete.addEventListener('click', function () {
        let con = confirm(`คุณต้องการลบ  ${anime.title} หรือไม่? `)
        if (con == true) {
            Delete(anime.id)
            detailbox.style.display = 'none'
        } else {

        }

    })

    

    card.appendChild(img)
    card.appendChild(cardbody)
    cardbody.appendChild(h4)
    cardbody.appendChild(p)
    cardbody.appendChild(button)
    cardbody.appendChild(btdelete)

    outputShowMyList.appendChild(card)

}

var id = 632110353
function Delete(id) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110353&&movieId=${id}`, {
        method: 'DELETE'
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`Anime ${data.title} ถูกลบสำเสร็จแล้ว `)
        ShowMyAnime()

    }).catch(() => {
        alert('erorr ไอ้หมา')

    })
}
