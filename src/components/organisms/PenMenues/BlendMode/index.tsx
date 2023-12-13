import { useRecoilState } from 'recoil';
import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';
import { Selector, SelectorOptions } from 'components/molecules/Selector';
import { BLEND_MODE_LABEL, PEN_BLEND_MODE_VALUE } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';
import { BlendMode } from 'types';

const createOptions = (blendModes: readonly BlendMode[]) => {
    return blendModes.map((value) => ({
        value,
        label: BLEND_MODE_LABEL[value],
    }));
};

const options: SelectorOptions<string> = createOptions(PEN_BLEND_MODE_VALUE);

export const PenBlendModeField = ({ className }: { className?: string }) => {
    const [penVal, setPen] = useRecoilState(penAtom);

    const onChange = (newVal: string) => {
        setPen((pen) =>
            pen.setPrefs((prefs) => ({
                ...prefs,
                blendMode: PEN_BLEND_MODE_VALUE.includes(newVal as BlendMode)
                    ? (newVal as BlendMode)
                    : prefs.blendMode,
            }))
        );
    };

    return (
        <>
            <Container
                className={className}
                css={{
                    alignItems: 'center',
                }}
            >
                <Label size="sm">ブレンドモード：</Label>
                <Selector
                    options={options}
                    defaultValue={penVal.prefs.blendMode}
                    onChange={onChange}
                />
            </Container>
        </>
    );
};
