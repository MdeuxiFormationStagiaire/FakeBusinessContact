export type Utilisateur = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    position: string,
    createdAt: Date,
    adminRight: boolean
}