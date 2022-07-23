import {lobby, rooms} from "./server.js";
import {Game} from "./models/game.js";
import {inspect} from 'util'

export const createRoom = (player) => {
    const hasPlayer = isAlreadyInRoom(player, 'create room');

    if (hasPlayer) {
        return;
    }

    let room = new Game(rooms.length, []);

    player.x = 5;
    player.y = 5;

    // room.players.push(player);

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

    player.x = 10 * (room.players.length + 1);
    player.y = 10 * (room.players.length + 1);

    room.players.push(player);

    rooms[player['room id']] = room;

    room.players.forEach((p) => {
        p.socket.send(JSON.stringify({
            'type': 'joined room',
            'message': inspect(room.objects),
        }))
        p.socket.send(JSON.stringify({'type': 'position ' + player.name, 'message': inspect([player.x, player.y])}));
    });
}

export const collect = (player) => {
    const hasPlayer = isAlreadyInRoom(player, 'join room');

    if (!hasPlayer) {
        return;
    }

    const room = rooms[player['room id']];

    for (let i = 0; i < room.objects.length; i++) {
        if (room.objects[i].x === player.x && room.objects[i].y === player.y) {
            if (room.objects[i].collected) {
                player.socket.send(JSON.stringify({
                    'type': 'collected',
                    'message': 'already collected',
                }))
                return;
            }
            room.objects[i].collected = true;
            player.socket.send(JSON.stringify({
                'type': 'collected',
                'message': 'collected',
            }))
            return;
        }
    }

    rooms[player['room id']] = room;
}