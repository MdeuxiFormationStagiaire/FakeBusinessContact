import { Promotion } from "../../models/Reservation/Promotion";

class PromotionService {

    private URL = process.env.FBC_APP_DB_PROMOTION;

    findAllPromotions = async () => {
        const res = await fetch(`${URL}`);
        return await res.json();
    }

    getPromotionById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createPromotion = async (promotion : Promotion) => {
        const res = await fetch(`${URL}`, {
            method: "POST",
            body: JSON.stringify(promotion),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
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