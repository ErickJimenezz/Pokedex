export const $=qs=>document.querySelector(qs);

export const mostrarAlerta=mensaje=>{
    const alerta=$('.alerta');
    alerta.innerHTML=`
        <div class="alert alert-danger mt-2 text-center" role="alert">
        <strong>${mensaje}</strong>
        </div>
    `;
    setTimeout(() => {
       alerta.innerHTML=''; 
    }, 2000);
}
export const mostraInfo=({sprites:{front_default},name,types})=>{
    const info=$('.info');
    const div=document.createElement('div');
    div.classList.add('ml-3')
    div.innerHTML=`
        <div class="pokemon w-25 my-2">
        <img src="${front_default}" style="width: 100%;"></img>
        </div>
        <h6 class="text-warning">Nombre: </h6><h5 class="text-white text-uppercase">${name}</h5>
        <h6 class="text-warning">Tipo: </h6>
    `;
    types.forEach(({type:{name}})=>{
        let ul=document.createElement('ul');
        ul.innerHTML=`
            <li class="text-info"><h5 class="text-white text-uppercase">${name}</h5></li>
        `;
        div.appendChild(ul)
    })
    info.appendChild(div);

}
//inicio funciones para
export const db = require("../pokedex.json");

export function findPokemonByName(name) {
  const data = db.find((p) => p.name.toLowerCase() === name.toLowerCase());
  if (!data) {
    return null;
  }
  return data;
}

export function getPokemonInformations(req, res) {
  const pokemon = req.body.conversation.memory.pokemon;
  const pokemonInfos = findPokemonByName(pokemon.value);
  if (!pokemonInfos) {
    res.json({
      replies: [
        {
          type: "text",
          content: `no conozco el pokemon llamado ${pokemon} :(`,
        },
      ],
    });
  } else {
    res.json({
      replies: [
        { type: "text", content: `*${pokemonInfos.name}*` },
        {
          type: "text",
          content: `Tipos: ${pokemonInfos.types.join(" and ")}`,
        },
        {
          type: "text",
          content: `Altura: ${pokemonInfos.height}`,
        },
        {
          type: "text",
          content: `Peso: ${pokemonInfos.weight}`,
        },
        {
          type: "text",
          content: `Experiencia base: ${pokemonInfos.base_experience}`,
        },
        { type: "text", content: pokemonInfos.description },
        { type: "picture", content: pokemonInfos.image },
      ],
    });
  }
};



export function getPokemonEvolutions(req, res) {
  const pokemon = req.body.conversation.memory.pokemon;
  const pokemonInfos = findPokemonByName(pokemon.value);
  if (!pokemonInfos) {
    res.json({
      replies: [
        {
          type: "text",
          content: `no conozco el pokemon llamado ${pokemon} :(`,
        },
      ],
    });
  } else if (pokemonInfos.evolutions.length === 1) {
    res.json({
      replies: [
        { type: "text", content: `${pokemonInfos.name} has no evolutions.` },
      ],
    });
  } else {
    res.json({
      replies: [
        { type: "text", content: `${pokemonInfos.name} family` },
        {
          type: "text",
          content: pokemonInfos.evolutions
           
        },
        {
          type: "card",
          content: {
            title: "Ver mas de este",
            buttons: pokemonInfos.evolutions
              .filter((p) => p.id !== pokemonInfos.id) // Remove initial pokemon from list
              .map((p) => ({
                type: "postback",
                title: p.name,
                value: `Dime mas de ${p.name}`,
              })),
          },
        },
      ],
    });
  }
};