import { Autre } from "../../models/Reservation/Autre";

const URL = process.env.REACT_APP_DB_AUTRE_URL

class AutreService {

    findAllAutres = async () => {
        if (URL) {
            const res = await fetch(URL);
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    getAutreById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createAutre = async (autre : Autre) => {
        if (URL) {
            const res = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(autre),
                headers: { "content-type": "application/json" }
            });
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
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