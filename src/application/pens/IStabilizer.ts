import { Vec2 } from 'application/core/units';

interface IStabilizer {
    add(p: Vec2): void;
    begin(): void;
    getCurrent(): Vec2;
    getPrevious(): Vec2;
    getStabilizedAll(): Vec2[] | null;
}
export type { IStabilizer };
