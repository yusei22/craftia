import { Vec2 } from 'application/core/units';

function getArtBoardPointFromGlobal(
    artboardLoc: Vec2,
    artboardSize: Vec2,
    artboardAnchor: Vec2,
    artboardRotation: number,
    globalPoint: Vec2
) {
    const anchorRerativeLoc = new Vec2(
        artboardAnchor.x * artboardSize.x,
        artboardAnchor.y * artboardSize.y
    );
    const notRotatedStartPoint = artboardLoc.sub(anchorRerativeLoc);
    const artBoardPoint = rotatePoint(
        anchorRerativeLoc,
        globalPoint.sub(notRotatedStartPoint),
        -artboardRotation
    )

    return artBoardPoint;
}


function getGlobalFromArtBoardPoint(
    artBoardLoc: Vec2,
    artBoardSize: Vec2,
    artBoardAnchor: Vec2,
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
    )

    return globalPoint;
}

/**
 * 点を時計回りに回転する
 * @param center 
 * @param point 
 * @param angle 
 * @returns 
 */
function rotatePoint(center: Vec2, point: Vec2, angle: number): Vec2 {
    // 平行移動
    const translatedPoint = point.sub(center);
    // 回転
    const rotatedPoint = new Vec2(
        translatedPoint.x * Math.cos(angle) - translatedPoint.y * Math.sin(angle),
        translatedPoint.x * Math.sin(angle) + translatedPoint.y * Math.cos(angle),
    )
    // 平行移動した分戻す
    const finalPointB = rotatedPoint.add(center);
    return finalPointB;
}

export { getArtBoardPointFromGlobal, getGlobalFromArtBoardPoint, rotatePoint };