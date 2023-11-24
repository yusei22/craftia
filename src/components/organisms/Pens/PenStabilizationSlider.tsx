import { useRecoilState } from 'recoil';
import { NumberField } from 'components/molecules/NumberField';
import { MIN_PEN_Stabilization, MAX_PEN_Stabilization } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';

export const PenStabilizationSlider = ({ className }: { className?: string }) => {
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
        <NumberField
            className={className}
            id="drawPanelSliderStabilization"
            min={MIN_PEN_Stabilization}
            max={MAX_PEN_Stabilization}
            setValue={onStabilizationChange}
            value={penVal.prefs.stabilization}
            step={1}
            label="手振れ補正"
            css={{
                flexFlow: 'column',
            }}
        />
    );
};
