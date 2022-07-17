import express from 'express';
import {Match} from './models/match';
import {Player} from './models/player';
import {v4 as uuid4} from 'uuid';
import {Socket, Server} from 'socket.io';
import {createServer} from 'http';
import {PlayerPlacementJson} from './models/player_placement_json';
import {PlayerGuessJson} from './models/player_guess_json';
import {ShipFactory} from './models/shipfactory';
import {Point} from './models/point';
import {Lobby} from "./models/lobby";

const app = express();
const PORT = process.env.PORT || 3000
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    },
});

const users = [new Player(uuid4(), null, "victor", "victor", "123")]

const matches: Array<Match> = new Array<Match>();

const lobby = new Lobby();

io.on('connection', (socket: Socket) => {
    console.log(socket.id);
    socket.on('login', (json: string) => {
        let player: Player = JSON.parse(JSON.stringify(json));
        player.socket = socket

        if (users.find((p: Player) => p.email === player.email && p.password === player.password)) {
            socket.emit('login', 'found player');
            connectLobby(socket, player);
        } else {
            socket.emit('login', 'invalid player');
        }
    });

    socket.on('disconnect', (reason: any) => {
        console.log(reason);
    })
})

const connectLobby = (socket: Socket, player: Player) => {
    if (!lobby.players.find((p: Player) => p.email === player.email)) {
        lobby.players.push(player);
        socket.emit('lobby', 'added player to lobby');
        socket.join('lobby');

        // system notify players
        io.to('lobby').emit('system message', "player: " + player.name + " joined the lobby");

        // player message
        socket.on('message', (message: string) => {
            io.to('lobby').emit('message', player.name + ": " + message);
        })
    } else {
        socket.emit('lobby', 'player already on lobby');
    }

    socket.on("create room", (json: string) => {
    });
    socket.on("join room", (json: string) => {
    });
    socket.on("logout", (json: string) => {
        lobby.players = lobby.players.filter((p: Player) => !(p.email == player.email));
        io.to('lobby').emit('system message', "player: " + player.name + " logged out");
    });
}

const match = (socket: Socket, player: Player) => {
    player.socket = socket
    let matchNumber = matches.length;
    let message = 'Waiting for player 2!\n';
    let matchId = uuid4();

    if (matchNumber == 0) {
        matches.push(new Match(matchId, player, undefined));
        socket.emit('id', player.id);
    } else {
        let match = matches.at(matches.length - 1)!;
        if (!match.hasP2) {
            match.p2 = player;
            socket.emit('id', match.p2.id);
            matchId = match.id;
            message = 'Starting Match!';
        } else {
            matches.push(new Match(matchId, player, undefined));
        }

        matchNumber = matches.length;
    }

    let match = matches.at(matches.length - 1)!;

    socket.join('match' + matchId);
    io.to('match' + matchId).emit('message', message + ' Match id = ' + matchId);

    socket.on("place", (json: string) => {
        console.log(json);

        let playerPlacementJson: PlayerPlacementJson = JSON.parse(json);
        let x = playerPlacementJson.x;
        let y = playerPlacementJson.y;

        socket.emit("place", match.placeShip(playerPlacementJson.id, ShipFactory.buildShipFromName(playerPlacementJson.shipName, new Point(x, y))))
    });

    socket.on("guess", (json: string) => {
        let playerGuessJson: PlayerGuessJson = JSON.parse(json);
        let message: string = (match.guessShip(playerGuessJson.id, playerGuessJson.x, playerGuessJson.y));
        console.log(message);
        io.to('match' + matchId).emit("guess", message);
    });
}


server.listen(PORT, () => {
    console.log('Server running on Port ', PORT)
})