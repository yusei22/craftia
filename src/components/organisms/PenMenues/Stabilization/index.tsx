import { useRecoilState } from 'recoil';
import { SmallNumberField } from 'components/molecules/SmallNumberField';
import { MIN_PEN_Stabilization, MAX_PEN_Stabilization } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';

export const PenStabilizationField = ({ className }: { className?: string }) => {
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
        <SmallNumberField
            className={className}
            id="drawPanelSliderStabilization"
            min={MIN_PEN_Stabilization}
            max={MAX_PEN_Stabilization}
            setValue={onStabilizationChange}
            value={penVal.prefs.stabilization}
            step={1}
            label="手振れ補正："
        />
    );
};
