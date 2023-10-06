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
    artBoardRotation: number,
    pointerLoc: Vec2
) {
    const anchorRerativeLoc = new Vec2(
        artBoardAnchor.x * artBoardSize.x,
        artBoardAnchor.y * artBoardSize.y
    );
    const startPoint = artBoardLoc.sub(anchorRerativeLoc);
    const centerPoint = startPoint.add(artBoardSize.times(0.5));
    const rerativeCenterfPoint = artBoardSize.times(0.5);

    const pointerRelativeLoc = pointerLoc.sub(centerPoint);

    const artBoardPointerLoc_x =
        pointerRelativeLoc.x * Math.cos(artBoardRotation) +
        pointerRelativeLoc.y * Math.sin(artBoardRotation);

    const artBoardPointerLoc_y = (
        pointerRelativeLoc.x * Math.sin(artBoardRotation) +
        pointerRelativeLoc.y * Math.cos(artBoardRotation)) * -1

    return new Vec2(artBoardPointerLoc_x, artBoardPointerLoc_y).add(rerativeCenterfPoint);
}


function getGlobalFromArtBoardPoint(
    artBoardLoc: Vec2,
    artBoardSize: Vec2,
    artBoardAnchor: Vec2,
    artBoardRotation: number,
    artboardPoint: Vec2
) {
    const anchorRerativeLoc = new Vec2(
        artBoardAnchor.x * artBoardSize.x,
        artBoardAnchor.y * artBoardSize.y
    );
    const startPoint = artBoardLoc.sub(anchorRerativeLoc);
    const centerPoint = startPoint.add(artBoardSize.times(0.5));
    const rerativeCenterfPoint = artBoardSize.times(0.5);

    const pointRelativeLoc = artboardPoint.sub(rerativeCenterfPoint);

    const rotatedRelativeLoc_x =
        pointRelativeLoc.x * Math.cos(-artBoardRotation) +
        pointRelativeLoc.y * Math.sin(-artBoardRotation);

    const rotatedRelativeLoc_y = (
        pointRelativeLoc.x * Math.sin(-artBoardRotation) +
        pointRelativeLoc.y * Math.cos(-artBoardRotation)) * -1

    return new Vec2(rotatedRelativeLoc_x, rotatedRelativeLoc_y).add(centerPoint);
}

export { rectZoom, getRectZoomLoc, getArtBoardPointFromGlobal, getGlobalFromArtBoardPoint };