import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';
import { Sprite } from 'application/sprites/Sprite';

/**
 * TODO:キャシュとかで最適化できるようにする
 */
class SpritesRenderer {
    private context: Context2D;

    constructor() {
        this.context = new Context2D();
    }
    public viewport(size: Vec2) {
        this.context.viewport(size);
    }
    public render(sprites: Sprite[]) {
        this.context.clear();
        sprites.forEach((sprite) => {
            sprite.draw(this.context);
        });
    }
    public getResult() {
        return this.context.getCanvas();
    }
}

export { SpritesRenderer };
