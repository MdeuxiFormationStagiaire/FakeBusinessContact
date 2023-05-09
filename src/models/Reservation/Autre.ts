import { Salle } from "../Salle"
import { Utilisateur } from "../Utilisateur"

export type Autre = {
    id: number,
    type: "Réunion" | "Examen" | "Job Dating" | "Entretien" | "Visioconférence",
    desc: string,
    salle: Salle,
    createdAt: Date,
    startAt: Date,
    endAt: Date,
    utilisateur: Utilisateur
}