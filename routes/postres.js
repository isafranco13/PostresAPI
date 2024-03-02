const express = require('express')
const router  = express.Router()
const Postre = require('../models/postre') 
//const postre = require('../models/postre')

//Seleccionar todo
router.get('/', async (req, res) =>{
    try{
        const postres = await Postre.find() 
        res.json(postres)
    }catch (err){
        res.status(500).json({message: err.message})
    }

})
//Seleccionar uno
/*router.get('/:id', getPostre, (req, res) =>{
    res.send(res.subscriber.nombrePostre) 
})*/

//Seleccionar uno y muestra todas sus caracterisiticas
router.get('/:id', getPostre, (req, res) =>{
    const { nombrePostre, tipo, porciones, tiempo, ing_liq, ing_sec, descripcion } = res.postre; 
    const txt = `Nombre: ${nombrePostre}\n tipo: ${tipo}\n porciones: ${porciones}\n tiempo en minutos: ${tiempo}\n ingredientes liquidos: ${ing_liq}\n ingredientes secos: ${ing_sec}\n Descripción: ${descripcion}`;

    // Enviar cadena 
    res.send(txt);
}) 
//Insertar uno
router.post('/', async (req, res) =>{
    const PostresValidos = ["pay", "pasteles", "helados", "horneados", "pan-dulce", "gelatina", "de sarten"];
    
    if (!PostresValidos.includes(req.body.tipo)) {
        return res.status(400).json({ message: 'Parece que el tipo de postre esta mal escrito, recuerda que aceptamos; pay,pasteles,helados, horneados, pan de dulce, geltaina, de sarten' });
    }
    const postre = new Postre({ 
        nombrePostre: req.body.nombrePostre,
        tipo: req.body.tipo,
        porciones: req.body.porciones,
        tiempo: req.body.tiempo,
        ing_liq: req.body.ing_liq,
        ing_sec: req.body.ing_sec,
        descripcion: req.body.descripcion
    })
    try{
        const newPostre = await postre.save() 
        res.status(201).json(newPostre) 
    }catch (err){
        res.status(400).json({message: 'No se pudo registrar el postre :('})
    }
})
//Update
router.patch('/:id', getPostre, async (req, res) =>{ ///:id
    if(req.body.nombrePostre != null){
        res.postre.nombrePostre = req.body.nombrePostre
    }
    if(req.body.tipo != null){
        res.postre.tipo = req.body.tipo
    }
    if(req.body.porciones != null){
        res.postre.porciones = req.body.porciones 
    }
    if(req.body.tiempo != null){
        res.postre.tiempo = req.body.tiempo
    }
    if(req.body.ing_liq != null){
        res.postre.ing_liq = req.body.ing_liq
    }
    if(req.body.ing_sec != null){
        res.postre.ing_sec = req.body.ing_sec
    }
    if(req.body.descripcion != null){
        res.postre.descripcion = req.body.descripcion
    }
    try{
        const updatePostre = await res.postre.save()
        res.json(updatePostre)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Delete
router.delete('/:id', getPostre, async (req, res) =>{
   try{
    await res.postre.deleteOne()
    res.json({message: 'Postre eliminado'})
   }catch(err){
    res.status(500).json({message: err.message})
   }
})

async function getPostre(req, res, next) {
    let postre

    try{
        postre = await Postre.findById(req.params.id) 
        if(postre ==null){ 
            return res.status(404).json({message: 'No se encontro el postre'})
        }
    }catch (err){
        return res.status(500).json({message: err.message})
    }
    res.postre = postre 
    next()
}

module.exports = router
/*Este archivo postres.js esta ubicado en la carpeta "routes", lo que facilita una clara separación de responsabilidades.
Además, esta estrucutra mejora la escalabilidad por que permite que cada componentes (rutasm, shcema y middleware) pueda 
escalarse de manera independiente según sea necesario.

La función "getPostre" es utlizado para recuperar los detalles de un postres a través de su identificador, simulando la búsqueda
en un recetario por nombre. Al emplear la ID generada que se nos da al momento de registrar un nuevo postre, esta busqueda almacena
en "res" toda la información que se registro(nombre, tipo, porciones, tiempo ingredientes y descripción). Este middleware se aplica, 
por ejemplo, en la operación de tomar un solo postre, para asi mostrar el postre en formato texto en lugar de un JSON. Este tipo de 
utilización de middleware (de obtener datos previos a operaciones especificas) es una práctica escalable y modular, facilitando la 
incorporación de casos específicos sin afectar otras partes del código o lasd rutas, contribuyendo así a la flexibilidad y 
mantenibilidad del sistema.

El uso de "enum" y "require" es escencial para la integridad de los datos y facilita la incorporcación de nuevas restriciones en el futuro sin 
afectar el código existente. Proporcionando asi consistencia y flexibilidad para adaptarse a cambios futuros.
*/