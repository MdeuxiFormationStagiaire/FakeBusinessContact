import { Formateur } from "../Formateur"

export type Session = {
    id: number,
    desc: string,
    startAt: Date,
    endAt: Date,
    formateur: Formateur
}