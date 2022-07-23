const Objects = {
    'tree': {"id": 1},
    'rock': {"id": 2},
    'flower': {"id": 3},
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
        let obj = Objects.tree;
        obj.x = -10;
        obj.y = 0;
        this.objects.push(obj);
    }
}