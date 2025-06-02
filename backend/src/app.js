const express = require('express')
const routes = require("./routes/adminRoutes")
const products =  require('./routes/productRoutes')
const bodyParser = require('body-parser')
const migration = require('./migration/migration')
const cors = require('cors')

const app = express();

const port = 3000
migration()

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', routes)
app.use('/main',products)
app.listen(port, ()=>{
    console.log(`server is running at ${port} ports`);
})