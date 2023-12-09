import { FilterTarget, FilterExecutor, GLFilter } from '../Filter';
import { TexRenderer } from '../TexRenderer';
import { Vec2 } from 'application/core/units';
import { UniformInt } from 'application/core/web-gl2';

const inversion = require('./inversion.frag');// eslint-disable-line
const TEX_UNITNUMBER = 0;

export interface InversionConfig {}

export class Inversion extends GLFilter<InversionConfig> {
    public getExecutor(gl: WebGL2RenderingContext, sprite: FilterTarget): InversionExecutor {
        return new InversionExecutor(gl, sprite);
    }
}

export class InversionExecutor extends FilterExecutor<InversionConfig> {
    private renderer: TexRenderer;

    constructor(gl: WebGL2RenderingContext, sprite: FilterTarget) {
        super(sprite);

        const imageSize = new Vec2(sprite.image.width, sprite.image.height);

        this.renderer = new TexRenderer(gl);
        this.renderer.setFragmentShader(inversion.default, [
            new UniformInt('u_texture', TEX_UNITNUMBER),
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
}
