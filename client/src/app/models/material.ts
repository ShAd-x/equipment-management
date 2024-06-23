import { User } from "./user";

export interface Material {
    _id?: string;
    intitule: string;
    type: string;
    organisation: boolean;
    salle: string;
    utilisePar?: User;
}
