import { Stagiaire } from "../models/Stagiaire";

class StagiaireService {

    private URL = process.env.FBC_APP_DB_STAGIAIRE;

    findAllStagiaires = async () => {
        const res = await fetch(`${URL}`);
        return await res.json();
    }

    getStagiaireById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createStagiaire = async (stagiaire : Stagiaire) => {
        const res = await fetch(`${URL}`, {
            method: "POST",
            body: JSON.stringify(stagiaire),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
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