import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { GLFilterButton } from './GLFilterButton';
import { FilterWorker } from 'application/filters/Filter';
import { Illustration, IllustrationConfig } from 'application/filters/Illustration';
import { Rasterizedmage, SmartImage } from 'application/sprites';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';
import { useSpriteTreeSaver } from 'dataflow';
import { floatingWindowAtom } from 'dataflow/windows/floatingWindowAtom';
import { useSpriteSetterID } from 'hooks/sprites/useSpriteSetterID';

export const IllustrationButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new Illustration()}
            label="イラスト化"
            WindowContents={IllustrationWindowContents}
        >
            {children}
        </GLFilterButton>
    );
};

const IllustrationWindowContents = ({
    sprite,
    worker,
    onClose,
}: {
    sprite: Rasterizedmage | SmartImage;
    worker: FilterWorker<IllustrationConfig>;
    onClose: () => unknown;
}) => {
    const setWindow = useSetRecoilState(floatingWindowAtom);
    const setSpriteId = useSpriteSetterID();
    const saveSpriteTree = useSpriteTreeSaver();

    const onConsent = () => {
        saveSpriteTree();
        onClose();
    };

    const onCancel = () => {
        setSpriteId(sprite.prefs.id, (sprite) => worker?.getOriginalSprite() || sprite);
        onClose();
    };

    useEffect(() => {
        setWindow((culVal) => ({
            ...culVal,
            onClose: onCancel,
        }));
        worker.execute({});
        setSpriteId(sprite.prefs.id, (sprite) => worker.getPreviewSprite() || sprite);
    }, []);

    return (
        <Box
            css={(theme) => ({
                backgroundColor: theme.colors.white,
                padding: '20px',
            })}
        >
            <ConfirmButtons
                css={{
                    width: '100%',
                    justifyContent: 'end',
                }}
                onCancel={onCancel}
                onConsent={onConsent}
            />
        </Box>
    );
};
