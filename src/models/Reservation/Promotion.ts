import { Formateur } from "../Formateur"
import { Salle } from "../Salle"
import { Session } from "./Session"
import { Stagiaire } from "../Stagiaire"
import { Utilisateur } from "../Utilisateur"

export type Promotion = {
    id: number,
    type: "Promotion",
    description: string,
    salle : Salle,
    formateur: Formateur,
    sessions: Session[],
    stagiaires: Stagiaire[],
    createdAt: Date,
    startAt: Date,
    endAt: Date,
    utilisateur: Utilisateur
}