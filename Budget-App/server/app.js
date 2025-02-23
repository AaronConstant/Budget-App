const express = require('express')
const app = express()
const cors  = require('cors')

app.use(cors())
app.use(express.json())


app.get('/', (req,res)=>{
    res.send('Welcome to you Budget App!')
})

app.get("*", (req,res)=>{
    res.status(404).json({error: "Path not found"})
})

module.exports = app;