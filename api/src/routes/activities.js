const express = require('express');
const router = express.Router();

const { Activities, Countries } = require('../db');
router.use(express.json());
// - POST /activity__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
//   - Crea una actividad turística en la base de datos
router.post('/', async (req, res, next) => {
    const { name, dificultad, duracion, temporada , countries} = req.body;
    try {
        const newActivity = await Activities.create({
            name, dificultad, duracion, temporada
        });
        //conecto con countries atravez de la relacion n:n

        countries.map(async countryId => {
            const foundCountry = await Countries.findAll({
              where: { idCountry: countryId },
            });
            if (foundCountry) newActivity.addCountries(foundCountry);
        });

        res.status(202).json(newActivity);
    } catch (error) {
        const {severity, detail} = error.parent
            return res.status(500).json({msg:"ERROR: la actividad no fue creada."+ detail})

    }

})



// -GET /activity__:
// Devuelve todas las actividades
router.get('/', async (req, res) => {
    try {
        const activities = await Activities.findAll({
            order:[["name"]]
        });
        return res.status(200).json(activities)
    } catch (error) {
        res.status(400).send(error)
    }
});
// -DELETE/activity params
// Elimina una actividad que viene solicitada por params.
// router.delete('/:name/delete', (req, res) => {})

module.exports = router;