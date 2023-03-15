import { Salle } from "../Salle"
import { Utilisateur } from "../Utilisateur"

export type Autre = {
    id: number,
    type: "Réunion" | "Examen" | "Job Dating" | "Entretien" | "Visioconférence",
    salle: Salle,
    desc: string,
    createdAt: Date,
    startAt: Date,
    endAt: Date,
    utilisateur: Utilisateur
}