import { Previewer, PreviewerPrefs } from './Previewer';
import { SmartImage } from './SmartImage';
import { SpritePrefs } from './Sprite';
import { ValueUpdater } from 'application/core/types';

export class SmartImagePreviewer extends Previewer {
    public setSpritePrefs(valOrUpdater: ValueUpdater<SpritePrefs> | SpritePrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        const newPreviewerPrefs = { ...this.prefs, ...newPrefs };

        return new SmartImagePreviewer(this.source, newPreviewerPrefs);
    }
    public setPreviewerPrefs(valOrUpdater: ValueUpdater<PreviewerPrefs> | PreviewerPrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        return new SmartImagePreviewer(this.source, newPrefs);
    }
    public async createStatic() {
        const image = await createImageBitmap(this.source);
        return new SmartImage(image, this.prefs);
    }
}
