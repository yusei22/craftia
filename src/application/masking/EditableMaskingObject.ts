import { IMaskingObject, MaskingImageSource } from './IMaskingObject';
import { createStaticMaskingObject } from './StaticMaskingObject';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';
import { MaskingPrefs } from 'application/preferences/masking/MaskingPrefs';

class EditableMaskingObject implements IMaskingObject {
    readonly preferences: MaskingPrefs;
    readonly source: HTMLCanvasElement;
    private context: Context2D;

    constructor(prefs: MaskingPrefs) {
        this.context = new Context2D();
        this.source = this.context.getCanvas();
        this.preferences = prefs;
    }
    public setSource(source: MaskingImageSource | ImageData | null) {
        if (source == null) {
            this.context.viewport(new Vec2(1, 1)).clear();
            return;
        }

        this.context.viewport(new Vec2(source.width, source.height));

        if (source instanceof ImageData) {
            this.context.putImageData(source, new Vec2(0, 0));
        } else {
            this.context.drawImage(source, new Vec2(0, 0));
        }
    }
    public async toStatic() {
        return createStaticMaskingObject(this.source, this.preferences);
    }
}
export { EditableMaskingObject };
