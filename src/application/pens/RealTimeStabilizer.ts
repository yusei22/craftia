import { IStabilizer } from './IStabilizer';
import { Vec2 } from 'application/core/units';

class RealTimeStabilizer implements IStabilizer {
    private threshold: number;
    private points: Vec2[] = [];

    constructor(threshold: number) {
        this.threshold = threshold;
    }
    private isSkippableDistance(p1: Vec2, p2: Vec2) {
        return p1.distance(p2) < this.threshold;
    }
    public begin() {
        this.points = [];
    }
    public add(p: Vec2) {
        if (this.isSkippableDistance(this.getCurrent(), p)) {
            return;
        }
        this.points.push(p);
    }
    public getCurrent() {
        return this.points[this.points.length - 1] ?? new Vec2(0, 0);
    }
    public getPrevious() {
        return this.points[this.points.length - 2] ?? new Vec2(0, 0);
    }
    public getAll() {
        return this.points;
    }
    public getStabilizedAll() {
        return this.points;
    }
}
export { RealTimeStabilizer };
