const path = require('path')
const fs = require('fs')
const xlsx = require('xlsx')
const products = require('../models/product')
const koneksi = require('../models/db')

//xlsx
const importProductXLSX = (req,res) =>{
    if (!req.file ||!req.file.path) {
        return res.status(400).json({message:'no file uploaded'})
    }
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = xlsx.utils.sheet_to_json(sheet)

    let counter = 0
    let total = data.length
    let inserted = 0

    data.forEach((products) => {
        let {nama,pabrikan,harga,gambar} = products

        if (!nama || !pabrikan  || !harga || !gambar) {
            console.error('data invalid',products);
            counter++
            if (counter=== total) {
                res.json('uploaded sucessfully')
            }
        return;
    }

    koneksi.query (
        `INSERT INTO products (nama,pabrikan,deskripsi,harga,gambar) VALUES(?,?,?,?,?)`,
        [nama,pabrikan,harga,gambar],
        (err) => {
            if (err) {
                console.error('insert failed',err);
            }else{
                inserted++
            }

            counter++
            if (counter=== total) {
                fs.unlinkSync(req.file.path)
                res.json('uploaded sucessfully')
        }
        return
        }
    )
});
}


//maincon
const getAllProducts = (req,res) =>{
    products.getAllProducts((err, result)=>{
        if (err) return res.status(500).json('error getting data')
        res.json(result)
    })
}

const getProductsByConstructor = (req,res) => {
    const {pabrikan} = req.params;
    products.getProductsByConstructor(pabrikan,(err, result)=>{
        if (err) return res.status(500).json({message:'error getting data'})
        if(result.length === 0)return res.status(404).json({error:'products not found'})
        res.json(result)
    })
}

const getProductsById = (req,res) => {
    const {id} = req.params;
    products.getProductsById(id,(err, result)=>{
        if (err) return res.status(500).json({message:'error getting data'})
        if(result.length === 0)return res.status(404).json({error:'not found'})
        res.json(result[0])
    })
}

const addProducts = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'cant read input' });
    }
    const { nama, pabrikan, deskripsi, harga } = req.body;
    const gambar = req.file ? req.file.filename : null;

    products.addProducts(nama, pabrikan, deskripsi, harga, gambar, (err, result) => {
        if (err) return res.status(500).json({err});
        res.json({ message: 'products successfully uploaded', data: result });
    });
};

const updateProducts = (req, res) => {
    const { id } = req.params;
    const { nama, pabrikan, deskripsi, harga } = req.body;
    const gambar = req.file ? req.file.filename : null;

    products.updateProducts(id, nama, pabrikan, deskripsi, harga, gambar, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Produk berhasil diupdate', data: result });
    });
};

const deleteProducts = (req,res) =>{
    const {id} = req.params
    
    products.destroyProducts(id,(err, result)=>{
        if (err) return res.status(500).json({message:'data cant be deleted'})
        res.json({message:'products sucessfully deleted',data:result})
    })
}

module.exports={
    importProductXLSX,
    getAllProducts,
    getProductsByConstructor,
    addProducts,
    updateProducts,
    deleteProducts,
    getProductsById
}