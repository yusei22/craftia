import { Context2D } from 'application/core/context-2d';
import { Vec2, Vec4 } from 'application/core/units';
import { Sprite } from 'application/sprites/Sprite';
import { FillSolid } from 'application/sprites/SpriteFill';
import { Arc } from 'application/sprites/shapes/Arc';

/**
 * TODO:キャシュとかで最適化できるようにする
 */
class SpritesRenderer {
    private context: Context2D;

    constructor() {
        this.context = new Context2D({ willReadFrequently: true });
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
    public drawPoint(loc: Vec2) {
        const arc = new Arc({
            id: '000000000000',
            name: 'arc00000',
            anchor: new Vec2(0.5, 0.5),
            globalLocation: loc,
            rotation: (0 / 180) * Math.PI,
            visible: true,
            blendMode: 'source-over',
            opacity: 1.0,
            shadowBlur: 0,
            shadowColor: '#0000',
            shadowOffset: new Vec2(0, 0),
            fillStyle: new FillSolid({ color: new Vec4(255, 0, 0, 1) }),
            strokeCap: 'round',
            strokeDashOffset: 0,
            strokeJoin: 'bevel',
            strokeWidth: 0,
            strokeStyle: new FillSolid({ color: new Vec4(0, 0, 0, 0) }),
            scale: new Vec2(10, 10),
            startAngle: (0 * Math.PI) / 180,
            endAngle: (360 * Math.PI) / 180,
        });
        arc.draw(this.context);
    }
    public getResult() {
        return this.context.getCanvas();
    }
}

export { SpritesRenderer };
