const express = require('express');





//fin de funciones




const app = express();

//se usa en vez de body-parse
app.use(express.json());



//construye las rutas de servicio
app.post('/pokemon-informations', getPokemonInformations);
app.post('/pokemon-evolutions', getPokemonEvolutions);
app.post('/errors', function (requ, res) {
    console.error(req.body, res);
    res.sendStatus(200);
});

//iniciar el server est
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App iniciado en ${PORT}`));






















