import { Stagiaire } from "../models/Stagiaire";

const URL = process.env.REACT_APP_DB_STAGIAIRE_URL;

class StagiaireService {

    findAllStagiaires = async () => {
        if (URL) {
            const res = await fetch(URL);
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    getStagiaireById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createStagiaire = async (stagiaire : Stagiaire) => {
        if (URL) {
            const res = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(stagiaire),
                headers: { "content-type": "application/json" }
            });
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    deleteStagiaire = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    }

    updateStagiaire = async (id : number, stagiaire : Stagiaire) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(stagiaire),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }
}

export const stagiaireService = Object.freeze(new StagiaireService)