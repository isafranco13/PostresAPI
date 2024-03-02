const mongoose = require('mongoose')
const postreSchema = new mongoose.Schema({
    nombrePostre: {
        type: String,
        require: true
    },
    tipo:{
        type: String,
        enum: ["pay", "pasteles", "helados", "horneados", "pan-dulce", "gelatina", "de sarten"],
        require: true
    },
    porciones: {
        type: Number,
        require: true
    },
    tiempo: {
        type: Number,
        require: true
    },
    ing_liq: {
        type: String,
        require:true
    },
    ing_sec: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    }
})
module.exports =mongoose.model('Postre', postreSchema)
/*
El esquema postreSchema define claramente las propiedades de un postre, abarca desde el nombre, tipo, porciones,
el tiempo en minutos que tarda en hacerse, la lista de ingredientes secos y liquidos que se usan y una breve descripción de que es este postre
esto abarca una propiedad caracteristica de las APIRESTful sobre la representación de manera estructurada y significativa.

La validación en el esquema de la API  es esencial para garantizar la integridad de los datos en la base de datos MongoDB, 
dado que mongoDB no realiza automáticamente la validación, es aquí que entra la propiedad "enum", pues permite definir un conjunto 
específico de valores permitidos, evitando repeticiones y asegurando la consistencia de datos.

Se exporta el esquema al final del archivo para facilitar su reutilización en diferentes partes de la aplicación. Esto mejora la 
integración en las rutas de la API y otros componentes que necesiten interacturar con los datos de los postres.
*/ 