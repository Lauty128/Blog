//--------- Utils
const utils = require("./utils")

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
             await Article.addData(req.body, utils.optimizedUrl(result.secure_url))
             //  adds the article data to the database
             res.redirect('/dashboard')
             // back to
         })
         .catch(err=> 
            res.status(404)
                .json({ msg:"Ocurrio un error, porfavor vuelve a intentarlo mas tarde" }))
}

const newVisualization = (req,res)=>{
    Article.newVisualization(req.body.id)
    res.status(200)
        .send("Articulo actualizado")
    // this response is not important
}

const removeData = async(req,res)=>{
    try{
        const response = await Article.removeData(req.params.id)

        res.json(response)
    }
    catch(err){
        res.status(500)
            .json({ data: "Ocurrio un error y no se pudo eliminar el Articulo", status:500 })
    }
}

const contact = (req,res)=>{
    const emailJs = require("@emailjs/browser")

    emailJs.send('service_9uivd2t', 'template_pedbl5e', req.body, '7W6DBOmDsZB4m10Pk')
}

const authenticateLogin = async(req,res) =>{
    const { user, password } = req.body
    
    if(user == process.env.ADMIN_NAME && password == process.env.ADMIN_PASSWORD){
        return res.cookie("session", {user, password}, {expire : new Date() + 1000 * 60 * 60 })
        .redirect("/dashboard")
        //.json({ message: "Se inicio sesion correctamente" })
    }

    res.redirect("/login")
    //res.json({ message:"El usuario o la contraseña es incorrecto/a" })
}


module.exports = { 
    allData,  
    allOrderData,
    oneData,
    submitData,
    newVisualization,
    removeData,
    contact,
    authenticateLogin
}