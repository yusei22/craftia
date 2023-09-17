import { RenderingCel } from '../rendering-cel/RenderingCel';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';

class CelRenderer {
    readonly context: Context2D;
    public get size() {
        return this.context.size;
    }
    constructor(size?: Vec2) {
        this.context = new Context2D();
        if (size) this.viewport(size);
    }
    /**
     * レンダラのサイズを変更
     * @param size サイズ
     */
    public viewport(size: Vec2) {
        this.context.viewport(size);
        return this;
    }
    /**
     * レンダラをクリア
     */
    public clear() {
        this.context.clear();
        return this;
    }
    /**
     * セルを描画
     * @param cel 描画するセル
     * @returns
     */
    public renderCel(cel: RenderingCel) {
        if (!cel.preferences.visible || cel.source === null) return this;

        this.context
            .setBlendMode(cel.preferences.blendMode)
            .setOpacity(cel.preferences.opacity)
            .setShadow(cel.preferences.shadow);
        if (
            cel.preferences.cropLocation !== null &&
            cel.preferences.cropSize !== null &&
            cel.preferences.resize !== null
        ) {
            this.context.drawImage(
                cel.source,
                cel.preferences.cropLocation,
                cel.preferences.cropSize,
                cel.preferences.globalLocation,
                cel.preferences.resize
            );
        } else if (cel.preferences.resize !== null) {
            this.context.drawImage(cel.source, cel.preferences.globalLocation, cel.preferences.resize);
        } else {
            this.context.drawImage(cel.source, cel.preferences.globalLocation);
        }
        return this;
    }
}

export { CelRenderer };
