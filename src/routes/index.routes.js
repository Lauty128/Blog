//------------------------ Dependencies
const { Router } = require('express')


//------------------------ Controllers
const Controller = require('../controllers/page.controllers')
const Middleware = require("../middlewares/page")

//------------------------ Routee
const router = Router()

//------------------------ Middlewares
router.use("/dashboard", Middleware.dashboard )
router.use("/login", Middleware.login)

//------------------------ Routes
router.get("/", Controller.Home )
router.get("/aboutme", Controller.AboutMe)
router.get("/contact", Controller.Contact)
router.get("/articles", (req,res)=>{ res.status(410).render("Articles") })

router.get("/articles/:id", Controller.Article)

router.get("/login", Controller.Login)
router.get("/dashboard", Controller.Dashboard)

//------------------------ Export
module.exports = router