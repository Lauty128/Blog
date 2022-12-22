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


module.exports = { dashboard , login }