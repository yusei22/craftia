import { Vec2 } from 'application/core/units';
/**
 * グローバル上の点をartbord内の相対位置にして返す
 * @param artboardAnchor artboardのアンカー
 * @param artboardLoc artboardのロケーション
 * @param artboardScale artboardのスケール
 * @param artboardRotation artboardの回転
 * @param globalPoint グローバル上の点の位置
 * @returns artbord内の相対位置(0.0-1.0に正規化)
 */
export function getArtBoardNormalizedPointFromViewPoint(
    artboardAnchor: Vec2,
    artboardLoc: Vec2,
    artboardScale: Vec2,
    artboardRotation: number,
    globalPoint: Vec2
) {
    const anchorRerativeLoc = new Vec2(
        artboardAnchor.x * artboardScale.x,
        artboardAnchor.y * artboardScale.y
    );
    const notRotatedStartPoint = artboardLoc.sub(anchorRerativeLoc);
    const artBoardPoint = rotatePoint(
        anchorRerativeLoc,
        globalPoint.sub(notRotatedStartPoint),
        -artboardRotation
    );
    return new Vec2(artBoardPoint.x / artboardScale.x, artBoardPoint.y / artboardScale.y);
}
/**
 * 正規化したartbord上の相対位置をグローバル位置にして返す
 * @param artboardAnchor artboardのアンカー
 * @param artboardLoc artboardのロケーション
 * @param artboardScale artboardのスケール
 * @param artboardRotation artboardの回転
 * @param artboardPoint artbord内の相対位置(0.0-1.0で正規化)
 * @returns グローバル位置
 */
export function getViewPointFromArtBoardNormalizedPoint(
    artBoardAnchor: Vec2,
    artBoardLoc: Vec2,
    artBoardSize: Vec2,
    artboardRotation: number,
    artboardPoint: Vec2
) {
    const anchorRerativeLoc = new Vec2(
        artBoardAnchor.x * artBoardSize.x,
        artBoardAnchor.y * artBoardSize.y
    );

    const notRotatedStartPoint = artBoardLoc.sub(anchorRerativeLoc);
    const globalPoint = rotatePoint(
        artBoardLoc,
        artboardPoint.add(notRotatedStartPoint),
        artboardRotation
    );

    return globalPoint;
}

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
