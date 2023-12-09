import { FilterTarget, FilterExecutor, GLFilter } from '../Filter';
import { TexRenderer } from '../TexRenderer';
import { Vec2, Vec3 } from 'application/core/units';
import { UniformFloat, UniformInt } from 'application/core/web-gl2';
const sobel = require('./sobel.frag');// eslint-disable-line

const lateralKernel = [-1.0, 0.0, 1.0, -2.0, 0.0, 2.0, -1.0, 0.0, 1.0];
const verticalKernel = [1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0];
const TEX_UNITNUMBER = 0;

export interface SobelConfig {}

export class Sobel extends GLFilter<SobelConfig> {
    public getExecutor(gl: WebGL2RenderingContext, sprite: FilterTarget): SobelExecutor {
        return new SobelExecutor(gl, sprite);
    }
}

export class SobelExecutor extends FilterExecutor<SobelConfig> {
    private renderer: TexRenderer;

    constructor(gl: WebGL2RenderingContext, sprite: FilterTarget) {
        super(sprite);

        const imageSize = new Vec2(sprite.image.width, sprite.image.height);

        this.renderer = new TexRenderer(gl);
        this.renderer.setFragmentShader(sobel.default, [
            new UniformInt('u_texture', TEX_UNITNUMBER),
            new UniformFloat('u_lateralKernel', lateralKernel),
            new UniformFloat('u_verticalKernel', verticalKernel),
            new UniformFloat('u_lineColor', new Vec3(0, 0, 0)),
        ]);
        this.renderer.setTexVertex(new Vec2(0, 0), imageSize);
        this.renderer.setTexPixels(sprite.image);
    }
    public getResult() {
        return this.renderer.renderer.getCanvas();
    }
    public execute() {
        this.renderer.setTexUnitnumber(TEX_UNITNUMBER);
        this.renderer.activate();
        this.renderer.draw({ flipY: true });
        this.renderer.deactivate();
    }
    public destroy() {
        this.renderer.destroy();
    }
}
