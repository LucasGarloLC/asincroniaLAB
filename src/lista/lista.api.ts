import axios from "axios";
import { Personaje } from "./lista.model";

export const getPersonajesAPI = async (name: string): Promise<Personaje[]> => {
    try {
        const { data } = await axios.get(`http://localhost:3000/personajes/?nombre_like=${name}`);
        return data;
    } catch (error) {
        throw new Error("Error al obtener los personajes");
    }
};

