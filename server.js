import {WebSocketServer} from 'ws'
import {v4 as uuid4} from 'uuid';
import {Player} from "./player.js";
import {connectLobby, Lobby} from "./lobby.js";
import {createRoom} from "./room.js";

const wss = new WebSocketServer({port: 8080});

export const users = [new Player(uuid4(), "victor", "victor", "123", null), new Player(uuid4(), "victora", "victora", "123", null)]
export const lobby = new Lobby();
export const rooms = [];

wss.on('connection', function connection(ws) {
    ws.on('message', (data) => {
        let player = JSON.parse(data.toString())

        player.socket = ws

        switch (player['messageType']) {
            case "login":
                if (users.find((p) => p.email === player.email && p.password === player.password)) {
                    ws.send(JSON.stringify({'type': 'login', 'message': 'found player'}));
                    connectLobby(ws, player);
                } else {
                    ws.send(JSON.stringify({'type': 'login', 'message': 'invalid player'}));
                }
                break
            case "lobby":
                lobby.players.forEach(p => {
                    if (p.name === player.name) {
                        lobby.players.forEach(p => p.socket.send(JSON.stringify({
                            'type': 'lobby',
                            'message': player.name + ": " + player.message
                        })));
                    }
                })
                break
            case "create room":
                createRoom(player);
                break
            default:
                break
        }


    })
})

wss.on('disconnect', (reason) => {
    console.log(reason);
})

wss.on('listening', () => {
    console.log('listening on 8080')
})