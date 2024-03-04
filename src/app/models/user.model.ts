import { Group } from "./group.model";
import { Hobby } from "./hobby.model";
import { Post } from "./post.model";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    photo: File | null;
    groups: Group[];
    hobbies: Hobby[];
    posts: Post[]
}
