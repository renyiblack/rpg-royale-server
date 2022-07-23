const Objects = {
    'tree': {"id": 1},
    'rock': {"id": 2},
    'flower': {"id": 3},
}

const objectBuilder = (name, x, y) => {
    let obj = JSON.parse(JSON.stringify(Objects[name]));
    obj.x = x;
    obj.y = y;
    obj.collected = false;
    return obj
}

export class Game {
    id;
    objects;
    players;

    constructor(id, players) {
        this.id = id;
        this.objects = [];
        this.players = players;
        this.spawnObject();
    }

    spawnObject() {
        this.objects.push(objectBuilder('tree', -10, 0));
        this.objects.push(objectBuilder('rock', 0, 0));
        this.objects.push(objectBuilder('flower', 10, 0));
        this.objects.push(objectBuilder('tree', -15, 5));
        this.objects.push(objectBuilder('rock', 5, 5));
        this.objects.push(objectBuilder('flower', 15, 5));
        this.objects.push(objectBuilder('tree', -20, 10));
        this.objects.push(objectBuilder('rock', 10, 10));
        this.objects.push(objectBuilder('flower', 20, 10));
    }
}