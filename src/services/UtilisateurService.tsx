import { Utilisateur } from "../models/Utilisateur";

const URL = process.env.REACT_APP_DB_USER_URL;

class UtilisateurService {

    findAllUtilisateurs = async () => {
        if (URL) {
            const res = await fetch(URL);
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    getUtilisateurById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createUtilisateur = async (utilisateur : Utilisateur) => {
        if (URL) {
            const res = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(utilisateur),
                headers: { "content-type": "application/json" }
            });
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    deleteUtilisateur = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    }

    updateUtilisateur = async (id : number, Utilisateur : Utilisateur) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(Utilisateur),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }
}

export const utilisateurService = Object.freeze(new UtilisateurService)