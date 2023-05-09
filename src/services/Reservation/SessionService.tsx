import { Promotion } from "../../models/Reservation/Promotion";
import { Session } from "../../models/Reservation/Session";

const URLSession = process.env.REACT_APP_DB_SESSION_URL;

const URLPromotion = process.env.REACT_APP_DB_PROMOTION_URL;

class SessionService {

    /**
     * 
     * @returns 
     */
    findAllSessions = async () => {
        if (URLSession) {
            const res = await fetch(URLSession);
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    getSessionById = async (id : number) => {
        const res = await fetch(`${URLSession}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    /**
     * 
     * @param idPromotion 
     * @returns 
     * 
     */ // TODO -> modifier pour backend avec l'URL '/promotions/idPromotion/sessions'
    getSessionsByPromotion = async (idPromotion : number) => {
        const res = await fetch(`${URLPromotion}/${idPromotion}`, {
            method: "GET",
        });
        const promotion : Promotion = await res.json();
        return promotion.sessions;
    }

    /**
     * 
     * @param session 
     * @returns 
     */
    createSession = async (session : Session) => {
        if (URLSession) {
            const res = await fetch(URLSession, {
                method: "POST",
                body: JSON.stringify(session),
                headers: { "content-type": "application/json" }
            });
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    deleteSession = async (id : number) => {
        const res = await fetch(`${URLSession}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    }

    /**
     * 
     * @param id 
     * @param session 
     * @returns 
     */
    updateSession = async (id : number, session : Session) => {
        const res = await fetch(`${URLSession}/${id}`, {
            method: "PUT",
            body: JSON.stringify(session),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }
}

export const sessionService = Object.freeze(new SessionService)