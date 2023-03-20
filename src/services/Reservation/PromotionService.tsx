import { Promotion } from "../../models/Reservation/Promotion";

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