import { Block, BlockState } from "./block";
import { Point } from "./point";
import { Ship } from "./ship";

export class Cruiser extends Ship {
    constructor(initialPos: Point) {
        super('cruiser', initialPos, [
            [new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied)],
            [new Block(BlockState.occupied), new Block(BlockState.occupied, 'cruiser', initialPos), new Block(BlockState.occupied, 'cruiser', initialPos.sumX(1), initialPos), new Block(BlockState.occupied, 'cruiser', initialPos.sumX(2), initialPos.sumX(1)), new Block(BlockState.occupied, 'cruiser', initialPos.sumX(3), initialPos.sumX(2)), new Block(BlockState.occupied, 'cruiser', initialPos.sumX(4), initialPos.sumX(3)), new Block(BlockState.occupied, 'cruiser', undefined, initialPos.sumX(4)), new Block(BlockState.occupied)],
            [new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied)]
        ], initialPos.subX(1).subY(1), initialPos.sumX(1).sumY(6));
    }
}