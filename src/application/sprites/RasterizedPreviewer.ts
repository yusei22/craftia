import { Previewer, PreviewerPrefs } from './Previewer';
import { Rasterizedmage } from './RasterizedImage';
import { SpritePrefs } from './Sprite';
import { Context2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';

export class RasterizedPreviewer extends Previewer {
    public setSpritePrefs(valOrUpdater: ValueUpdater<SpritePrefs> | SpritePrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;

        const newRasterizedPreviewerPrefs = { ...this.prefs, ...newPrefs };

        return new RasterizedPreviewer(this.source, newRasterizedPreviewerPrefs);
    }
    public setPreviewerPrefs(valOrUpdater: ValueUpdater<PreviewerPrefs> | PreviewerPrefs) {
        const newPrefs =
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater;
        return new RasterizedPreviewer(this.source, newPrefs);
    }
    public async createStatic() {
        const image = await new PreviewRasterizer().rasterize(this);
        return new Rasterizedmage(image, this.prefs);
    }
}

class PreviewRasterizer {
    private ctx: Context2D;
    constructor() {
        this.ctx = new Context2D();
    }
    public rasterize(previewer: Previewer) {
        this.ctx.viewport(previewer.prefs.scale);

        this.ctx.translate(previewer.prefs.globalLocation.times(1 / 2));
        this.ctx.rotate(previewer.prefs.rotation);
        this.ctx.translate(previewer.prefs.globalLocation.times(1 / 2).times(-1));

        this.ctx.drawImage(previewer.source, new Vec2(0, 0), previewer.prefs.scale);
        return createImageBitmap(this.ctx.getCanvas());
    }
}
