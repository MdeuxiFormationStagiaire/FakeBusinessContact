import { Salle } from "../models/Salle"

const URL = process.env.REACT_APP_DB_SALLE_URL;

class SalleService {

    findAllSalles = async () => {
        if (URL) {
            const res = await fetch(URL);
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    getSalleById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createSalle = async (salle : Salle) => {
        if (URL) {
            const res = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(salle),
                headers: { "content-type": "application/json" }
            });
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
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