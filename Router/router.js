const express=require('express')
const router=express.Router()
const userController=require('../Controller/userController')
const projectController=require('../Controller/projectController')
const jwtMiddleware=require('../Middleware/jwtMiddleware')
const multerConfig =require('../Middleware/multerMiddleware')

router.post('/register',userController.register)

router.post('/login',userController.login)

router.post('/addproject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

//getHomeProjects
router.get('/homeprojects',projectController.getHomeProjects)

//getAllProjects
router.get('/allprojects',jwtMiddleware,projectController.getAllProjects)

//getUserProjects
router.get('/userprojects',jwtMiddleware,projectController.getUserProjects)

//updateproject
router.put('/projects/edit/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

//delete project
router.delete('/projects/remove/:pid',jwtMiddleware,projectController.deleteProject)


module.exports=router


