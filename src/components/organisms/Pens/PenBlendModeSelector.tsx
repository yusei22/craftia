import Select from 'react-select';
import { useRecoilState } from 'recoil';
import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';
import { BLEND_MODE_LABEL, PEN_BLEND_MODE_VALUE } from 'consts';
import { penAtom } from 'dataflow/pens/penAtom';
import { defaultTheme } from 'theme';

const options = PEN_BLEND_MODE_VALUE.map((value) => ({
    value,
    label: BLEND_MODE_LABEL[value],
}));

export const PenBlendModeSelector = ({ className }: { className?: string }) => {
    const [penVal, setPen] = useRecoilState(penAtom);
    return (
        <>
            <Container
                className={className}
                css={{
                    alignItems: 'start',
                }}
            >
                <Label size="sm">ブレンドモード：</Label>
                <Select
                    id="penBlendModeSelector"
                    instanceId="penBlendModeSelector"
                    css={(theme) => ({
                        width: '180px',
                        marginTop: '5px',
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.neutral900,
                    })}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,

                            primary25: defaultTheme.colors.neutral200,
                            primary: defaultTheme.colors.neutral600,
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
            </Container>
        </>
    );
};
