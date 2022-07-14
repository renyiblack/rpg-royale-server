export class PlayerPlacementJson {
    id: string;
    shipName: string;
    x: number;
    y: number;

    constructor(id: string, shipName: string, x: number, y: number) {
        this.id = id;
        this.shipName = shipName;
        this.x = x;
        this.y = y;
    }
}