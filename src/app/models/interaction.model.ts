import { User } from "./user.model";

export interface Interaction {
    id: number;
    user: User;
    type: string;
    date: Date;
}
