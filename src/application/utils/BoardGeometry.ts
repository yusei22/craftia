import { ValueUpdater } from 'application/core/types';
import { Vec2 } from 'application/core/units';

/**
 * 点を時計回りに回転する
 * @param center
 * @param point
 * @param angle
 * @returns
 */
export function rotatePoint(center: Vec2, point: Vec2, angle: number): Vec2 {
    // 平行移動
    const translatedPoint = point.sub(center);
    // 回転
    const rotatedPoint = new Vec2(
        translatedPoint.x * Math.cos(angle) - translatedPoint.y * Math.sin(angle),
        translatedPoint.x * Math.sin(angle) + translatedPoint.y * Math.cos(angle)
    );
    // 平行移動した分戻す
    const finalPointB = rotatedPoint.add(center);
    return finalPointB;
}

export class BoardGeometry {
    private boardScale: Vec2;
    private boardAnchor: Vec2;
    private boardGlobalLoc: Vec2;
    private boardRotation: number;

    private pinGlobalLoc: Vec2;

    constructor() {
        this.boardScale = new Vec2(0, 0);
        this.boardAnchor = new Vec2(0, 0);
        this.boardGlobalLoc = new Vec2(0, 0);
        this.boardRotation = 0;

        this.pinGlobalLoc = new Vec2(0, 0);
    }

    /**
     * ボードのサイズをセットする
     * @param childScale ボードのサイズ
     */
    public setBoardScale(childScale: Vec2 | ValueUpdater<Vec2>) {
        this.boardScale =
            typeof childScale === 'function' ? childScale(this.boardScale) : childScale;
        return this;
    }

    /**
     * ボードのアンカーをセットする
     * @param childAnchor ボードのアンカー
     */
    public setBoardAnchor(childAnchor: Vec2 | ValueUpdater<Vec2>) {
        this.boardAnchor =
            typeof childAnchor === 'function' ? childAnchor(this.boardAnchor) : childAnchor;
        return this;
    }

    /**
     * ボードのグローバル位置をセットする
     * @param childGlobalLoc
     */
    public setBoardGlobalLoc(childGlobalLoc: Vec2 | ValueUpdater<Vec2>) {
        this.boardGlobalLoc =
            typeof childGlobalLoc === 'function'
                ? childGlobalLoc(this.boardGlobalLoc)
                : childGlobalLoc;
        return this;
    }

    /**
     * ボードの回転をセットする
     * @param childRotation ボードの回転(度数法)
     */
    public setBoardRotation(childRotation: number | ValueUpdater<number>) {
        this.boardRotation =
            typeof childRotation === 'function' ? childRotation(this.boardRotation) : childRotation;
        return this;
    }

    /**
     * グローバル位置からピンをおろす
     * @param pinGlobalLoc ピンをおろすグローバル位置
     */
    public setPinWithGlobal(pinGlobalLoc: Vec2) {
        this.pinGlobalLoc = pinGlobalLoc;
        return this;
    }

    /**
     * 相対位置からピンをおろす
     * @param pinRelativeLoc ピンをおろす相対位置
     */
    public setPinWithRelative(pinRelativeLoc: Vec2) {
        const anchorRerativeLoc = new Vec2(
            this.boardAnchor.x * this.boardScale.x,
            this.boardAnchor.y * this.boardScale.y
        );

        const notRotatedStartPoint = this.boardGlobalLoc.sub(anchorRerativeLoc);

        this.pinGlobalLoc = rotatePoint(
            this.boardGlobalLoc,
            pinRelativeLoc.add(notRotatedStartPoint),
            this.boardRotation
        );
        return this;
    }

    /**
     * 正規化された相対位置からピンをおろす
     * @param pinRelativeLocNormalized ピンをおろす相対位置
     */
    public setPinWithRelativeNormalized(pinRelativeLocNormalized: Vec2) {
        this.setPinWithRelative(
            new Vec2(
                this.boardScale.x * pinRelativeLocNormalized.x,
                this.boardScale.y * pinRelativeLocNormalized.y
            )
        );
        return this;
    }

    /**
     * ピンのグローバル位置を取得する
     * @returns ピンのグローバル位置
     */
    public getPinGlobal() {
        return this.pinGlobalLoc;
    }

    /**
     * ピンの相対位置を取得する
     * @returns ピンの相対位置
     */
    public getPinRelative() {
        const anchorRerativeLoc = new Vec2(
            this.boardAnchor.x * this.boardScale.x,
            this.boardAnchor.y * this.boardScale.y
        );
        const notRotatedStartPoint = this.boardGlobalLoc.sub(anchorRerativeLoc);

        return rotatePoint(
            anchorRerativeLoc,
            this.pinGlobalLoc.sub(notRotatedStartPoint),
            -this.boardRotation
        );
    }

    /**
     * 正規化されたピンの相対位置を取得する
     * @returns ピンの相対位置
     */
    public getPinRelativeNormalized() {
        const pinRelativeLoc = this.getPinRelative();
        return new Vec2(pinRelativeLoc.x / this.boardScale.x, pinRelativeLoc.y / this.boardScale.y);
    }
}
