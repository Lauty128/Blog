//------------------------ Dependencies
const { Router } = require("express")
const upload = require('../config/multer')

//------------------------ Controllers
const Controller = require('../controllers/api.controllers')
const { authenticated } = require("../controllers/middleware.controllers")

//------------------------ Router
const router = Router()

router.use("/submit", authenticated)

router.get("/all", Controller.allData )
router.get("/all/order", Controller.allOrderData )
router.get("/:id", Controller.oneData )

router.delete("/remove/:id", authenticated ,Controller.removeData )

router.post("/submit", upload.single('image') , Controller.submitData )
router.post("/view", Controller.newVisualization)

module.exports = router