const express = require('express')
const router = express.Router()
const multer = require('multer')
const adminControllers= require('../controllers/adminControllers')
const fs = require('fs')
const xlsx = require('xlsx')
const isAdmin = require('../middleware/isAdmin')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null,file.originalname)
})

const upload = multer ({storage});

router.post('/admin-upload',isAdmin, upload.single('file'), adminControllers.importAdminXLSX)
router.get("/admin",isAdmin, adminControllers.getAllAdmin)
router.get("/admin/:id",adminControllers.getAdminById)
router.post("/admin", adminControllers.createAdmin)
router.put("/admin/:id", isAdmin, adminControllers.writeAdmin)
router.delete("/admin/:id",isAdmin, adminControllers.destroyAdmin)
router.post("/login", adminControllers.login)

module.exports= router;