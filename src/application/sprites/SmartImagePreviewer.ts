import { Previewer, PreviewerPrefs } from './Previewer';
import { SmartImage } from './SmartImage';
import { ValueUpdater } from 'application/core/types';

export class SmartImagePreviewer extends Previewer {
    public async createStatic() {
        const image = await createImageBitmap(this.source);
        return new SmartImage(image, this.prefs);
    }
    public setPrefs(valOrUpdater: ValueUpdater<PreviewerPrefs> | PreviewerPrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        return new SmartImagePreviewer(this.source, newPrefs);
    }
}
