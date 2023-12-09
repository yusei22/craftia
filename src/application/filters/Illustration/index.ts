import { Bilateral, BilateralExecutor } from '../Bilateral';
import { GLFilter, FilterTarget, FilterExecutor } from '../Filter';
import { Sobel, SobelExecutor } from '../Sobel';
import { AbstractContext2D, Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

export interface IllustrationConfig {}

export class Illustration extends GLFilter<IllustrationConfig> {
    public getExecutor(gl: WebGL2RenderingContext, sprite: FilterTarget): IllustrationExecutor {
        return new IllustrationExecutor(gl, sprite);
    }
}

export class IllustrationExecutor extends FilterExecutor<IllustrationConfig> {
    private bilateral: BilateralExecutor;
    private sobel: SobelExecutor;
    private context: AbstractContext2D;

    constructor(gl: WebGL2RenderingContext, sprite: FilterTarget) {
        super(sprite);
        const imageSize = new Vec2(sprite.image.width, sprite.image.height);
        this.context = new Context2D();
        this.context.viewport(imageSize);
        this.bilateral = new Bilateral().getExecutor(gl, sprite);
        this.sobel = new Sobel().getExecutor(gl, sprite);
    }
    public getResult() {
        return this.context.getCanvas();
    }
    public execute() {
        this.context.clear();
        this.bilateral.execute({
            radius: 50,
        });
        this.context.drawImage(this.bilateral.getResult(), new Vec2(0, 0));
        this.sobel.execute();
        this.context.drawImage(this.sobel.getResult(), new Vec2(0, 0));
    }
}
