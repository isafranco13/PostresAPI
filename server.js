require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)//, {useNewUrlParser: true}
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conectado a la base de datos'))


app.use(express.json())
app.use(express.static(__dirname + '/public'))
const subscribersRouter = require('./routes/postres')
app.use('/postres', subscribersRouter)


app.listen(3000, () => console.log('Servidor en servicio'))
/*
Es utilizado el manejo de rutas de archivos para el esquema de la base de datos, las rutas para agregar, modificar, eliminar y seleccionar
lo que nos da una mejor organización.
*/