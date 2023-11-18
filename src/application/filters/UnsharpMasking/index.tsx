import { FilterTarget, FilterWorker, GLFilter } from '../Filter';
import { TexRenderer } from '../TexRenderer';
import { Vec2 } from 'application/core/units';
import { UniformFloat, UniformGroup, UniformInt } from 'application/core/web-gl2';

const unsharpMasking = require('./unsharpMasking.frag');// eslint-disable-line
const TEX_UNITNUMBER = 0;

export interface UnsharpMaskingConfig {
    radius: number;
    threshold: number;
}

export class UnsharpMasking extends GLFilter<UnsharpMaskingConfig> {
    public getWorker(gl: WebGL2RenderingContext, sprite: FilterTarget): UnsharpMaskingWorker {
        return new UnsharpMaskingWorker(gl, sprite);
    }
}

export class UnsharpMaskingWorker extends FilterWorker<UnsharpMaskingConfig> {
    private renderer: TexRenderer;

    constructor(gl: WebGL2RenderingContext, sprite: FilterTarget) {
        super(sprite);

        const imageSize = new Vec2(sprite.image.width, sprite.image.height);

        this.renderer = new TexRenderer(gl);
        this.renderer.setFragmentShader(unsharpMasking.default, [
            new UniformInt('u_texture', TEX_UNITNUMBER),
        ]);
        this.renderer.setTexVertex(new Vec2(0, 0), imageSize);
        this.renderer.setTexPixels(sprite.image);
    }
    public getResult() {
        return this.renderer.renderer.getCanvas();
    }
    public execute(config: UnsharpMaskingConfig) {
        const { threshold, radius } = config;

        this.renderer.activate();

        this.renderer.setTexUnitnumber(TEX_UNITNUMBER);
        this.renderer.renderer.uniforms.transfer(
            new UniformGroup([
                new UniformFloat('u_threshold', threshold),
                new UniformInt('u_radius', radius),
            ])
        );

        this.renderer.draw({ flipY: true });
        this.renderer.deactivate();
    }
}
