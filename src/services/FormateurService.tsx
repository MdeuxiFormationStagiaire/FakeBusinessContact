import { Formateur } from "../models/Formateur";

const URL : string = "http://localhost:3000/formateurs"

class FormateurService {

    findAllFormateurs = async () => {
        const res = await fetch(URL);
        return await res.json();
    }

    getFormateurById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createFormateur = async (formateur : Formateur) => {
        const res = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(formateur),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }

    deleteFormateur = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    }

    updateFormateur = async (id : number, formateur : Formateur) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(formateur),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }
}

export const formateurService = Object.freeze(new FormateurService)