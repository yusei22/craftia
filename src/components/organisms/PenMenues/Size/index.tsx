import { useRecoilState } from 'recoil';
import { SmallNumberField } from 'components/molecules/SmallNumberField';
import { MAX_PEN_WIDTH, MIN_PEN_WIDTH } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';

export const PenSizeField = ({ className }: { className?: string }) => {
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
        <SmallNumberField
            className={className}
            id="drawPanelSliderLineWidth"
            min={MIN_PEN_WIDTH}
            max={MAX_PEN_WIDTH}
            setValue={onPenWidthChange}
            value={penVal.prefs.lineWidth}
            step={1}
            label="ブラシサイズ："
        />
    );
};
