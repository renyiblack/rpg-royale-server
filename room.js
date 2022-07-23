import {lobby, rooms} from "./server.js";
import {Game} from "./models/game.js";
import {inspect} from 'util'

export const createRoom = (player) => {
    const hasPlayer = isAlreadyInRoom(player, 'create room');

    if (hasPlayer) {
        return;
    }

    let room = new Game(rooms.length, []);

    room.players.push(player);

    rooms.push(room);

    player.socket.send(JSON.stringify({
        'type': 'created room',
        'message': 'player ' + player.name + ' created ' + room.id
    }));

    lobby.players.forEach(p => {
        if (p.email !== player.email) {
            p.socket.send(JSON.stringify({
                'type': 'created room',
                'message': room.id
            }));
        }
    });

}

const isAlreadyInRoom = (player, type) => {
    let hasPlayer = false;
    rooms.forEach(r => {
        r.players.forEach(p => {
            if (p.name === player.name) {
                p.socket.send(JSON.stringify({
                    'type': type,
                    'message': player.name + " already in a room"
                }));
                hasPlayer = true;
            }
        })
    });

    return hasPlayer;
}

export const joinRoom = (player) => {
    const hasPlayer = isAlreadyInRoom(player, 'join room');

    if (hasPlayer) {
        return;
    }

    const room = rooms[player['room id']];

    room.players.push(player);

    rooms[player['room id']] = room;

    room.players.forEach(p => p.socket.send(JSON.stringify({
        'type': 'joined room',
        'message': inspect(room.objects),
    })));
}