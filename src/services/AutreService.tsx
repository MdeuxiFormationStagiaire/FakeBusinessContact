import { Autres } from "../models/Reservation/Autre";

const URL : string = "http://localhost:3000/autres"

class AutreService {

    findAllAutres = async () => {
        const res = await fetch(URL);
        return await res.json();
    }

    getAutreById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createAutre = async (autre : Autres) => {
        const res = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(autre),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }

    deleteAutre = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    }

    updateAutre = async (id : number, autre : Autres) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(autre),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }
}

export const autreService = Object.freeze(new AutreService)