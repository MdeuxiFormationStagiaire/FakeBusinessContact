import { Promotion } from "../../models/Reservation/Promotion";
import { Stagiaire } from "../../models/Stagiaire";

const URL = process.env.REACT_APP_DB_PROMOTION_URL;

class PromotionService {

    findAllPromotions = async () => {
        if (URL) {
            const res = await fetch(URL);
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    getPromotionById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createPromotion = async (promotion : Promotion) => {
        if (URL) {
            const res = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(promotion),
                headers: { "content-type": "application/json" }
            });
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    deletePromotion = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    }

    deleteStagiairePromotion = async (idPromotion : number, idStagiaire : number) => {
        const promotion = await this.getPromotionById(idPromotion);

        const stagiaires = promotion.stagiaires.filter(
            (stagiaire: Stagiaire) => stagiaire.id !== idStagiaire
        );
        
        promotion.stagiaires = stagiaires;

        return await this.updatePromotion(idPromotion, promotion)
    }

    updatePromotion = async (id : number, promotion : Promotion) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(promotion),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }

    // updateStagiairesPromotion = async (idPromotion: number, promotion: Promotion, idStagiaire: number, stagiaires: Stagiaire[], nouveauStagiaire: Stagiaire) => {
    //     // Trouver l'index du stagiaire à mettre à jour dans la liste des stagiaires de la promotion
    //     const indexStagiaire = stagiaires.findIndex(stagiaire => stagiaire.id === idStagiaire);
        
    //     // Si l'index est -1, cela signifie que le stagiaire n'a pas été trouvé dans la liste des stagiaires de la promotion
    //     if (indexStagiaire === -1) {
    //       throw new Error("Le stagiaire n'a pas été trouvé dans la liste des stagiaires de la promotion.");
    //     }
        
    //     // Créer une copie de la liste des stagiaires de la promotion avec le stagiaire mis à jour
    //     const nouveauxStagiaires = [...stagiaires];
    //     nouveauxStagiaires[indexStagiaire] = nouveauStagiaire;
        
    //     // Mettre à jour la liste des stagiaires de la promotion
    //     const promotionModifiee : Promotion = {
    //         id: idPromotion,
    //         type: 'Promotion',
    //         description: promotion.description,
    //         salle: promotion.salle,
    //         formateur: promotion.formateur,
    //         startAt: promotion.startAt,
    //         endAt: promotion.endAt,
    //         sessions: promotion.sessions,
    //         stagiaires: nouveauxStagiaires,
    //         utilisateur: promotion.utilisateur,
    //         createdAt: promotion.createdAt
    //     };
        
    //     const res = await this.updatePromotion(idPromotion, promotionModifiee);
        
    //     return res;
    // }
}

export const promotionService = Object.freeze(new PromotionService)