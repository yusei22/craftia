import { FilterSource, FilterWorker } from '../Filter';
import { ImageEditor } from '../ImageEditor';
import { Vec2 } from 'application/core/units';

const bilateral = require('./bilateral.frag');
const MAX_RADIUS = 20;

interface BilateralConfig {
    radius: number;
    threshold: number;
}

class Bilateral extends FilterWorker<BilateralConfig> {
    private editor: ImageEditor;

    constructor(image: FilterSource) {
        super();
        const imageSize = new Vec2(image.width, image.height);

        this.editor = new ImageEditor(imageSize, bilateral.default);
        this.editor.setImage(image, imageSize, false);
    }
    public execute(config: BilateralConfig) {
        const executionTimes = Math.ceil(config.radius / MAX_RADIUS);
        const finalRadius = config.radius % MAX_RADIUS;

        this.editor.listener[0] = ({ setUniformInt }) => {
            setUniformInt('u_radius', MAX_RADIUS);
        };
        this.editor.listener[executionTimes - 1] = ({ setUniformInt }) => {
            setUniformInt('u_radius', finalRadius);
        };
        this.editor.execute(executionTimes);
    }
    public getResult() {
        return this.editor.getResult();
    }
}

export { Bilateral };
