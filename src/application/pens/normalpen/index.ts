import { DeferredStabilizer } from '../DeferredStabilizer';
import { ContextPenWorker, ContextPenWorkerConfig, Pen, PenEvent, PenPrefs } from '../Pen';
import { RealTimeStabilizer } from '../RealTimeStabilizer';
import { Context2D } from 'application/core/context-2d';
import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';

export interface NormalPenPrefs extends PenPrefs {}

export class NormalPen extends Pen<NormalPenPrefs> {
    constructor(artboardSize: Vec2, prefs: NormalPenPrefs) {
        super(artboardSize, prefs);
    }
    public getWorker(rasterizedImage: Rasterizedmage): NormalPenWorker {
        return new NormalPenWorker(this.artboardSize, rasterizedImage, this.prefs);
    }
    public setPrefs = (valOrUpdater: ValueUpdater<NormalPenPrefs>) => {
        return new NormalPen(
            this.artboardSize,
            typeof valOrUpdater === 'function' ? valOrUpdater(this.prefs) : valOrUpdater
        );
    };
}
const baseContextConfig = (prefs: NormalPenPrefs): ContextPenWorkerConfig => ({
    line: null,
    shadow: null,
    text: null,
    fillStyle: null,
    globalAlpha: prefs.opacity,
    globalCompositeOperation: prefs.blendMode,
    strokeStyle: null,
});
const lineContextConfig = (prefs: NormalPenPrefs): ContextPenWorkerConfig => ({
    line: {
        lineCap: 'round',
        lineDashOffset: 0,
        lineJoin: 'round',
        lineWidth: prefs.lineWidth,
    },
    shadow: null,
    text: null,
    fillStyle: null,
    globalAlpha: prefs.opacity,
    globalCompositeOperation: 'source-over',
    strokeStyle: prefs.fillStyle,
});
export class NormalPenWorker extends ContextPenWorker {
    private readonly prefs: NormalPenPrefs;
    private readonly stabilizer: DeferredStabilizer | RealTimeStabilizer;
    private readonly targetSpriteVisible: Rasterizedmage;

    constructor(artboardSize: Vec2, targetSprite: Rasterizedmage, prefs: NormalPenPrefs) {
        super(targetSprite, artboardSize);
        this.targetSpriteVisible = this.targetSprite.copy().setSpritePrefs((culVal) => ({
            ...culVal,
            shadowBlur: null,
            shadowColor: null,
            shadowOffset: null,
            blendMode: 'source-over',
            opacity: 1.0,
        }));
        this.prefs = prefs;

        this.stabilizer = this.prefs.realTimeStabilization
            ? new RealTimeStabilizer(this.prefs.stabilization)
            : new DeferredStabilizer(this.prefs.stabilization);

        this.baseContext.viewport(artboardSize);
        this.lineContext.viewport(artboardSize);
        this.applyLine();
    }
    private applyLine() {
        this.baseContext.clear();

        //TODO:ここ何とかする
        this.targetSpriteVisible.draw(this.baseContext, null as unknown as Context2D);

        this.setBaseContextconfig(baseContextConfig(this.prefs));

        this.baseContext.drawImage(this.lineContext.getCanvas(), new Vec2(0, 0));
    }
    private setLineConfig() {
        this.setLineContextconfig(lineContextConfig(this.prefs));
    }
    public drawPoints(points: Vec2[]) {
        this.setLineConfig();
        this.lineContext.resetTransform();
        this.lineContext.clear();
        this.lineContext.beginPath();

        this.lineContext.moveTo(points[0]);

        for (let i = 1; i < points.length - 1; i++) {
            const midPoint = points[i].midpoint(points[i - 1]);

            this.lineContext.quadraticCurveTo(points[i - 1], midPoint);
        }

        this.lineContext.stroke();
        this.applyLine();
    }

    public pointerDown(e: PenEvent) {
        this.stabilizer.begin();
        this.stabilizer.add(e.pointerLoc);

        this.drawPoints(this.stabilizer.getAll());
    }
    public pointerDrag(e: PenEvent) {
        this.stabilizer.add(e.pointerLoc);

        this.drawPoints(this.stabilizer.getAll());
    }
    public pointerUp(e: PenEvent) {
        this.stabilizer.add(e.pointerLoc);

        this.drawPoints(this.stabilizer.getStabilizedAll());
    }
}
