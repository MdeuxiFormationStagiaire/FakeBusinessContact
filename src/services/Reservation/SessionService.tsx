import { Session } from "../../models/Reservation/Session";

const URL = process.env.REACT_APP_DB_SESSION_URL;

class SessionService {

    findAllSessions = async () => {
        if (URL) {
            const res = await fetch(URL);
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    getSessionById = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "GET",
        });
        return await res.json();
    }

    createSession = async (session : Session) => {
        if (URL) {
            const res = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(session),
                headers: { "content-type": "application/json" }
            });
            return await res.json();
        } else {
            throw console.error("URL not defined");
        }
    }

    deleteSession = async (id : number) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    }

    updateSession = async (id : number, session : Session) => {
        const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(session),
            headers: { "content-type": "application/json" }
        });
        return await res.json();
    }
}

export const sessionService = Object.freeze(new SessionService)