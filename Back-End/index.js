const express = require('express')
const app = express()
require('dotenv').config()
const { readdirSync} =require('fs')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT,()=>{
    console.log(`Server is runing on http://localhost:${process.env.PORT}`)
})

readdirSync('./Router').map((r)=>app.use('/api',require(`./Router/${r}`)))

