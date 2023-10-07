import { Vec2 } from "application/core/units";
import { getArtBoardPointFromGlobal, getGlobalFromArtBoardPoint } from "application/utils";
import { artboardTransformAtom } from "dataflow"
import { useSetRecoilState } from "recoil"

const getAnchorFromViewPoint = (
    artBoardLoc: Vec2,
    artBoardScale: Vec2,
    artBoardAnchor: Vec2,
    artboardRotation: number,
    anchorViewPoint: Vec2
) => {
    const newAnchorRerativeLoc = getArtBoardPointFromGlobal(
        artBoardLoc,
        artBoardScale,
        artBoardAnchor,
        artboardRotation,
        anchorViewPoint
    )
    return new Vec2(
        newAnchorRerativeLoc.x / artBoardScale.x,
        newAnchorRerativeLoc.y / artBoardScale.y,
    )
}

const useChangeArtboardAnchorFromViewPoint = () => {
    const setArtboardTrans = useSetRecoilState(artboardTransformAtom);

    return (newAnchorViewPoint: Vec2, freezeTransform: boolean) => {
        if (freezeTransform) {

            setArtboardTrans(({ anchor, location, scale, rotation }) => {
                const newAnchor = getAnchorFromViewPoint(
                    new Vec2(location),
                    new Vec2(scale),
                    new Vec2(anchor),
                    rotation,
                    newAnchorViewPoint
                )
                return {
                    anchor: newAnchor.toArray(),
                    location: newAnchorViewPoint.toArray(),
                    scale,
                    rotation
                }
            })
        } else {
            setArtboardTrans(({ anchor, location, scale, rotation }) => {
                const newAnchor = getAnchorFromViewPoint(
                    new Vec2(location),
                    new Vec2(scale),
                    new Vec2(anchor),
                    rotation,
                    newAnchorViewPoint
                )

                return {
                    anchor: newAnchor.toArray(),
                    location: location,
                    scale: scale,
                    rotation: rotation,
                }
            })
        }
    }
}
export { useChangeArtboardAnchorFromViewPoint };