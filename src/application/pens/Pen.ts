import { ISpriteWorker } from 'application/ISpriteWorker';
import {
    Context2D,
    ContextLineConfig,
    ContextShadowConfig,
    ContextTextConfig,
} from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import { RasterizedPreviewer } from 'application/sprites/RasterizedPreviewer';
import { SpriteFillStyle } from 'application/sprites/Sprite';
import { BlendMode } from 'types';

//TODO : クラスの設計見直す

export type PenEvent = {
    /**ポインタの位置 */
    readonly pointerLoc: Vec2;
    /**筆圧 0 から 1*/
    readonly pressure: number;
};
export interface PenPrefs {
    /**手振れ補正 */
    readonly stabilization: number;
    /**リアルタイム手振れ補正 */
    readonly realTimeStabilization: boolean;
    /**塗りつぶし */
    readonly fillStyle: SpriteFillStyle;
    /**ブレンドモード */
    readonly blendMode: BlendMode;
    /**透明度 */
    readonly opacity: number;
    /**線の太さ */
    readonly lineWidth: number;
}

export abstract class Pen<T extends PenPrefs = PenPrefs> {
    readonly prefs: T;
    readonly stageSize: Vec2;
    constructor(stageSize: Vec2, prefs: T) {
        this.stageSize = stageSize;
        this.prefs = prefs;
    }
    abstract getWorker(rasterizedImage: Rasterizedmage): PenWorker;
    abstract setPrefs(valOrUpdater: ValueUpdater<T>): Pen<T>;
}

export abstract class PenWorker implements ISpriteWorker {
    abstract pointerDown(props: PenEvent): void;
    abstract pointerDrag(props: PenEvent): void;
    abstract pointerUp(props: PenEvent): void;
    abstract getPreviewSprite(): RasterizedPreviewer;
}
export interface ContextPenWorkerConfig {
    readonly line: ContextLineConfig | null;
    readonly shadow: ContextShadowConfig | null;
    readonly text: ContextTextConfig | null;
    readonly fillStyle: SpriteFillStyle;
    readonly globalAlpha: number | null;
    readonly globalCompositeOperation: GlobalCompositeOperation | null;
    readonly strokeStyle: SpriteFillStyle;
}

export abstract class ContextPenWorker extends PenWorker {
    protected readonly baseContext: Context2D;
    protected readonly lineContext: Context2D;
    protected readonly targetSprite: Rasterizedmage;
    protected readonly stageSize: Vec2;

    constructor(targetSprite: Rasterizedmage, stageSize: Vec2) {
        super();
        this.baseContext = new Context2D();
        this.lineContext = new Context2D();
        this.targetSprite = targetSprite;
        this.stageSize = stageSize;
    }
    private setConfig(context: Context2D, config: ContextPenWorkerConfig) {
        context
            .setLineConfig(config.line)
            .setShadowConfig(config.shadow)
            .setTextConfig(config.text)
            .setGlobalAlpha(config.globalAlpha)
            .setGlobalCompositeOperation(config.globalCompositeOperation)
            .setFillStyle(
                config.fillStyle === null ? null : config.fillStyle.createCanvasFillStyle(context)
            )
            .setStrokeStyle(
                config.strokeStyle === null
                    ? null
                    : config.strokeStyle.createCanvasFillStyle(context)
            );
    }
    protected setBaseContextconfig(config: ContextPenWorkerConfig) {
        this.setConfig(this.baseContext, config);
    }
    protected setLineContextconfig(config: ContextPenWorkerConfig) {
        this.setConfig(this.lineContext, config);
    }
    public getPreviewSprite() {
        return new RasterizedPreviewer(this.baseContext.getCanvas(), {
            ...this.targetSprite.prefs,
            scale: this.baseContext.size,
            rotation: 0,
            globalLocation: new Vec2(0, 0),
        });
    }
}
