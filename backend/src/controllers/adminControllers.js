const admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const auth = require('jsonwebtoken')
const xlsx = require('xlsx')
const fs = require('fs')
const koneksi = require('../models/db')
const jwt = require ('jsonwebtoken')

const secret = 'adminganteng'
const path = require('path')

const importAdminXLSX = (req, res) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    let counter = 0;
    let total = data.length;
    let inserted = 0;

    data.forEach((admin) => {
        let { nama, email, password} = admin;

        if (password=== undefined || password===null || password==='') {
            console.error(`password cant be empty`, admin);
            counter++;
            if (counter === total) {
                fs.unlinkSync(req.file.path);
                res.json({ message: `${inserted} data uploaded` });
            }
            return;
        }

        password = String(password);

        bcrypt.hash(password, 10, (err, hashedPass) => {
            if (err) {
                console.error('hashing error');
                counter++
                if (counter===total) {
                    res.json({message:'user uploaded sucessfully'})
                }
                return;
            }
            koneksi.query(
            `INSERT INTO users (nama, email, password) VALUES (?, ?, ?)`,
            [nama, email, hashedPass],
            (err) => {
                if (err) {
                    console.error('Insert error:', err.message);
                } else {
                    inserted++;
                }

                counter++;
                if (counter === total) {
                    res.json({ message: `${inserted} data uploaded` });
                }
            }
        );
        })
    });
};

const getAllAdmin = (req, res) =>{
    admin.selectAdmin((err,result)=>{
        if (err)return res.status(500).json(err.message)
        res.json(result);
    })
}

const getAdminById = (req,res) => {
    const {id} = req.params;
    admin.selectAdminById(id,(err,result)=>{
        if(err)return res.status(500).json({error:err.message})
        if(result.length === 0)return res.status(404).json({error:'admin not found'})
        res.json(result[0])
    })
}

const createAdmin = (req,res) => {
    const {nama, email, password} = req.body;
    admin.addAdmin(nama, email, password, (err,result)=>{
        if(err) return res.status(500).json({error: err.message})
        res.status(200).json({message:"admin created succesfully"})
    })
}

const writeAdmin = (req,res) => {
    const {id} = req.params;
    const {nama,email,password} = req.body
    admin.updateAdmin(id, nama, email, password, (err,result) =>{
        if(err) return res.status(500).json({error: err.message})
        res.status(200).json({message:'admin updated'})
    })
}

const destroyAdmin = (req,res) =>{
    const {id} = req.params 
    admin.deleteAdmin(id, (err, result) =>{
        if(err) return res.status(500).json({error: err.message})
        res.status(200).json({message: "admin deleted"})
    })
}

const login = (req,res) =>{
    const {email,password}=req.body
    admin.selectAdminByEmail(email,(err,result)=>{
        if (err) {
            return res.status(500).json({error:err.message})
        }
        if (result.length===0) {
            return res.status(404).json({message:'user not found'})
        }

        const user = result[0]
        const isValid = bcrypt.compareSync(password, user.password)
        if (!isValid) {
            return res.status(401).json({message:'wrong password'})
        }
        const token = jwt.sign({id:user.id},'adminganteng',{
            expiresIn:86400
        })
        res.status(200).json({auth:true, token})
    })
}

module.exports= {
    getAllAdmin,
    getAdminById,
    getAdminById,
    login,
    createAdmin,
    writeAdmin,
    destroyAdmin,
    importAdminXLSX
}