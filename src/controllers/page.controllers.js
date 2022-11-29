//------------------ Dependencies
const fetch = require("node-fetch")


const Home =async(req,res)=>{
     fetch(`${process.env.HOST}/api/all`)
        // obtains all the articles
        .then(data=> data.json())
        .then(response=> {
            const sliceArray = array=> array.slice(0,6)
            // this limits the array to the 6 objects

            res.render("Home", { data:sliceArray(response) })
            // render "Article" with the articles obtained
         })
}

const Article = async(req,res)=>{
    fetch(`${process.env.HOST}/api/${req.params.id}`)
        // <fetch> to "...../api/:id" that returns one article 
        .then(data=> data.json())
        .then(response=> {
            response.createdAt = new Date(response.createdAt).toLocaleDateString('es-es', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
            // transforms date for the front-end

            fetch(`${process.env.HOST}/api/view`, {
                headers: {'Content-Type': 'application/json'},
                method:"POST",
                body:JSON.stringify({ id : req.params.id })
            })
            // if all is well, <fetch> to "...../api/view" to sum one to the article "views"   

            res.render("Article", { data:response })
            // render "Article" with the article obtained
        })
}

const Contact =  (req,res)=>{
    res.render("Contact")
}

const AboutMe = (req,res)=>{
    res.render("AboutMe")
}

const Login = (req,res)=>{
    res.render("login")
}

const Dashboard = async(req,res)=>{
    let Articles = await fetch(`${process.env.HOST}/api/all`)
    Articles = await Articles.json()

    let articlesViews = 0 
    Articles.forEach(article => articlesViews+= article.views);

    res.render("Dashboard", { 
        Data:Articles,
        Views:articlesViews
    })
}

const authenticateLogin = async(req,res) =>{
    const { user, password } = req.body
    
    if(user == process.env.ADMIN_NAME && password == process.env.ADMIN_PASSWORD){
        return res.cookie("session", {user, password}, {expire : new Date() + 1000 * 60 * 60 }).json({ message: "Se inicio sesion correctamente" })
    }

    res.json({ message:"El usuario o la contraseña es incorrecto/a" })
}


module.exports = { 
    Home,
    Article,
    Contact,
    AboutMe,
    Login,
    Dashboard,
    authenticateLogin
}