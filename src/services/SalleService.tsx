import { Salle } from "../models/Salle"

const URL : string = "http://localhost:3000/salles"

class SalleService {

    findAllSalles = async () => {
        const res = await fetch(URL);
        return await res.json();
    }

    getSalleById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createSalle = async (salle : Salle) => {
        const res = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(salle),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }

    deleteSalle = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    }

    updateSalle = async (id : number, salle : Salle) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(salle),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }

}

export const salleService = Object.freeze(new SalleService)