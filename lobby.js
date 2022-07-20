import {lobby} from "./server.js";

export class Lobby {
    id;
    players;

    constructor(id) {
        this.id = id;
        this.players = [];
    }
}

export const connectLobby = (socket, player) => {
    if (!lobby.players.find((p) => p.email === player.email)) {
        lobby.players.push(player);
        socket.send('message', JSON.stringify({'type': 'lobby', 'message': 'added player to lobby'}));

        // system notify players
        sendToAllLobby("system: " + player.name + " joined the lobby")
    } else {
        socket.send(JSON.stringify({'type': 'login', 'message': 'player already logged in'}));
    }

    // socket.addEventListener("create room", (json) => {
    // });
    // socket.addEventListener("join room", (json) => {
    // });
    // socket.addEventListener("logout", (json) => {
    //     lobby.players = lobby.players.filter((p) => !(p.email === player.email));
    //     socket.send(JSON.stringify({'type': 'lobby', 'message': "player: " + player.name + " logged out"}));
    // });
}

export const sendToAllLobby = (message)=>{
    lobby.players.forEach(p => p.socket.send(JSON.stringify({'type': 'lobby', 'message': message})));
}