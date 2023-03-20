import { Formateur } from "../models/Formateur";

const URL = process.env.REACT_APP_DB_FORMATEUR_URL;

class FormateurService {

    findAllFormateurs = async () => {
        if (URL) {
            const res = await fetch(URL);
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    getFormateurById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createFormateur = async (formateur : Formateur) => {
        if (URL) {
            const res = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(formateur),
                headers: { "content-type": "application/json" }
            });
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
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