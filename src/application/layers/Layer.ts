import { Sprite } from 'application/sprites/Sprite';

class Layer<T extends Sprite> {
    readonly sprite: T;
    get id() {
        return this.sprite.prefs.id;
    }
    constructor(sprite: T) {
        this.sprite = sprite;
    }
}
export { Layer };
