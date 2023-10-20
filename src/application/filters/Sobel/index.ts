import { Filter, FilterTarget, FilterWorker } from '../Filter';
import { EditorShader, ImageEditor } from '../ImageEditor';
import { Vec2 } from 'application/core/units';

const sobel = require('./sobel.frag');// eslint-disable-line

const lateralKernel = [-1.0, 0.0, 1.0, -2.0, 0.0, 2.0, -1.0, 0.0, 1.0];
const verticalKernel = [1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0];

export interface SobelConfig {}

export class Sobel extends Filter<SobelConfig> {
    public getWorker(sprite: FilterTarget): SobelWorker {
        return new SobelWorker(sprite);
    }
}

export class SobelWorker extends FilterWorker<SobelConfig> {
    private editor: ImageEditor;

    constructor(sprite: FilterTarget) {
        super(sprite);
        const imageSize = new Vec2(sprite.image.width, sprite.image.height);
        const shader: EditorShader = {
            fragmentShaderSource: sobel.default,
            uniforms: [
                {
                    name: 'u_lateralKernel',
                    type: 'float',
                    value: lateralKernel,
                },
                {
                    name: 'u_verticalKernel',
                    type: 'float',
                    value: verticalKernel,
                },
            ],
        };

        this.editor = new ImageEditor(imageSize, shader);
        this.editor.setImage(sprite.image, imageSize, false);
    }
    public getResult() {
        return this.editor.getResult();
    }
    public execute() {
        this.editor.execute(1);
    }
}
