const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const productsController = require('../controllers/productsController')
const isAdmin = require('../middleware/isAdmin')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null,file.originalname)
})

const upload = multer ({storage});

router.post('/products/import', isAdmin, upload.single('file'), productsController.importProductXLSX)
router.get("/products", productsController.getAllProducts)
router.get("/products/:pabrikan", productsController.getProductsByConstructor)
router.get("/products/bike/:id", productsController.getProductsById)
router.post("/products",isAdmin, upload.single('gambar'), productsController.addProducts)
router.put("/products/:id",isAdmin,  upload.single('gambar'), productsController.updateProducts)
router.delete("/products/:id",isAdmin, productsController.deleteProducts)
    
module.exports= router;