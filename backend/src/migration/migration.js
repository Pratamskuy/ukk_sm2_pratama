const mysql = require('mysql2')
const koneksi = require("../models/db")
const connectMysql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:''
})

const createUserTable = (koneksi) =>{
    const q = `CREATE TABLE IF NOT EXISTS users(
    id INT(12) PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(225) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
    );`
    koneksi.query(q,(err,result)=>{
        if (err) {
            console.error('table creation failed');
            return
        }
        console.log('table created sucessfully');
        
    })
}

const createProductsTable = (koneksi) =>{
    const q = `CREATE TABLE IF NOT EXISTS products(
    id INT(12) PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    pabrikan VARCHAR(225) NOT NULL,
    deskripsi VARCHAR(100) NOT NULL,
    harga INT NOT NULL,
    gambar VARCHAR(225)
    );`
    koneksi.query(q,(err,result)=>{
        if (err) {
            console.error('products table creation failed');
            return
        }
        console.log('products table created sucessfully');
        
    })
}



const migration = () => {
    connectMysql.connect((err)=>{
        if (err) {
            console.error('error connection to database');
            return
        }
        console.log('connected to mysql database');
        connectMysql.query(
            `CREATE DATABASE IF NOT EXISTS db_pratama`,
            (err,result) => {
                if (err) {
                    console.error("error creating database");
                    return
                }
                console.log('database created or already exist');

                const koneksi = require('../models/db')
                createUserTable(koneksi)
                createProductsTable(koneksi)

                connectMysql.end()
            }
        )
    })
}

module.exports = migration