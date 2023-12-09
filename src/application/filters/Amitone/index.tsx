import { FilterTarget, FilterExecutor, GLFilter } from '../Filter';
import { TexRenderer } from '../TexRenderer';
import { Vec2 } from 'application/core/units';
import {
    TexPixcels,
    Texture,
    UniformFloat,
    UniformGroup,
    UniformInt,
} from 'application/core/web-gl2';

const amitone = require('./amitone.frag');// eslint-disable-line
const TEX_UNITNUMBER = 0;
const TONE_UNITNUMBER = 1;

export interface AmitoneConfig {
    tone: {
        image: TexPixcels;
        size: Vec2;
    };
    threshold1: number;
    threshold2: number;
}

export class Amitone extends GLFilter<AmitoneConfig> {
    public getExecutor(gl: WebGL2RenderingContext, sprite: FilterTarget): AmitoneExecutor {
        return new AmitoneExecutor(gl, sprite);
    }
}

export class AmitoneExecutor extends FilterExecutor<AmitoneConfig> {
    private renderer: TexRenderer;
    private tone: Texture;

    private _toneImage: TexPixcels | null;
    private _toneSize: Vec2 | null;

    constructor(gl: WebGL2RenderingContext, sprite: FilterTarget) {
        super(sprite);

        const imageSize = new Vec2(sprite.image.width, sprite.image.height);

        this.renderer = new TexRenderer(gl);
        this.renderer.setFragmentShader(amitone.default, [
            new UniformInt('u_texture', TEX_UNITNUMBER),
            new UniformInt('u_tone', TONE_UNITNUMBER),
        ]);

        this.renderer.setTexVertex(new Vec2(0, 0), imageSize);
        this.renderer.setTexPixels(sprite.image);

        this.tone = new Texture();
        this._toneImage = null;
        this._toneSize = null;
    }

    private updateTone(image: TexPixcels, size: Vec2) {
        if (image === this._toneImage && size === this._toneSize) return;

        if (image === this._toneImage) {
            this.tone.setSize(size);

            this._toneSize = size;
            return;
        }

        this._toneSize = size;
        this._toneImage = image;

        this.tone.setPixcels(image, size, { repeat: true });
        this.renderer.renderer.texture.update(this.tone);
    }

    public getResult() {
        return this.renderer.renderer.getCanvas();
    }

    public execute(config: AmitoneConfig) {
        this.updateTone(config.tone.image, config.tone.size);

        this.renderer.setTexUnitnumber(TEX_UNITNUMBER);
        this.renderer.activate();
        this.renderer.renderer.texture.bind(this.tone, TONE_UNITNUMBER);
        this.renderer.renderer.uniforms.transfer(
            new UniformGroup([
                new UniformFloat('u_threshold_1', config.threshold1),
                new UniformFloat('u_threshold_2', config.threshold2),
            ])
        );
        this.renderer.draw({ flipY: true });
        this.renderer.deactivate();
    }
}
