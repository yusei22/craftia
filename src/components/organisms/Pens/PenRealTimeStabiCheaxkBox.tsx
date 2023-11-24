import { useRecoilState } from 'recoil';
import Checkbox from 'components/molecules/Checkbox';
import { penAtom } from 'dataflow/pens/penAtom';

export const PenRealTimeStabiCheaxkBox = ({ className }: { className?: string }) => {
    const [penVal, setPen] = useRecoilState(penAtom);
    const onRealTimeStabilizationChange = (val: boolean) => {
        setPen((pen) =>
            pen.setPrefs((prefs) => ({
                ...prefs,
                realTimeStabilization: val,
            }))
        );
    };
    return (
        <Checkbox
            className={className}
            size="sm"
            id="drawPanel_slider_realTimeStabilization"
            label="リアルタイム手振れ補正"
            checked={penVal.prefs.realTimeStabilization}
            setChecked={onRealTimeStabilizationChange}
        />
    );
};
