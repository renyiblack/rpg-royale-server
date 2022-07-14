import { Point } from "./point";

export enum BlockState { empty, occupied, guessed, hit }

export class Block {
    name: string;
    state: BlockState;
    nextBlock?: Point;
    previousBlock?: Point;

    constructor(state: BlockState = BlockState.empty, name: string = '', nextBlock?: Point,
        previousBlock?: Point) {
        this.name = name;
        this.state = state;
        this.nextBlock = nextBlock;
        this.previousBlock = previousBlock;
    }
}