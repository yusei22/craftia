import { FilterTarget, FilterWorker, GLFilter } from '../Filter';
import { TexRenderer } from '../TexRenderer';
import { Vec2 } from 'application/core/units';
import { FrameBuffer, UniformFloat, UniformGroup, UniformInt } from 'application/core/web-gl2';

const gaussian = require('./gaussianBlur.frag');// eslint-disable-line
const MAX_RADIUS = 15;
const TEX_UNITNUMBER = 0;

export interface GaussianBlurConfig {
    radius: number;
}

export class GaussianBlur extends GLFilter<GaussianBlurConfig> {
    public getWorker(
        gl: WebGL2RenderingContext,
        sprite: FilterTarget
    ): FilterWorker<GaussianBlurConfig> {
        return new GaussianBlurWorker(gl, sprite);
    }
}

const sigma = (ksize: number) => {
    return ksize / 1.5;
};

export class GaussianBlurWorker extends FilterWorker<GaussianBlurConfig> {
    private renderer: TexRenderer;
    private frameBuffers: [FrameBuffer, FrameBuffer];

    constructor(gl: WebGL2RenderingContext, sprite: FilterTarget) {
        super(sprite);

        const imageSize = new Vec2(sprite.image.width, sprite.image.height);

        this.renderer = new TexRenderer(gl);
        this.renderer.setFragmentShader(gaussian.default, [
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
    public execute(config: GaussianBlurConfig) {
        const { radius } = config;

        const executionTimes = Math.floor(radius / MAX_RADIUS) * 2;
        const finalRadius = radius % MAX_RADIUS || 0.5;

        const {
            texture: textureManager,
            uniforms: uniformManager,
            frameBuffer: fboManager,
        } = this.renderer.renderer;

        this.renderer.activate();
        this.renderer.setTexUnitnumber(TEX_UNITNUMBER);

        uniformManager.transfer(
            new UniformGroup([
                new UniformInt('u_radius', MAX_RADIUS),
                new UniformFloat('u_sigma', sigma(MAX_RADIUS)),
            ])
        );

        let i = 0;
        for (; i < executionTimes; i++) {
            uniformManager.transfer(
                new UniformGroup([new UniformFloat('u_horizontal', i % 2 === 1 ? 1.0 : 0.0)])
            );

            fboManager.bind(this.frameBuffers[i % 2]);
            this.renderer.draw({ flipY: false });

            textureManager.bind(this.frameBuffers[i % 2].clolorTexture, TEX_UNITNUMBER);
        }

        uniformManager.transfer(
            new UniformGroup([
                new UniformInt('u_radius', finalRadius),
                new UniformFloat('u_sigma', sigma(finalRadius)),
                new UniformFloat('u_horizontal', i % 2 === 1 ? 1.0 : 0.0),
            ])
        );

        fboManager.bind(this.frameBuffers[i % 2]);
        this.renderer.draw({ flipY: false });

        textureManager.bind(this.frameBuffers[i % 2].clolorTexture, TEX_UNITNUMBER);
        i++;
        uniformManager.transfer(
            new UniformGroup([new UniformFloat('u_horizontal', i % 2 === 0 ? 1.0 : -1.0)])
        );
        fboManager.unbind();
        this.renderer.draw({ flipY: true });

        this.renderer.deactivate();
    }
}
