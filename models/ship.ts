import { Block } from "./block";
import { Point } from "./point";

export class Ship {
    name: String;
    initialPos: Point;
    topLeft: Point;
    bottomRight: Point;
    blocks: Array<Array<Block>>;

    constructor(name: String, initialPos: Point, blocks: Array<Array<Block>>, topLeft: Point, bottomRight: Point) {
        this.name = name;
        this.initialPos = initialPos;
        this.blocks = blocks;
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }
}