import { useRecoilState } from 'recoil';
import Wrapper from 'components/layout/Wrapper';
import Slider from 'components/molecules/Slider';
import { MAX_PEN_OPACITY, MIN_PEN_OPACITY } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';
import { MQ } from 'mediaQuery';

export const PenOpacitySlider = () => {
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
        <Slider
            uniqueId="drawPanel_slider_lineOpacity"
            min={Math.round(MIN_PEN_OPACITY * 100)}
            max={Math.round(MAX_PEN_OPACITY * 100)}
            setValue={onPenOpacityChange}
            value={Math.round(penVal.prefs.opacity * 100)}
            step={1}
            label="不透明度"
            labelSize={100}
        />
    );
};
