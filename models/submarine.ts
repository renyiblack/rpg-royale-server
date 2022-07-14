import { Block, BlockState } from "./block";
import { Point } from "./point";
import { Ship } from "./ship";

export class Submarine extends Ship {
    constructor(initialPos: Point) {
        super('submarine', initialPos, [
            [new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied)],
            [new Block(BlockState.occupied), new Block(BlockState.occupied, 'submarine', initialPos), new Block(BlockState.occupied, 'submarine', initialPos.sumX(1), initialPos), new Block(BlockState.occupied, 'submarine', initialPos.sumX(2), initialPos.sumX(1)), new Block(BlockState.occupied, 'submarine', undefined, initialPos.sumX(2)), new Block(BlockState.occupied)],
            [new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied)]
        ], initialPos.subX(1).subY(1), initialPos.sumX(1).sumY(4));
    }
}