import { Vec2 } from 'application/core/units';
/**
 * 
 * @param currentLoc 
 * @param currentScale 
 * @param zoom 
 * @param zoomPoint 
 * @returns [位置、サイズ]
 */
function rectZoom(
    currentLoc: Vec2,
    currentScale: Vec2,
    zoom: number,
    zoomPoint: Vec2
): [Vec2, Vec2] {
    const x = zoomPoint.x - zoom * (zoomPoint.x - currentLoc.x);
    const y = zoomPoint.y - zoom * (zoomPoint.y - currentLoc.y);

    return [new Vec2(x, y), currentScale.times(zoom)];
}
function getRectZoomLoc(
    currentLoc: Vec2,
    zoom: number,
    zoomPoint: Vec2
): Vec2 {
    const x = zoomPoint.x - zoom * (zoomPoint.x - currentLoc.x);
    const y = zoomPoint.y - zoom * (zoomPoint.y - currentLoc.y);

    return new Vec2(x, y);
}

function getArtBoardPointFromGlobal(
    artBoardLoc: Vec2,
    artBoardSize: Vec2,
    artBoardAnchor: Vec2,
    artboardRotation: number,
    pointerLoc: Vec2
) {
    const anchorRerativeLoc = new Vec2(
        artBoardAnchor.x * artBoardSize.x,
        artBoardAnchor.y * artBoardSize.y
    );
    const notRotatedStartPoint = artBoardLoc.sub(anchorRerativeLoc);
    const ArtBoardPoint = rotatePointAroundCenter(
        artBoardLoc,
        pointerLoc.sub(notRotatedStartPoint),
        - artboardRotation
    )

    return ArtBoardPoint;
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
    const globalPoint = rotatePointAroundCenter(
        artBoardLoc,
        artboardPoint.add(notRotatedStartPoint),
        artboardRotation
    )

    return globalPoint;
}

function rotatePointAroundOrigin(point: Vec2, angle: number): Vec2 {
    const rotatedX = point.x * Math.cos(angle) - point.y * Math.sin(angle);
    const rotatedY = point.x * Math.sin(angle) + point.y * Math.cos(angle);
    return new Vec2(rotatedX, rotatedY)
}
function rotatePointAroundCenter(center: Vec2, point: Vec2, angle: number): Vec2 {
    //平行移動
    const translatedPoint = new Vec2(point.x - center.x, point.y - center.y);
    //回転
    const rotatedPoint = rotatePointAroundOrigin(translatedPoint, angle);
    //平行移動した分戻す
    return new Vec2(rotatedPoint.x + center.x, rotatedPoint.y + center.y)
}


export { rectZoom, getRectZoomLoc, getArtBoardPointFromGlobal, getGlobalFromArtBoardPoint, rotatePointAroundCenter };