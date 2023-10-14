import { IStabilizer } from './IStabilizer';
import { Vec2 } from 'application/core/units';

class DeferredStabilizer implements IStabilizer {
    private threshold: number;
    private points: Vec2[] = [];

    constructor(threshold: number) {
        this.threshold = threshold;
    }
    public add(p: Vec2) {
        this.points.push(p);
    }
    public begin() {
        this.points = [];
    }
    public getPrevious() {
        if (this.points.length - 2 < 0) {
            return new Vec2(0, 0);
        }
        return this.points[this.points.length - 2];
    }
    public getCurrent() {
        if (this.points.length - 1 < 0) {
            return new Vec2(0, 0);
        }
        return this.points[this.points.length - 1];
    }
    public getAll() {
        return this.points;
    }
    public getStabilizedAll() {
        const stabilizedPoints: Vec2[] = [];
        let previousPint: Vec2;

        stabilizedPoints.push(this.points[0]);
        previousPint = this.points[0];

        for (let i = 1; i < this.points.length; i++) {
            if (!this.isSkippableDistance(this.points[i], previousPint)) {
                stabilizedPoints.push(this.points[i]);
                previousPint = this.points[i];
            }
        }
        return stabilizedPoints;
    }
    private isSkippableDistance(p1: Vec2, p2: Vec2) {
        return p1.distance(p2) < this.threshold;
    }
}
export { DeferredStabilizer };
