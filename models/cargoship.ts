import { Block, BlockState } from "./block";
import { Point } from "./point";
import { Ship } from "./ship";

export class CargoShip extends Ship {
    constructor(initialPos: Point) {
        super('cargoship', initialPos, [
            [new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied)],
            [new Block(BlockState.occupied), new Block(BlockState.occupied, 'cargoship', initialPos), new Block(BlockState.occupied, 'cargoship', initialPos.sumX(1), initialPos), new Block(BlockState.occupied, 'cargoship', initialPos.sumX(2), initialPos.sumX(1)), new Block(BlockState.occupied, 'cargoship', initialPos.sumX(3), initialPos.sumX(2)), new Block(BlockState.occupied, 'cargoship', undefined, initialPos.sumX(2)), new Block(BlockState.occupied)],
            [new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied), new Block(BlockState.occupied)]
        ], initialPos.subX(1).subY(1), initialPos.sumX(1).sumY(5));
    }
}