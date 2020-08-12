const express = require('express');

const router = express.Router();
//const checkAuth = require('../Middleware/verify-auth');
const checkAdminAuth = require('../Middleware/verify-admin-auth'); 
const extractFile = require('../Middleware/file');
const courseCreateController = require('../controllers/course-create');
const courseUpdateController = require('../controllers/course-update');
const courseDeleteController = require('../controllers/course-delete');
const courseFetchController = require('../controllers/course-fetch');

//express automatically executes the checkAuth on each request.
router.post("", checkAdminAuth, extractFile, courseCreateController.createCourse);

router.get('', courseFetchController.getAllCourses);

router.put("/:id", checkAdminAuth, extractFile, courseUpdateController.updateCourse);

router.get("/:id", courseFetchController.getCourseById);

router.delete("/:id", checkAdminAuth, courseDeleteController.deleteCourse);

module.exports = router;