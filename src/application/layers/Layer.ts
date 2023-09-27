import { Sprite } from 'application/sprites/Sprite';

class Layer<T extends Sprite> {
    readonly sprite: T;
    constructor(sprite: T) {
        this.sprite = sprite;
    }
}
