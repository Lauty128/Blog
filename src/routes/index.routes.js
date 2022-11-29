const { Router } = require('express')


//------------------------ Controllers
const Controller = require('../controllers/page.controllers')
const Middleware = require("../controllers/middleware.controllers")

//------------------------ Routes
const router = Router()

router.use("/dashboard", Middleware.dashboard )
router.use("/login", Middleware.login)


router.get("/", Controller.Home )

router.get("/aboutme", Controller.AboutMe)

router.get("/contact", Controller.Contact)

router.get("/articles", (req,res)=>{ res.status(410).render("Articles") }) // ERROR 404 BECAUSE THERE IS NO CONTENT

router.get("/articles/:id", Controller.Article)

router.get("/login", Controller.Login)
router.post("/login", Controller.authenticateLogin)

router.get("/dashboard", Controller.Dashboard)

router.get("/subir", (req,res)=> res.render('pages/submit'))
// "/subir" va a estar dentro de Dashboard pero la mantengo para guardar la informacion



module.exports = router