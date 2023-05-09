import { Autre } from "./Autre"
import { Promotion } from "./Promotion"

export type Reservation = {
    promotions : Promotion[]
    autres : Autre[]
}