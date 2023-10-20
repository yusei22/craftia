import { Filter, FilterTarget, FilterWorker } from '../Filter';
import { EditorShader, ImageEditor } from '../ImageEditor';
import { Vec2 } from 'application/core/units';

const inversion = require('./inversion.frag');// eslint-disable-line

export interface InversionConfig {}

export class Inversion extends Filter<InversionConfig> {
    public getWorker(sprite: FilterTarget): InversionWorker {
        return new InversionWorker(sprite);
    }
}

export class InversionWorker extends FilterWorker<InversionConfig> {
    private editor: ImageEditor;

    constructor(sprite: FilterTarget) {
        super(sprite);
        const imageSize = new Vec2(sprite.image.width, sprite.image.height);
        const shader: EditorShader = {
            fragmentShaderSource: inversion.default,
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
