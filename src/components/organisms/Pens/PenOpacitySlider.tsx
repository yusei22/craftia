import { useRecoilState } from 'recoil';
import { NumberField } from 'components/molecules/NumberField';
import { MAX_PEN_OPACITY, MIN_PEN_OPACITY } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';

export const PenOpacitySlider = ({ className }: { className?: string }) => {
    const [penVal, setPen] = useRecoilState(penAtom);

    const onPenOpacityChange = (opacity: number) => {
        setPen((pen) =>
            pen.setPrefs((prefs) => ({
                ...prefs,
                opacity: opacity / 100,
            }))
        );
    };
    return (
        <NumberField
            className={className}
            id="drawPanelSliderLineOpacity"
            min={Math.round(MIN_PEN_OPACITY * 100)}
            max={Math.round(MAX_PEN_OPACITY * 100)}
            setValue={onPenOpacityChange}
            value={Math.round(penVal.prefs.opacity * 100)}
            step={1}
            label="不透明度"
            css={{
                flexFlow: 'column',
            }}
        />
    );
};
