import { Group } from "./group.model";
import { Interaction } from "./interaction.model";
import { User } from "./user.model";

export interface Post {
    id: number;
    title: string;
    content: string;
    photoUrl: string;
    videoUrl: string;
    group: Group;
    user: User;
    interactions: Interaction[];
}
