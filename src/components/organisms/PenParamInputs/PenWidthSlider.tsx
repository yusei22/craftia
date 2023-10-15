import { useRecoilState } from 'recoil';
import Wrapper from 'components/layout/Wrapper';
import Slider from 'components/molecules/Slider';
import { MAX_PEN_WIDTH, MIN_PEN_WIDTH } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';
import { MQ } from 'mediaQuery';

export const PenWidthSlider = () => {
    const [penVal, setPen] = useRecoilState(penAtom);

    const onPenWidthChange = (width: number) => {
        setPen((pen) =>
            pen.setPrefs((prefs) => ({
                ...prefs,
                lineWidth: width,
            }))
        );
    };
    return (
        <Slider
            uniqueId="drawPanel_slider_lineWidth"
            min={MIN_PEN_WIDTH}
            max={MAX_PEN_WIDTH}
            setValue={onPenWidthChange}
            value={penVal.prefs.lineWidth}
            step={1}
            label="ブラシサイズ"
            foldable={false}
            labelSize={100}
        />
    );
};
