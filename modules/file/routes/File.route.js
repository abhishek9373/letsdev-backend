const router = require('express').Router();

const FileController = require("../controllers/File.controller");

const fileController = new FileController();

//middleware to diagnose requests for debugging
router.use("*", (req, res, next) => {
	next();
})

//routes
router.post('/', 
	fileController.getSignedURL);

module.exports = router;