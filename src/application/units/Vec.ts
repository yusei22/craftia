import { Vec2 } from './Vec2';
import { Vec3 } from './Vec3';
import { Vec4 } from './Vec4';
interface Vec {
  inverse: any;
  clone: any;
  add: any;
  sub: any;
  times: any;
  dot: any;
}
function isVec(value: any): value is Vec {
  if (value instanceof Vec2 || value instanceof Vec3 || value instanceof Vec4) {
    return true;
  }
  return false;
}
export { isVec };
export type { Vec };
