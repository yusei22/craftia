import { Filter, FilterTarget, FilterWorker } from '../Filter';
import { ImageEditor } from '../ImageEditor';
import { Vec2 } from 'application/core/units';

const bilateral = require('./bilateral.frag');// eslint-disable-line
const MAX_RADIUS = 10;

export interface BilateralConfig {
    radius: number;
}

export class Bilateral extends Filter<BilateralConfig> {
    public getWorker(sprite: FilterTarget): FilterWorker<BilateralConfig> {
        return new BilateralWorker(sprite);
    }
}

export class BilateralWorker extends FilterWorker<BilateralConfig> {
    private editor: ImageEditor;

    constructor(sprite: FilterTarget) {
        super(sprite);
        const imageSize = new Vec2(sprite.image.width, sprite.image.height);

        this.editor = new ImageEditor(imageSize, bilateral.default);
        this.editor.setImage(sprite.image, imageSize, false);
    }
    protected getResult() {
        return this.editor.getResult();
    }
    public execute(config: BilateralConfig) {
        const { radius } = config;

        const executionTimes = Math.ceil(radius / MAX_RADIUS);
        const finalRadius = radius % MAX_RADIUS;

        this.editor.listener[0] = ({ setUniformInt }) => {
            setUniformInt('u_radius', MAX_RADIUS);
        };
        if (finalRadius > 0) {
            this.editor.listener[executionTimes - 1] = ({ setUniformInt }) => {
                setUniformInt('u_radius', finalRadius);
            };
        }
        this.editor.execute(executionTimes);
    }
}
