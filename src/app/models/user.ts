export class User {
    id: number;
    mail: string;
    password: string;
    name: string;
    role: number;
    token: string;

    constructor(mail: string, name: string, role: number, password?: string, id?: number) {
        this.id = id;
        this.mail = mail;
        this.name = name;
        this.password = password;
        this.role = role;
    }
}