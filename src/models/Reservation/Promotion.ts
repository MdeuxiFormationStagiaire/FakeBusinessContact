import { Formateur } from "../Formateur"
import { Salle } from "../Salle"
import { Session } from "./Session"
import { Stagiaire } from "../Stagiaire"
import { Utilisateur } from "../Utilisateur"

export type Promotion = {
    id: number,
    description: string,
    salle : Salle,
    formateur: Formateur,
    startAt: Date,
    endAt: Date,
    sessions: Session[],
    stagiaires: Stagiaire[],
    utilisateur: Utilisateur,
    createdAt: Date
}