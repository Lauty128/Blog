const multer = require("multer");

const upload = multer( {
    storage: multer.diskStorage({}),
    limits: { fileSize: 3000000 }
  } )

  module.exports = upload
