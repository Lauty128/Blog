import utils from "../utils.js"

const url = 'https://silveriiblog.up.railway.app/'

async function loadArticlesCard(){ // Auto-run Function
    const dataFetch = await fetch('https://silveriiblog.up.railway.app/api/all')
    const data = await dataFetch.json()

    const fragment = document.createDocumentFragment()    

    for (let i = 0; i < 5; i++) {
        
        const article = document.createElement("div")
        const img = document.createElement("img")
        const div = document.createElement("div")
        const h3 = document.createElement("h3")
        const date = document.createElement("span")
        const category = document.createElement("span")
        const icons = document.createElement("div")

        article.classList.add("Article")
        img.classList.add("Article__img")
        h3.classList.add("Article__h3")
        div.classList.add("Article__text")
        date.classList.add("Article__date")
        category.classList.add("Article__category") 
        icons.classList.add("Article__icons")
        
        img.setAttribute("src", data[i].image)
        img.setAttribute("alt", data[i].alt)
        h3.textContent = data[i].title
        const articleDate = new Date(data[i].createdAt)
        date.textContent = articleDate.toLocaleDateString('es-es', { year: 'numeric', month: 'short', day: 'numeric' })
        category.innerHTML = `<a href="/articles/${data[i].category}">${data[i].category}</a>` 
        icons.innerHTML = `
                 <button data-id="${data[i]._id}" class="Article__delete">
                     <i class="fa-solid fa-trash"></i>
                 </button>
                 <button data-id="${data[i]._id}" class="Article__viewMore">
                    <i class="fa-solid fa-magnifying-glass"></i>
                 </button>
         `

        div.append(date,category,h3,icons)
        article.append(img, div)
        fragment.appendChild(article)

    }

    document.querySelector(".ArticlesCard").innerHTML = "" 
    document.querySelector(".ArticlesCard").appendChild(fragment)
}

async function loadMostViewedCard(){
    const dataFetch = await fetch('https://silveriiblog.up.railway.app/api/all/order')
    const data = await dataFetch.json()

    const fragment = document.createDocumentFragment()    

    for (let i = 0; i < 3; i++) {
        
        const article = document.createElement("div")
        const img = document.createElement("img")
        const div = document.createElement("div")
        const h3 = document.createElement("h3")
        const date = document.createElement("span")
        const views = document.createElement("span")
        const icons = document.createElement("div")

        article.classList.add("Article")
        img.classList.add("Article__img")
        h3.classList.add("Article__h3")
        div.classList.add("Article__text")
        views.classList.add("Article__views") 
        icons.classList.add("Article__icons")
        
        img.setAttribute("src", data[i].image)
        img.setAttribute("alt", data[i].alt)
        h3.textContent = data[i].title
        const articleDate = new Date(data[i].createdAt)
        date.textContent = articleDate.toLocaleDateString('es-es', { year: 'numeric', month: 'short', day: 'numeric' })
        views.textContent = data[i].views
        icons.innerHTML = `
            <button data-id="${data[i]._id}" class="Article__viewMore">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        `

        div.append(views,h3, icons)
        article.append(img, div)
        fragment.appendChild(article)

    }

    document.querySelector(".MostViewedCard").innerHTML = ""
    document.querySelector(".MostViewedCard").appendChild(fragment)
}

async function loadDisplayBox(id){
    fetch(`https://silveriiblog.up.railway.app/api/${id}`)
        .then(response => response.json())
        .then(data =>{

            const articleDate = new Date(data.createdAt)
            document.querySelector(".DisplayBox__date").textContent = articleDate.toLocaleDateString('es-es', { year: 'numeric', month: 'short', day: 'numeric' })
            document.querySelector(".DisplayBox__img").setAttribute("src", data.image)
            document.querySelector(".DisplayBox__img").setAttribute("alt", data.alt)
            document.querySelector(".DisplayBox__title").textContent = data.title
            document.querySelector(".DisplayBox__views").textContent = `${data.views} views`
            document.querySelector(".DisplayBox__category").innerHTML = `Category: <b>${data.category}</b>`
            document.querySelector(".DisplayBox__imageOwner").innerHTML = 
            `Image owner: <a href="${data.imageContribution}">@${utils.get_imageOwner(data.imageContribution)}</a>`
            document.querySelector(".DisplayBox__createdBy").innerHTML = `Created By <b>${data.createdBy}</b>`
            document.querySelector(".DisplayBox__content").innerHTML = data.content

        })    
        .catch(err=>{
            console.log(err)
            document.querySelector(".DisplayBox__title").textContent = "ERROR"
        })
}

function confirmClearArticle(){
    const box = document.createElement("div")
    const div = document.createElement("div")
    const p = document.createElement("p")
    const yes = document.createElement("button")
    const no = document.createElement("button")

    box.classList.add("ConfirmBox")
    box.classList.add("boxContainer__box")
    div.classList.add("ConfirmBox__buttons")
    p.classList.add("ConfirmBox__p")
    yes.classList.add("ConfirmBox__yes")
    no.classList.add("ConfirmBox__no")

    yes.textContent = "YES!"
    no.textContent = "NO"
    p.textContent = "Are you sure to delete the article?"

    div.append(yes,no)
    box.append(p, div)

    return box
}

function loadMessage(text, type){
    const Message = document.querySelector(".Message")
    Message.firstElementChild.textContent = text
    if(!type) Message.classList.add("Message--error")
    Message.classList.add("Message--active")
    setTimeout(
        ()=> Message.classList.remove("Message--active"),
        3000
    )
}

export {
    loadArticlesCard,
    loadMostViewedCard,
    loadDisplayBox,
    confirmClearArticle,
    loadMessage
}


