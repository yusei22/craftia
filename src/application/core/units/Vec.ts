import { Vec2 } from './Vec2';
import { Vec3 } from './Vec3';
import { Vec4 } from './Vec4';

type Vec = Vec2 | Vec3 | Vec4;

interface IVec {
    readonly inverse: Vec;
    /**
     * 足し算を行う
     * @param v 足すベクトル
     * @returns 結果(新しいベクトル)
     */
    readonly add: (v: this) => Vec;
    /**
     * 引き算を行う
     * @param v 引くベクトル
     * @returns 結果(新しいベクトル)
     */
    readonly sub: (v: this) => Vec;
    /**
     * 任意の数をベクトルの値それぞれに掛ける
     * @param n 掛ける値
     * @returns 結果(新しいベクトル)
     */
    readonly times: (n: number) => Vec;
    /**
     * 内積を求める
     * @param v 他方のベクトル
     * @returns 結果(新しいベクトル)
     */
    readonly dot: (v: this) => number;

    /**
     * 値が等しいか調べる
     * @param v 比較するベクトル
     * @returns 真偽地
     */
    readonly equal: (v: Vec) => boolean;

    /**
     * ユーグリッド距離を求める
     * @param v 他方のベクトル
     * @returns 結果( number型 )
     */

    readonly distance: (v: this) => number;
    /**
     * 配列に変換
     * @returns number型配列
     */
    readonly toArray: () => number[];
}

function isVec(value: unknown): value is Vec {
    if (value instanceof Vec2 || value instanceof Vec3 || value instanceof Vec4) {
        return true;
    }
    return false;
}

export { isVec };
export type { IVec, Vec };
