import {$,mostrarAlerta,mostraInfo} from "./funciones.js"
import { obtenerPokemon } from "./API.js";

(function(){
    const formulario=$('#formulario');
    formulario.addEventListener('submit', validarForm);

    async function validarForm(e){
        e.preventDefault();
        const pokemon=$('#pokemonInput').value;
        if(pokemon.length==0){
            mostrarAlerta('El campo es Obligatorio');
            return;
        }
        const infoPokemon=await obtenerPokemon(pokemon);
        const info=$('.info');
        info.innerHTML='';
        mostraInfo(infoPokemon);
    }

})();