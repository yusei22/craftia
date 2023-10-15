import Select from 'react-select';
import { useRecoilState } from 'recoil';
import Label from 'components/atoms/Label';
import { penAtom } from 'dataflow/pens/penAtom';
type BlendModeOption = {
    value: GlobalCompositeOperation;
    label: string;
};

const options: BlendModeOption[] = [
    { value: 'source-over', label: 'ノーマル' },
    { value: 'lighter', label: 'ライター' },
    { value: 'xor', label: 'XOR' },
    { value: 'multiply', label: '乗算' },
    { value: 'screen', label: 'スクリーン' },
    { value: 'overlay', label: 'オーバーレイ' },
    { value: 'darken', label: '暗くする' },
    { value: 'lighten', label: '明るくする' },
    { value: 'color-dodge', label: '覆い焼き' },
    { value: 'color-burn', label: '焼き込み' },
    { value: 'hard-light', label: 'ハードライト' },
    { value: 'soft-light', label: 'ソフトライト' },
    { value: 'difference', label: '差' },
    { value: 'exclusion', label: '除外' },
];

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
                defaultValue={{ value: penVal.prefs.blendMode, label: '' }}
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
