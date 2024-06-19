import { Material } from "./material";
import { User } from "./user";

export interface AssignmentRequest {
    _id?: string;
    material: Material;
    user: User;
    statut: string;
}