export type Salle = {
    id: number,
    capacity: number,
    name: string,
    floor: "RDC" | "1er" | "2ème",
    indication: string,
    createdAt : Date
}