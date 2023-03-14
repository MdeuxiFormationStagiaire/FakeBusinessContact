import { Utilisateur } from "../models/Utilisateur";

const URL : string = "http://localhost:3000/utilisateurs"

class UtilisateurService {

    findAllUtilisateurs = async () => {
        const res = await fetch(URL);
        return await res.json();
    }

    getUtilisateurById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createUtilisateur = async (utilisateur : Utilisateur) => {
        const res = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(utilisateur),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
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