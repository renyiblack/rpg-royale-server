import {rooms} from "./server.js";
import {Lobby} from "./lobby.js";

export const createRoom = (player) => {
    let hasPlayer = false;
    rooms.forEach(r => {
        r.players.forEach(p => {
            if (p.name === player.name) {
                p.socket.send(JSON.stringify({
                    'type': 'create room',
                    'message': player.name + " already in a room"
                }));
                hasPlayer = true;
            }
        })
    });

    if (hasPlayer) {
        return;
    }

    let room = new Lobby(rooms.length);

    room.players.push(player);

    rooms.push(room);

    player.socket.send(JSON.stringify({
        'type': 'created room',
        'message': room.id
    }));
}