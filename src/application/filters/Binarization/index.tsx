import { Context2D } from 'application/core/context-2d';
import { FilterTarget, FilterExecutor, GLFilter } from '../Filter';
import { TexRenderer } from '../TexRenderer';
import { Vec2 } from 'application/core/units';
import { UniformFloat, UniformGroup, UniformInt } from 'application/core/web-gl2';

const binarization = require('./binarization.frag');// eslint-disable-line
const TEX_UNITNUMBER = 0;

export interface BinarizationConfig {
    threshold: number
}

export class Binarization extends GLFilter<BinarizationConfig> {
    public getExecutor(gl: WebGL2RenderingContext, sprite: FilterTarget): BinarizationExecutor {
        return new BinarizationExecutor(gl, sprite);
    }
}

export class BinarizationExecutor extends FilterExecutor<BinarizationConfig> {
    private renderer: TexRenderer;

    constructor(gl: WebGL2RenderingContext, sprite: FilterTarget) {
        super(sprite);

        const imageSize = new Vec2(sprite.image.width, sprite.image.height);

        this.renderer = new TexRenderer(gl);
        this.renderer.setFragmentShader(binarization.default, [
            new UniformInt('u_texture', TEX_UNITNUMBER),
        ]);
        this.renderer.setTexVertex(new Vec2(0, 0), imageSize);
        this.renderer.setTexPixels(sprite.image);
    }
    
    public getResult() {
        return this.renderer.renderer.getCanvas();
    }

    public execute(config: BinarizationConfig) {
        this.renderer.setTexUnitnumber(TEX_UNITNUMBER);
        this.renderer.activate();
        this.renderer.renderer.uniforms.transfer(new UniformGroup([
            new UniformFloat('u_threshold', config.threshold ?? 0.5)
        ]))
        this.renderer.draw({ flipY: true });
        this.renderer.deactivate();
    }

    static async discriminantAnalysishreshold(image: ImageBitmap | HTMLCanvasElement | OffscreenCanvas | ImageData) {
        const imageData = image instanceof ImageData ? image : getImageData(image)
        return new Promise<number>((resolve) => {
            resolve(getThreshold(imageData))
        })
    }
}

const getImageData = (image: ImageBitmap | HTMLCanvasElement | OffscreenCanvas) => {
    const ctx = new Context2D();
    const imageSize = new Vec2(
        image.width,
        image.height,
    )
    ctx.viewport(imageSize)
    ctx.drawImage(image, new Vec2(0, 0));

    return ctx.getImageData(new Vec2(0, 0), imageSize);
}

const getThreshold = (imageData: ImageData) => {
    const distributions = getColorDistributions(imageData);
    let maxMolecule = 0;
    let _threshold = 0;

    for (let threshold = 0; threshold < 256; threshold++) {
        let destBlack = 0;
        let blackPixels = 0;

        for (let i = 0; i < threshold; i++) {
            destBlack += i * distributions[i];
            blackPixels += distributions[i];
        }

        let destWhite = 0;
        let whitePixels = 0;

        for (let i = threshold; i < 256; i++) {
            destWhite += i * distributions[i];
            whitePixels += distributions[i];
        }

        const aveBlack = destBlack / blackPixels;
        const aveWhite = destWhite / whitePixels;

        const molecule = blackPixels * whitePixels * Math.pow((aveBlack - aveWhite), 2);

        if (molecule > maxMolecule) {
            maxMolecule = molecule;
            _threshold = threshold;
        }
    }
    return _threshold;
}

const getColorDistributions = (imageData: ImageData) => {
    const d = imageData.data;
    const ave = (r: number, g: number, b: number) => (r + g + b) / 3

    let distributions: number[] = new Array(256).fill(0)

    for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] <= 0) continue;

        const brightness = ave(d[i], d[i + 1], d[i + 2]);
        distributions[brightness]++;
    }

    return distributions;
}