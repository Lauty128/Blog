import  { 
    loadArticlesCard,       // Nothing
    loadMostViewedCard,     // Nothing
    loadDisplayBox,         // ( id: String )
    confirmClearArticle,    // Nothing
    loadMessage             // ({ text: String, type: Boolean })
} from './loadCards.js'

//import utils from '../utils.js'

setTimeout(()=>{
    loadArticlesCard()
    loadMostViewedCard()
} , 800) // Load the cards 


//----------------- BUTTONS
async function openBox(id, box){
    if(box == "DisplayBox") await loadDisplayBox(id)
    document.querySelector(".boxContainer").style.display = "block"
    setTimeout(()=>{ document.querySelector(`.${box}`).classList.add(`${box}--active`) }, 50)
}

function closeBox(box){
    document.querySelector(`.${box}`).classList.remove(`${box}--active`)
    setTimeout(()=>{ document.querySelector(".boxContainer").style.display = "none"}, 400)
}

async function deleteArticle(id){
    const box = confirmClearArticle()
    document.querySelector(".boxContainer").appendChild(box)
    document.querySelector(".boxContainer").style.display = "block"
}

document.querySelector(".Main").addEventListener("click", async (e)=>{ //--- Open Box
    const element = e.target
    
    if(element.classList.contains("Article__viewMore")) openBox( element.getAttribute("data-id"), "DisplayBox" )

    
    if(element.getAttribute("id") == "CreateNewArticle") openBox( element.getAttribute("data-id"), "NewArticleBox" )
    
    if(element.classList.contains("Article__delete")){
        const id = element.getAttribute("data-id")
        await deleteArticle(id)

        document.querySelector(".ConfirmBox").addEventListener("click", async(i)=>{

            if(i.target.classList.contains("ConfirmBox__yes")){
                try{
                    const response = await fetch(`https://silveriiblog.up.railway.app/api/remove/${id}`,{ method:"DELETE" })
                    const message = await response.json()

                    const type = (message.status == 200) ? true : false
                    loadMessage(message.data, type)
                    loadArticlesCard()
                }
                catch(err){ console.log(err) }            
            }

            if(i.target.classList.contains("ConfirmBox__yes") || i.target.classList.contains("ConfirmBox__no")){
                document.querySelector(".boxContainer").style.display = "none"
                document.querySelector(".ConfirmBox").remove()
            }
            
        })
    }
})

document.querySelector(".boxContainer").addEventListener("click", e=>{ //--- Close Box
    const element = e.target
    
    if(element.classList.contains("DisplayBox__close")) closeBox("DisplayBox")

    if(element.classList.contains("NewArticleBox__cancelButton")){
        closeBox("NewArticleBox")
        setTimeout(()=> document.getElementById("newArticleForm").reset(), 400 )
    }
})

//------------ DISPLAY OF IMAGE SELECTED
document.getElementById("file").addEventListener("change", e=>{
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.addEventListener("load",e=>{
        const imageLabel = document.querySelector(".NewArticleBox__imgContainer img")
        imageLabel.setAttribute("src", e.target.result)

        if(!imageLabel.classList.contains("img--active")) imageLabel.classList.add("img--active")
    })

    reader.readAsDataURL(file)
})

//--------------- MESSAGE
