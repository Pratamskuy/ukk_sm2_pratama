const koneksi = require("./db")
const bcrypt = require('bcryptjs')

const selectAdmin = (callback) => {
    const q =`select * from users`;
    koneksi.query(q,callback)
}

const addAdmin = (nama,email,password,callback) => {
    if (password) {
        const hashedPass=bcrypt.hashSync(password,10)
        const q = `INSERT INTO users(nama,email,password) VALUE (?,?,?)`
        koneksi.query(q,[nama,email,hashedPass], callback)
    } else {
        console.error('password cannot be empty');
    }
}

const selectAdminById = (id,callback) => {
    const q = `SELECT * FROM users WHERE id=?`
    koneksi.query(q,[id], callback)
}

const updateAdmin = (id, nama, email, password, callback) => {
    if (password) {
        const hashedPass = bcrypt.hashSync(password, 10);
        const q = `UPDATE users SET nama=?, email=?, password=? WHERE id=?`;
        koneksi.query(q, [nama, email, hashedPass, id], callback); 
    } else {
        const q = `UPDATE users SET nama=?, email=? WHERE id=?`;
        koneksi.query(q, [nama, email, id], callback);
    }
}


const deleteAdmin =(id,callback) =>{
    const q =`delete from users where id=?`
    koneksi.query(q,[id],callback)
}

const selectAdminByEmail = (email,callback) =>{
    const q = `select * from users where email=?`
    koneksi.query(q,[email], callback)
}

module.exports = {
    selectAdmin,
    selectAdminByEmail,
    selectAdminById,
    deleteAdmin,
    updateAdmin,
    addAdmin
}