import { Player } from "./player";
import { Ship } from "./ship";

export class Match {
    id: string;
    private _p1: Player;
    private _p2: Player | undefined;

    public get p1(): Player {
        return this._p1;
    }

    public set p1(value: Player) {
        this._p1 = value;
    }

    public get p2(): Player | undefined {
        return this._p2;
    }

    public set p2(value: Player | undefined) {
        this._p2 = value;
    }

    public get hasP2(): boolean {
        return !(this._p2 === undefined);
    }

    constructor(id: string, p1: Player, p2: Player | undefined) {
        this.id = id;
        this._p1 = p1;
        this._p2 = p2;
    }

    private isP1(id: string): boolean {
        return this.p1.id === id;
    }

    private isP2(id: string): boolean {
        return this.p2?.id === id;
    }

    public placeShip(id: string, ship: Ship): boolean {
        if (this.isP1(id)) {
            return this._p1.placeShip(ship);
        } else if (this.isP2(id)) {
            return this._p2!.placeShip(ship);
        }
        else {
            throw Error('Invalid player!');
        }
    }
    public guessShip(id: string, x: number, y: number): string {

        this._p1.board.opponentBoard = this._p2!.board.board
        this._p2!.board.opponentBoard = this._p1.board.board

        if (this.isP1(id)) {
            this._p1.board.guess(x, y) ? "player 1 hit" : "player 1 missed";
            return this._p1.board.guess(x, y) ? "player 1 hit" : "player 1 missed";
        } else if (this.isP2(id)) {
            return this._p2!.board.guess(x, y) ? "player 2 hit" : "player 2 missed";
        }
        else {
            throw Error('Invalid player!');
        }
    }
}