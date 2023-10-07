import { Vec2 } from "application/core/units";
import { rotatePoint } from "application/utils";
import { artboardTransformAtom } from "dataflow"
import { useSetRecoilState } from "recoil"

const useChangeArtboardAnchor = () => {
    const setArtboardTrans = useSetRecoilState(artboardTransformAtom);

    return (newAnchor: Vec2, freezeTransform: boolean) => {
        if (freezeTransform) {
            setArtboardTrans(({ anchor, location, scale, rotation }) => {
                const currentAnchor = new Vec2(anchor);
                const currentLocation = new Vec2(location);
                const currentScale = new Vec2(scale);

                const AnchorsRelativeDifference = new Vec2(
                    (newAnchor.x - currentAnchor.x) * currentScale.x,
                    (newAnchor.y - currentAnchor.y) * currentScale.y,
                )

                const newLocation = rotatePoint(
                    currentLocation,
                    currentLocation.add(AnchorsRelativeDifference),
                    rotation
                )
                return {
                    anchor: newAnchor.toArray(),
                    location: newLocation.toArray(),
                    scale: currentScale.toArray(),
                    rotation: rotation,
                }
            })
        } else {
            setArtboardTrans(({ location, scale, rotation }) => {
                return {
                    anchor: newAnchor.toArray(),
                    location,
                    scale,
                    rotation,
                }
            })
        }
    }
}

export { useChangeArtboardAnchor };