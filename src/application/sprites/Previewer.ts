import { SpritePrefs } from './Sprite';
import { Vec2 } from 'application/core/units';

export interface PreviewerPrefs extends SpritePrefs {
    readonly scale: Vec2;
    readonly rotation: number;
}
