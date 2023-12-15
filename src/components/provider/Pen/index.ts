import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Vec4 } from 'application/core/units';
import { NormalPen } from 'application/pens/normalpen';
import { FillSolid } from 'application/sprites/SpriteFill';
import { stageResolutionAtom } from 'dataflow';
import { penAtom } from 'dataflow/pens/penAtom';

const PenProvider = ({ children }: { children?: React.ReactNode }) => {
    const setPen = useSetRecoilState(penAtom);
    const stageResolution = useRecoilValue(stageResolutionAtom);
    useEffect(() => {
        setPen(
            new NormalPen(stageResolution, {
                stabilization: 0,
                realTimeStabilization: false,
                fillStyle: new FillSolid({ color: new Vec4(200, 200, 200, 1) }),
                blendMode: 'source-over',
                opacity: 0.8,
                lineWidth: 10,
            })
        );
    }, [stageResolution]);
    return children;
};
export { PenProvider };
