const express = require("express");
const axios = require('axios')
const router = express.Router();
const { Op } = require("sequelize");

const {Countries, Activities} = require("../db.js");

router.use(express.json())

// rutas
// ruta get/countries/name solicitada por el corrector
router.get("/name", async (req, res) => {  
        try {
            const paises = await Countries.findAll({
              order:[["name"]],
            });
            const paisesMap = paises.map(pais => pais.dataValues.name)
            return res.status(200).json(paisesMap)
        } catch (error) {
            res.status(400).send(error)
        }
    });
// - GET /countries__:
//   - En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
//   - Obtener un listado de los paises.
// - GET /countries?name="..."__:
//   - Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
//   - Si no existe ningún país mostrar un mensaje adecuado
router.get("/", async (req, res) => {
const { name } = req.query;
    
    try {
        if(name) {
            
            let pais = await Countries.findAll({
                order:[["name"]],
                where: {
                  name: {
                    [Op.iLike]: `%${name}%`,
                  },
                },
                include: {model: Activities},
              });
              if(pais.length > 0){
                  return res.status(201).json(pais);

              } else {

                  return res.status(501).json({msg:"ERROR: no existe un país con ese nombre"});
              }
        }
        const paises = await Countries.findAll({
          order:[["name"]],
          include: {model: Activities},
        });
       return res.status(200).json(paises)
    } catch (error) {
        res.status(400).send(error)
    }
});
// - GET /countries/{idPais}__:
//   - Obtener el detalle de un país en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de país
//   - Incluir los datos de las actividades turísticas correspondientes
router.get("/:idPais", async(req, res) => {
    const { idPais } = req.params;

try{
    let country = await Countries.findByPk(idPais.toUpperCase(), {include: {model: Activities}})
    if (!country) {throw new Error('No existe el pais')}
    res.status(201).json(country);
}
catch(err){
    console.log(err)
    if(!idPais){
        res.status(400).send({err: "¡No se recibio el id!"})
    }
    if(idPais !== Countries.idCountry){
        res.status(400).send({err: `¡No existe ningun país con ese id! ${idPais}`})
    }
}
})

module.exports = router;

