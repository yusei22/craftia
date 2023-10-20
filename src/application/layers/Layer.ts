import { ValueUpdater } from 'application/core/types';
import { Sprite } from 'application/sprites/Sprite';

class Layer<T extends Sprite> {
    readonly sprite: T;
    readonly id: string;
    constructor(sprite: T) {
        this.sprite = sprite;
        this.id = '';
    }
    public setSprite(valOrUpdater: ValueUpdater<Sprite> | Sprite) {
        return new Layer(
            typeof valOrUpdater === 'function' ? valOrUpdater(this.sprite) : valOrUpdater
        );
    }
}
export { Layer };
