const koneksi = require('./db')

const getAllProducts = (callback) => {
    const q =`SELECT * FROM products`
    koneksi.query(q,callback)
}

const getProductsByConstructor = (pabrikan,callback) => {
        const q = `SELECT * FROM products where pabrikan=?`
        koneksi.query(q,[pabrikan], callback)
}

const getProductsById = (id,callback) => {
        const q = `SELECT * FROM products where id=?`
        koneksi.query(q,[id], callback)
}

const addProducts = (nama,pabrikan,deksripsi,harga,gambar,callback) => {
        const q = `INSERT INTO products (nama,pabrikan,deskripsi,harga,gambar) VALUES (?,?,?,?,?)`
        koneksi.query(q,[nama,pabrikan,deksripsi,harga,gambar], callback)
}


const updateProducts = (id, nama, pabrikan, deskripsi, harga, gambar, callback) => {
    const q = `UPDATE products SET nama=?, pabrikan=?, deskripsi=?, harga=?, gambar=? WHERE id=?`;
    koneksi.query(q, [nama, pabrikan, deskripsi, harga, gambar, id], callback);
}

const destroyProducts = (id, callback) => {
    const q =`DELETE FROM products WHERE id=?`
    koneksi.query(q,[id], callback)
}
module.exports={
    addProducts,
    getProductsByConstructor,
    updateProducts,
    getAllProducts,
    destroyProducts,
    getProductsById
}