import { User } from "./user.model";

export interface Group {
    id: number;
    title: string;
    description: string;
    photoUrl: string;
    rules: string;
    users: User[];
}
