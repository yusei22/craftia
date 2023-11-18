import { FilterTarget, FilterWorker, GLFilter } from '../Filter';
import { TexRenderer } from '../TexRenderer';
import { Vec2 } from 'application/core/units';
import { Texture, UniformInt } from 'application/core/web-gl2';

const inversion = require('./inversion.frag');// eslint-disable-line
const TEX_UNITNUMBER = 0;

export interface InversionConfig {}

export class Inversion extends GLFilter<InversionConfig> {
    public getWorker(gl: WebGL2RenderingContext, sprite: FilterTarget): InversionWorker {
        return new InversionWorker(gl, sprite);
    }
}

export class InversionWorker extends FilterWorker<InversionConfig> {
    private rectRenderer: TexRenderer;
    private texture: Texture;

    constructor(gl: WebGL2RenderingContext, sprite: FilterTarget) {
        super(sprite);

        const imageSize = new Vec2(sprite.image.width, sprite.image.height);

        this.rectRenderer = new TexRenderer(gl);
        this.rectRenderer.setFragmentShader(inversion.default, [
            new UniformInt('u_texture', TEX_UNITNUMBER),
        ]);
        this.rectRenderer.setTexVertex(new Vec2(0, 0), imageSize);

        this.texture = new Texture().setPixcels(sprite.image, imageSize);
        this.rectRenderer.renderer.texture.update(this.texture);
    }
    public getResult() {
        return this.rectRenderer.renderer.getCanvas();
    }
    public execute() {
        this.rectRenderer.activate();

        this.rectRenderer.renderer.texture.bind(this.texture, TEX_UNITNUMBER);
        this.rectRenderer.draw({ flipY: true });
        this.rectRenderer.deactivate();
    }
}
