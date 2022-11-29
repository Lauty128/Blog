const dashboard = (req,res,next) => {

    if(!req.cookies.session){
       return res.redirect("/login")
    }
    const { user, password } = req.cookies.session

    if(user != process.env.ADMIN_NAME && password != process.env.ADMIN_PASSWORD){
       return res.redirect("/login")
    }

    next()
}

const login = (req,res,next) => {
    if(!req.cookies.session){
        return next()
        
    }
    const { user, password } = req.cookies.session

    if(user != process.env.ADMIN_NAME && password != process.env.ADMIN_PASSWORD){
        return next()
    }

    res.redirect("dashboard")
}

const authenticated = (req,res,next)=>{
    if(!req.cookies.session) return res.status(511).json({ message:"Autentication is required"})
    const { user, password } = req.cookies.session
    if(user != process.env.ADMIN_NAME && password != process.env.ADMIN_PASSWORD) return res.status(511).json({ message:"Autentication is invalid"})

    next()
}

module.exports = { dashboard , login, authenticated }