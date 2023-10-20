import { Filter, FilterTarget, FilterWorker } from '../Filter';
import { EditorShader, ImageEditor } from '../ImageEditor';
import { Vec2 } from 'application/core/units';

const gaussian = require('./gaussianBlur.frag');// eslint-disable-line
const MAX_RADIUS = 10;

export interface GaussianBlurConfig {
    radius: number;
}

export class GaussianBlur extends Filter<GaussianBlurConfig> {
    public getWorker(sprite: FilterTarget): FilterWorker<GaussianBlurConfig> {
        return new GaussianBlurWorker(sprite);
    }
}

const sigma = (ksize: number) => {
    return ksize / 3.0
}

export class GaussianBlurWorker extends FilterWorker<GaussianBlurConfig> {
    private editor: ImageEditor;

    constructor(sprite: FilterTarget) {
        super(sprite);
        const imageSize = new Vec2(sprite.image.width, sprite.image.height);
        const shader: EditorShader = {
            fragmentShaderSource: gaussian.default,
            uniforms: [
                {
                    name: 'u_radius',
                    type: 'int',
                    value: MAX_RADIUS
                }, {
                    name: 'u_sigma',
                    type: 'float',
                    value: sigma(MAX_RADIUS)
                }
            ]
        }

        this.editor = new ImageEditor(imageSize, shader);
        this.editor.setImage(sprite.image, imageSize, false);
    }
    public getResult() {
        return this.editor.getResult();
    }
    public execute(config: GaussianBlurConfig) {
        const { radius } = config;

        const executionTimes = Math.ceil(radius / MAX_RADIUS) * 2;
        const finalRadius = radius % MAX_RADIUS;

        for (let i = 0; i < executionTimes - 1; i++) {
            if (i % 2 === 0) {
                this.editor.listeners[i] = ({ setUniformFloat }) => {
                    setUniformFloat('u_horizontal', 1.0);
                }
            } else {
                this.editor.listeners[i] = ({ setUniformFloat }) => {
                    setUniformFloat('u_horizontal', 0.0);
                }
            }
        }

        if (finalRadius > 0) {
            this.editor.listeners[executionTimes - 1] = ({ setUniformInt, setUniformFloat }) => {
                setUniformFloat('u_horizontal', 0.0);
                setUniformInt('u_radius', finalRadius);
                setUniformFloat('u_sigma', sigma(finalRadius));
            };
            this.editor.listeners[executionTimes - 2] = ({ setUniformInt, setUniformFloat }) => {
                setUniformFloat('u_horizontal', 1.0);
                setUniformInt('u_radius', finalRadius);
                setUniformFloat('u_sigma', sigma(finalRadius));
            };
        }
        this.editor.execute(executionTimes);
    }
}
