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

const app = express();
const PORT = process.env.PORT || 3000
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    },
});

const users = [new Player(uuid4(), null, "victor", "123")]

const matches: Array<Match> = new Array<Match>();

io.on('connection', (socket: Socket) => {
    console.log(socket.id);
    socket.on('login', (json: string) => {
        console.log(json);

        let player: Player = JSON.parse(json);

        if (users.find((p: Player) => p.email === player.email && p.password === player.password)) {
            connect(socket, player);
        }


    });
})

const connect = (socket: Socket, player: Player) => {
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

    socket.on('disconnect', (reason: any) => {
        console.log(reason);
    })

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