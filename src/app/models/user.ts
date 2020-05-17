export class User {
    id: number;
    mail: string;
    name: string;
    role: number;

    constructor(mail: string, name: string, role: number, id?: number) {
        this.id = id;
        this.mail = mail;
        this.name = name;
        this.role = role;
    }
}