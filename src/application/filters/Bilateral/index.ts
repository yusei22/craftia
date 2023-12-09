import { FilterTarget, FilterExecutor, GLFilter } from '../Filter';
import { TexRenderer } from '../TexRenderer';
import { Vec2 } from 'application/core/units';
import { FrameBuffer, UniformFloat, UniformGroup, UniformInt } from 'application/core/web-gl2';

const bilateral = require('./bilateral.frag');// eslint-disable-line

const MAX_RADIUS = 10;
const TEX_UNITNUMBER = 0;

export interface BilateralConfig {
    radius: number;
}

export class Bilateral extends GLFilter {
    public getExecutor(gl: WebGL2RenderingContext, sprite: FilterTarget) {
        return new BilateralExecutor(sprite, gl);
    }
}
const sigmaSpace = (r: number) => {
    return r / 1.5;
};
export class BilateralExecutor extends FilterExecutor<BilateralConfig> {
    private renderer: TexRenderer;
    private frameBuffers: [FrameBuffer, FrameBuffer];

    constructor(sprite: FilterTarget, gl2: WebGL2RenderingContext) {
        super(sprite);

        const imageSize = new Vec2(sprite.image.width, sprite.image.height);

        this.renderer = new TexRenderer(gl2);
        this.renderer.setFragmentShader(bilateral.default, [
            new UniformInt('u_texture', TEX_UNITNUMBER),
        ]);
        this.renderer.setTexVertex(new Vec2(0, 0), imageSize);
        this.renderer.setTexPixels(sprite.image);

        this.frameBuffers = [
            new FrameBuffer().setSize(imageSize),
            new FrameBuffer().setSize(imageSize),
        ];
        this.renderer.renderer.frameBuffer.update(this.frameBuffers[0]);
        this.renderer.renderer.frameBuffer.update(this.frameBuffers[1]);
    }
    public getResult() {
        return this.renderer.renderer.getCanvas();
    }
    public execute(config: BilateralConfig) {
        const { radius } = config;

        const executionTimes = Math.ceil(radius / MAX_RADIUS);
        const finalRadius = radius % MAX_RADIUS;

        const {
            texture: textureManager,
            uniforms: uniformManager,
            frameBuffer: fboManager,
        } = this.renderer.renderer;

        this.renderer.setTexUnitnumber(TEX_UNITNUMBER);
        this.renderer.activate();

        uniformManager.transfer(
            new UniformGroup([
                new UniformInt('u_radius', MAX_RADIUS),
                new UniformFloat('u_sigmaColor', 0.12),
                new UniformFloat('u_sigmaSpace', sigmaSpace(MAX_RADIUS)),
            ])
        );

        for (let i = 0; i < executionTimes; i++) {
            fboManager.bind(this.frameBuffers[i % 2]);
            this.renderer.draw({ flipY: false });

            textureManager.bind(this.frameBuffers[i % 2].clolorTexture, TEX_UNITNUMBER);
        }

        uniformManager.transfer(
            new UniformGroup([
                new UniformInt('u_radius', finalRadius),
                new UniformFloat('sigmaSpace', sigmaSpace(finalRadius)),
            ])
        );

        fboManager.unbind();

        this.renderer.draw({ flipY: true });
        this.renderer.deactivate();
    }
    public destroy() {
        this.frameBuffers[0].destroy();
        this.frameBuffers[1].destroy();

        this.renderer.destroy();
    }
}
