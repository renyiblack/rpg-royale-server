import {lobby} from "./server.js";

export class Lobby {
    players;

    constructor() {
        this.players = [];
    }
}

export const connectLobby = (socket, player) => {
    if (!lobby.players.find((p) => p.email === player.email)) {
        lobby.players.push(player);
        socket.send('message', JSON.stringify({'type': 'lobby', 'message': 'added player to lobby'}));

        // system notify players
        socket.send(JSON.stringify({'type': 'lobby', 'message': "system: " + player.name + " joined the lobby"}));
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