import Select from 'react-select';
import { useRecoilState } from 'recoil';
import Label from 'components/atoms/Label';
import { BLEND_MODE_LABEL, PEN_BLEND_MODE_VALUE } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';

const options = PEN_BLEND_MODE_VALUE.map((value) => ({
    value,
    label: BLEND_MODE_LABEL[value],
}));

export const PenBlendModeSelector = () => {
    const [penVal, setPen] = useRecoilState(penAtom);
    return (
        <>
            <Label size="sm">ブレンドモード：</Label>
            <Select
                id="penBlendModeSelector"
                css={(theme) => ({
                    width: '180px',
                    marginTop: '5px',
                    fontSize: theme.fontSize.sm,
                })}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                        ...theme.colors,
                        primary25: '#F3F3F3',
                        primary: '#5AA2AE',
                    },
                })}
                isSearchable={false}
                menuPosition={'fixed'}
                options={options}
                defaultValue={{
                    value: penVal.prefs.blendMode,
                    label: BLEND_MODE_LABEL[penVal.prefs.blendMode],
                }}
                onChange={(value) => {
                    setPen((pen) =>
                        pen.setPrefs((prefs) => ({
                            ...prefs,
                            blendMode: value?.value ?? prefs.blendMode,
                        }))
                    );
                }}
            />
        </>
    );
};
