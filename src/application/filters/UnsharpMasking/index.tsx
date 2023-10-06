import { FilterSource, FilterWorker } from '../Filter';
import { ImageEditor } from '../ImageEditor';
import { Vec2 } from 'application/core/units';

const unsharpMasking = require('./unsharpMasking.frag');

interface UnsharpMaskingConfig {
    radius: number;
    threshold: number;
}

class UnsharpMasking extends FilterWorker<UnsharpMaskingConfig> {
    private editor: ImageEditor;

    constructor(image: FilterSource) {
        super();
        const imageSize = new Vec2(image.width, image.height);

        this.editor = new ImageEditor(imageSize, unsharpMasking.default);
        this.editor.setImage(image, imageSize, false);
    }
    public execute(config: UnsharpMaskingConfig) {
        this.editor.listener[0] = ({ setUniformFloat, setUniformInt }) => {
            setUniformFloat('u_threshold', config.threshold);
            setUniformInt('u_radius', config.radius);
        };
        this.editor.execute(1);
    }
    public getResult() {
        return this.editor.getResult();
    }
}

export { UnsharpMasking };
