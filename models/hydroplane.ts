import { Block, BlockState } from "./block";
import { Point } from "./point";
import { Ship } from "./ship";

export class HydroPlane extends Ship {
    constructor(initialPos: Point) {
        super('hydroplane', initialPos, [
            [new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied)],
            [new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied, 'hydroplane', initialPos.sumX(1).sumY(1), initialPos.sumX(2)), new Block(BlockState.occupied), new Block(BlockState.occupied)],
            [new Block(BlockState.occupied), new Block(BlockState.occupied, 'hydroplane', initialPos), new Block(BlockState.occupied), new Block(BlockState.occupied, 'hydroplane', undefined, initialPos.sumX(1).sumY(1)), new Block(BlockState.occupied)],
            [new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied)]
        ], initialPos.subX(2).subY(1), initialPos.sumX(1).sumY(3));
    }
}