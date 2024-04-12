import { User } from "./user.model";

export interface Comment {
    id: number;
    content: string;
    user: User;
    date: Date;
}