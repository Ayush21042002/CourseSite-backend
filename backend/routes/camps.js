const express = require('express');

const router = express.Router();
//const checkAuth = require('../Middleware/verify-auth');
const checkAdminAuth = require('../Middleware/verify-admin-auth'); 
const extractFile = require('../Middleware/file');
const campCreateController = require('../controllers/camp-create');
const campUpdateController = require('../controllers/camp-update');
const campDeleteController = require('../controllers/camp-delete');
const campFetchController = require('../controllers/camp-fetch');

//express automatically executes the checkAuth on each request.
router.post("", checkAdminAuth, extractFile, campCreateController.createCamp);

router.get('', campFetchController.getAllCamps);

router.put("/:id", checkAdminAuth, extractFile, campUpdateController.updateCamp);

router.get("/:id", campFetchController.getCampById);

router.delete("/:id", checkAdminAuth, campDeleteController.deleteCamp);

module.exports = router;