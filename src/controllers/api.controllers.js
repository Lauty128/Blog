//--------- Utils
function optimizedtUrl(url){
    let urlArray = url.split("/upload")
    // divides the url into two parts
    return urlArray[0] + "/upload/f_auto,q_auto" + urlArray[1]
    // returns the converted url. This url
}

//--------- Dependencies
const Article = require("../db/mongoose")
const cloudinary = require("../config/cloudinary")

//--------- Controllers
const allData =async(req,res)=>{
    const articles =await Article.getAllData()
    res.json(articles)
}

const allOrderData = async(req,res)=>{
    const articles =await Article.getAllOrderData()
    res.json(articles)
}

const oneData =async(req,res)=>{
    const articles =await Article.getOneData(req.params.id)
    res.json(articles)
}

const submitData = async(req,res)=>{
    cloudinary.v2.uploader.upload(req.file.path,{ folder:"Blog" }) //(image addres, folder "Blog")
         .then(async(result)=>{
             // adds the image to cloudinary folder
             await Article.addData(req.body, optimizedtUrl(result.secure_url))
             //  adds the article data to the database
             res.redirect('/dashboard')
             // back to
         })
         .catch(err=> res.status(404).json({ msg:"Ocurrio un error, porfavor vuelve a intentarlo mas tarde" }))
}

const newVisualization = (req,res)=>{
    Article.newVisualization(req.body.id)
    res.status(200).send("Articulo actualizado")
    // this response is not important
}

const removeData = async(req,res)=>{
    try{
        const response = await Article.removeData(req.params.id)

        res.json(response)
    }
    catch(err){
        res.status(500).json({ data: "Ocurrio un error y no se pudo eliminar el Articulo", status:500 })
    }
}




module.exports = { 
    allData,  
    allOrderData,
    oneData,
    submitData,
    newVisualization,
    removeData
}