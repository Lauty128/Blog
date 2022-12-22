const authenticated = (req,res,next)=>{
    if(!req.cookies.session) return res.status(511).json({ message:"Autentication is required"})
    const { user, password } = req.cookies.session
    if(user != process.env.ADMIN_NAME && password != process.env.ADMIN_PASSWORD) return res.status(511).json({ message:"Autentication is invalid"})

    next()
}

module.exports = { authenticated }