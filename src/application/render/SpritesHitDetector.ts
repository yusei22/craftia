import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';
import { Sprite } from 'application/sprites/Sprite';

class SpritesHitDetector {
    private context: Context2D;

    constructor() {
        this.context = new Context2D({ willReadFrequently: true });
    }
    public viewport(size: Vec2) {
        this.context.viewport(size);
    }
    public detect(sprites: Sprite[], point: Vec2) {
        for (let i = sprites.length - 1; i >= 0; i--) {
            this.context.clear();
            //ポイント描画
            sprites[i].draw(this.context);
            //ポイントのImageData得る
            const imageData = this.context.getImageData(point, new Vec2(1, 1));
            if (!isTransparent(imageData)) return sprites[i];
        }
        return null;
    }
}

function isTransparent(imageData: ImageData, threshold: number = 0): boolean {
    const data = imageData.data;
    for (let i = 3; i < data.length; i += 4) {
        if (data[i] > threshold) return false;
    }
    return true;
}

export { SpritesHitDetector };
