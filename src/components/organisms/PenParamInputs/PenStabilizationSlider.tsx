import { useRecoilState } from 'recoil';
import Slider from 'components/molecules/Slider';
import { MIN_PEN_Stabilization, MAX_PEN_Stabilization } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';

export const PenStabilizationSlider = () => {
    const [penVal, setPen] = useRecoilState(penAtom);
    const onStabilizationChange = (stabilization: number) => {
        setPen((pen) =>
            pen.setPrefs((prefs) => ({
                ...prefs,
                stabilization: stabilization,
            }))
        );
    };
    return (
        <Slider
            uniqueId="drawPanel_slider_stabilization"
            min={MIN_PEN_Stabilization}
            max={MAX_PEN_Stabilization}
            setValue={onStabilizationChange}
            value={penVal.prefs.stabilization}
            step={1}
            label="手振れ補正"
            foldable={true}
            foldableBreakpoint="lg"
        />
    );
};
