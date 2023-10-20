import { Bilateral, BilateralConfig } from '../Bilateral';
import { Filter, FilterTarget, FilterWorker } from '../Filter';
import { Sobel, SobelConfig } from '../Sobel';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

export interface IllustrationConfig {}

export class Illustration extends Filter<IllustrationConfig> {
    public getWorker(sprite: FilterTarget): IllustrationWorker {
        return new IllustrationWorker(sprite);
    }
}

export class IllustrationWorker extends FilterWorker<IllustrationConfig> {
    private bilateral: FilterWorker<BilateralConfig>;
    private sobel: FilterWorker<SobelConfig>;
    private context: Context2D;

    constructor(sprite: FilterTarget) {
        super(sprite);
        const imageSize = new Vec2(sprite.image.width, sprite.image.height);
        this.context = new Context2D();
        this.context.viewport(imageSize);
        this.bilateral = new Bilateral().getWorker(sprite);
        this.sobel = new Sobel().getWorker(sprite);
    }
    public getResult() {
        return this.context.getCanvas();
    }
    public execute() {
        this.context.clear();
        this.bilateral.execute({
            radius: 100,
        });
        this.sobel.execute({});
        this.context.drawImage(this.bilateral.getResult(), new Vec2(0, 0));
        this.context.drawImage(this.sobel.getResult(), new Vec2(0, 0));
    }
}
