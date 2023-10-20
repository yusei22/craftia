import { Filter, FilterTarget, FilterWorker } from '../Filter';
import { EditorShader, ImageEditor } from '../ImageEditor';
import { Vec2 } from 'application/core/units';

const unsharpMasking = require('./unsharpMasking.frag');// eslint-disable-line

export interface UnsharpMaskingConfig {
    radius: number;
    threshold: number;
}

export class UnsharpMasking extends Filter<UnsharpMaskingConfig> {
    public getWorker(sprite: FilterTarget): UnsharpMaskingWorker {
        return new UnsharpMaskingWorker(sprite);
    }
}

export class UnsharpMaskingWorker extends FilterWorker<UnsharpMaskingConfig> {
    private editor: ImageEditor;

    constructor(sprite: FilterTarget) {
        super(sprite);
        const imageSize = new Vec2(sprite.image.width, sprite.image.height);
        const shader: EditorShader = {
            fragmentShaderSource: unsharpMasking.default,
        };

        this.editor = new ImageEditor(imageSize, shader);
        this.editor.setImage(sprite.image, imageSize, false);
    }
    public getResult() {
        return this.editor.getResult();
    }
    public execute(config: UnsharpMaskingConfig) {
        const { threshold, radius } = config;

        this.editor.listeners[0] = ({ setUniformFloat, setUniformInt }) => {
            setUniformFloat('u_threshold', threshold);
            setUniformInt('u_radius', radius);
        };

        this.editor.execute(1);
    }
}
