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
    codigoPostal: string;
    ciudad: string;
    sexo: Sexo;
    fechaNacimiento: Date;
    photo: File | null;
    available: boolean;
    userRole: UserRole;
    groups: Group[];
    hobbies: Hobby[];
    posts: Post[]
}

export enum Sexo {
    Otro = 'Otro',
    Femenino = 'Femenino',
    Masculino = 'Masculino'
}

export enum UserRole {
    admin = 'ADMIN',
    user = 'USER'
}