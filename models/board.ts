import { Block, BlockState } from "./block";

export class Board {
    board: Array<Array<Block>>;
    opponentBoard: Array<Array<Block>>;

    constructor(board: Array<Array<Block>>, opponentBoard: Array<Array<Block>>) {
        this.board = board
        this.opponentBoard = opponentBoard;
    }

    public static fromXY(x: number, y: number): Board {
        let board: Array<Array<Block>> = new Array<Array<Block>>();
        let opponentBoard: Array<Array<Block>> = new Array<Array<Block>>();

        for (let i = 0; i < x; i++) {
            board.push(new Array<Block>);
            opponentBoard.push(new Array<Block>);
            for (let j = 0; j < x; j++) {
                board[i].push(new Block());
                opponentBoard[i].push(new Block());
            }
        }


        return new Board(board, opponentBoard);
    }

    public guess(x: number, y: number): boolean {

        let state = BlockState.guessed
        if (this.opponentBoard[x][y].name) {
            state = BlockState.hit;
        }
        this.opponentBoard[x][y].state = state
        return state == BlockState.guessed ? false : true;
    }
}