import { User } from "./user.model";

export interface Comment {
    id: number;
    content: string;
    date : Date;
    user : User
}