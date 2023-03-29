import { Promotion } from "../../models/Reservation/Promotion";
import { Session } from "../../models/Reservation/Session";
import { Stagiaire } from "../../models/Stagiaire";
import { sessionService } from "./SessionService";

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

    deleteStagiaireFromPromotion = async (idPromotion : number, idStagiaire : number) => {
        const promotion : Promotion = await this.getPromotionById(idPromotion);

        const stagiaires = promotion.stagiaires.filter(
            (stagiaire: Stagiaire) => stagiaire.id !== idStagiaire
        );
        
        promotion.stagiaires = stagiaires;

        return await this.updatePromotion(idPromotion, promotion)
    }

    deleteSessionFromPromotion = async (idPromotion : number, idSession : number) => {
        const promotion : Promotion = await this.getPromotionById(idPromotion);

        const sessions = promotion.sessions.filter(
            (session : Session) => session.id !== idSession
        );

        promotion.sessions = sessions;

        return await this.updatePromotion(idPromotion, promotion)
    }

    addStagiaireToPromotion = async (idPromotion: number, stagiaire: Stagiaire) => {
        const promotion : Promotion = await this.getPromotionById(idPromotion);
      
        if (!promotion.stagiaires.some((s : Stagiaire) => s.id === stagiaire.id)) {
          promotion.stagiaires.push(stagiaire);
        } else {
          throw new Error("Le stagiaire est déjà dans la promotion");
        }
      
        return await this.updatePromotion(idPromotion, promotion);
    };

    addSessionToPromotion = async (idPromotion: number, idSession: number) => {
        const promotion : Promotion = await this.getPromotionById(idPromotion);
        const session : Session = await sessionService.getSessionById(idSession);

        promotion.sessions.push(session);

        return await this.updatePromotion(idPromotion, promotion);
    }

    updatePromotion = async (id : number, promotion : Promotion) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(promotion),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }
}

export const promotionService = Object.freeze(new PromotionService)