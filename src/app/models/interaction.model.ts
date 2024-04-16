import { Post } from "./post.model";
import { User } from "./user.model";

export interface Interaction {
    id: number;
    user: User;
    post: Post;
    type: string;
    date: Date;
}
