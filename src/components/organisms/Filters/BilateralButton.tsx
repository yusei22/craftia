import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { GLFilterButton } from './GLFilterButton';
import { Bilateral, BilateralConfig } from 'application/filters/Bilateral';
import { FilterWorker } from 'application/filters/Filter';
import { Rasterizedmage, SmartImage } from 'application/sprites';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';
import { NumberField } from 'components/molecules/NumberField';
import { MAX_CONVOLUTION_RADIUS, MIN_CONVOLUTION_RADIUS } from 'consts';
import { useSpriteTreeSaver } from 'dataflow';
import { floatingWindowAtom } from 'dataflow/windows/floatingWindowAtom';
import { useSpriteSetterID } from 'hooks/sprites/useSpriteSetterID';

export const BilateralButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new Bilateral()}
            label="バイラテラルフィルタ"
            WindowContents={BilateralWindowContents}
        >
            {children}
        </GLFilterButton>
    );
};

const BilateralWindowContents = ({
    sprite,
    worker,
    onClose,
}: {
    sprite: Rasterizedmage | SmartImage;
    worker: FilterWorker<BilateralConfig>;
    onClose: () => unknown;
}) => {
    const setWindow = useSetRecoilState(floatingWindowAtom);
    const setSpriteId = useSpriteSetterID();
    const saveSpriteTree = useSpriteTreeSaver();

    const [config, setConfig] = useState<BilateralConfig>({
        radius: 3,
    });

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
        worker.execute(config);
        setSpriteId(sprite.prefs.id, (sprite) => worker.getPreviewSprite() || sprite);
    }, []);

    useEffect(() => {
        worker.execute(config);
        setSpriteId(sprite.prefs.id, (sprite) => worker?.getPreviewSprite() || sprite);
    }, [config]);

    return (
        <Box
            css={(theme) => ({
                backgroundColor: theme.colors.white,
                padding: '20px',
            })}
        >
            <NumberField
                value={config.radius}
                id="bilateralButton_radius"
                max={MAX_CONVOLUTION_RADIUS}
                min={MIN_CONVOLUTION_RADIUS}
                step={1}
                label="半径"
                setValue={(v) => {
                    setConfig((curVal) => ({
                        ...curVal,
                        radius: v,
                    }));
                }}
                width={400}
                css={{
                    flexFlow: 'column',
                }}
            />
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
