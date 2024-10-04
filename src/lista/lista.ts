import { Personaje } from "./lista.model";
import { getPersonajesAPI } from "./lista.api";

const imprimeImagen = (src: string, titulo: string): HTMLImageElement => {
    const imagen = document.createElement("img");
    imagen.src = src;
    imagen.alt = titulo;
    return imagen;
};

const imprimeParrafo = (key: string, value: string): HTMLParagraphElement => {
    const parrafo = document.createElement("p");
    parrafo.innerHTML= `<strong>${key}:</strong> ${value}`;
    return parrafo;
};

const imprimePersonaje = (personaje : Personaje): HTMLDivElement => {
    const element = document.createElement("div");
    element.classList.add("container");

    const imagen = imprimeImagen(`http://localhost:3000/${personaje.imagen}`, personaje.nombre);
    element.appendChild(imagen);

    const nombre = imprimeParrafo("Nombre", personaje.nombre);
    element.appendChild(nombre);

    const especialidad = imprimeParrafo("Especialidad", personaje.especialidad);
    element.appendChild(especialidad);

    const habilidades = imprimeParrafo("Habilidades", personaje.habilidades.join(", "));
    element.appendChild(habilidades);

    return element;
};

const imprimeLista = async (termino : string): Promise<void> => {
    const personajes = await getPersonajesAPI(termino);
    const listado = document.querySelector("#lista");
    
    if (listado && listado instanceof HTMLDivElement) {
        listado.innerHTML = ""; 
        personajes.forEach(personaje => {
            const personajeContainer = imprimePersonaje(personaje);
            listado.appendChild(personajeContainer);
        });
    } else {
        throw new Error("Personaje no encontrado");
    }
};

const submit = (event: Event) => {
    event.preventDefault();
    const input = document.querySelector(`#name`);
    if (input && input instanceof HTMLInputElement){
        imprimeLista(input.value);
    }
}

document.addEventListener("DOMContentLoaded", () =>  imprimeLista(""));

const form = document.querySelector("#form");
if (form && form instanceof HTMLFormElement) {
    form.addEventListener("submit", submit);
};