//------------------------ Dependencies
const { Router, application } = require("express")
const cors = require("cors")
const upload = require('../config/multer')

//------------------------ Controllers
const Controller = require('../controllers/api.controllers')
const { authenticated } = require("../controllers/middlewares")

//------------------------ Router
const router = Router()

router.use(cors())

router.use("/submit", authenticated)

router.get("/all", Controller.allData )
router.get("/all/order", Controller.allOrderData )
router.get("/:id", Controller.oneData )

router.delete("/remove/:id", authenticated ,Controller.removeData )

router.post("/submit", upload.single('image') , Controller.submitData )
router.post("/view", Controller.newVisualization)
router.post("/login", Controller.authenticateLogin)

//------------------------ Export
module.exports = router