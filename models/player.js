export class Player{
    id;
    name;
    email;
    password;
    socket;

    constructor(id, name, email, password, socket) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.socket = socket;
    }
}