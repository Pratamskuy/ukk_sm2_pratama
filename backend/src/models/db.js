const mysql = require("mysql2")
const koneksi = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database:"db_pratama"
})
koneksi.connect((err)=>{
    if (err) {
        console.error('connection failed');
        return
    }
    console.log("connection success");
})
module.exports = koneksi