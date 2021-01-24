import { Role } from "./role.enum";
export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    dateOfBirth:Date;
    gender:string;
    phone:string;
    jwtToken?: string;
}
