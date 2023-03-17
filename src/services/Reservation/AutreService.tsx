import { Autre } from "../../models/Reservation/Autre";

class AutreService {

    private URL = process.env.FBC_APP_DB_AUTRE;

    findAllAutres = async () => {
        const res = await fetch(`${URL}`);
        return await res.json();
    }

    getAutreById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createAutre = async (autre : Autre) => {
        const res = await fetch(`${URL}`, {
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

    updateAutre = async (id : number, autre : Autre) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(autre),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }
}

export const autreService = Object.freeze(new AutreService)